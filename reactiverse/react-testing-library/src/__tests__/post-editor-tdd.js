/** @format */

import React from 'react'
import {render, waitFor, screen} from '@testing-library/react'
import {Redirect} from 'react-router'
import userEvent from '@testing-library/user-event'
import {build, fake, sequence} from 'test-data-bot'

import {Editor} from '../post-editor'
import {savePost} from '../api'

jest.mock('react-router', () => {
	return {
		Redirect: jest.fn(() => null),
	}
})
jest.mock('../api')

afterEach(() => {
	jest.clearAllMocks()
})

const postBuilder = build('Post').fields({
	title: fake((f) => f.lorem.words()),
	content: fake((f) => f.lorem.paragraphs().replace(/\r/g, '')),
	tags: fake((f) => [f.lorem.word(), f.lorem.word(), f.lorem.word()]),
})

const userBuilder = build('User').fields({
	id: sequence((s) => `user-${s}`),
})

function renderEditor() {
	const fakeUser = userBuilder()
	const utils = render(<Editor user={fakeUser} />)
	const fakePost = postBuilder()

	screen.getByLabelText(/title/i).value = fakePost.title
	screen.getByLabelText(/content/i).value = fakePost.content
	screen.getByLabelText(/tags/i).value = fakePost.tags.join(', ')
	const submitButton = screen.getByText(/submit/i)
	return {
		...utils,
		submitButton,
		fakeUser,
		fakePost,
	}
}

test('renders a form with title, content, tags, and a submit button', async () => {
	savePost.mockResolvedValueOnce()
	const {submitButton, fakePost, fakeUser} = renderEditor()
	const preDate = new Date().getTime()

	userEvent.click(submitButton)
	expect(submitButton).toBeDisabled()

	expect(savePost).toHaveBeenCalledWith({
		...fakePost,
		authorId: fakeUser.id,
		date: expect.any(String),
	})
	expect(savePost).toHaveBeenCalledTimes(1)

	const postDate = new Date().getTime()
	const date = new Date(savePost.mock.calls[0][0].date).getTime()
	expect(date).toBeGreaterThanOrEqual(preDate)
	expect(date).toBeLessThanOrEqual(postDate)

	await waitFor(() => expect(Redirect).toHaveBeenCalledWith({to: '/'}, {}))
})

test('renders an error message from the server', async () => {
	const testError = 'test error'
	savePost.mockRejectedValueOnce({data: {error: testError}})
	const {submitButton} = renderEditor()

	userEvent.click(submitButton)

	const postError = await screen.findByRole('alert')
	expect(postError).toHaveTextContent(testError)
	expect(submitButton).not.toBeDisabled()
})
