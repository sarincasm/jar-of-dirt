/** @format */

import * as React from 'react'
import {Helmet} from 'react-helmet'

// styles
const pageStyles = {
	color: '#232129',
	padding: '15%',
	fontFamily: '-apple-system, Roboto, sans-serif, serif',
}
const headingStyles = {
	marginTop: 0,
	marginBottom: 64,
	maxWidth: 720,
}
const headingAccentStyles = {
	color: '#663399',
}
const paragraphStyles = {
	marginBottom: 48,
}
const codeStyles = {
	color: '#663399',
	padding: 4,
	fontSize: '1.25rem',
	border: 'none',
	borderRadius: 4,
}
const listStyles = {
	marginBottom: 96,
	paddingLeft: 0,
}
const listItemStyles = {
	fontWeight: '300',
	fontSize: '24px',
	maxWidth: '560px',
}

const linkStyle = {
	color: '#8954A8',
	fontWeight: 'bold',
	fontSize: '.6em',
	verticalAlign: '5%',
}

const docLinkStyle = {
	...linkStyle,
	listStyleType: 'none',
	marginBottom: 24,
	fontSize: '1.6em',
}

const descriptionStyle = {
	color: '#232129',
	fontSize: '14px',
}

const buttonStyle = {
	minWidth: '90px',
	fontSize: '18px',
	backgroundColor: 'white',
	borderColor: '#663399',
	textTransform: 'uppercase',
	color: '#663399',
	cursor: 'pointer',
	transition: 'width 1s ease-in',
}

const docLink = {
	text: 'View Source Code',
	url: 'https://github.com/sarincasm/jar-of-dirt/tree/main/demos/twilio-sss',
	color: '#8954A8',
}

const links = [
	{
		text: 'Twilio Functions',
		url: 'https://www.twilio.com/docs/runtime/functions',
		description:
			'Details on the serverless environment offered as Twilio Functions',
		color: '#E95800',
	},
	{
		text: 'Code Sample',
		url:
			'https://www.twilio.com/docs/runtime/quickstart/serverless-functions-make-a-call',
		description:
			'Quick code sample to make a call using serverless Twilio functions',
		color: '#1099A8',
	},
	{
		text: 'Construct a Response',
		url:
			'https://www.twilio.com/docs/runtime/functions/invocation#constructing-a-response',
		description: 'Construct a proper HTTP Response using Twilio functions',
		color: '#BC027F',
	},
	{
		text: 'Twilio Markup Language',
		url:
			'https://www.twilio.com/docs/glossary/what-is-twilio-markup-language-twiml',
		description: 'Explore what you can do with Twiml',
		color: '#E95800',
	},
	{
		text: 'Quick Start with a Nodejs Server',
		url: 'https://www.twilio.com/docs/voice/quickstart/node',
		description:
			'Use this quickstart when developing with your own server (NodeJs)',
		color: '#0D96F2',
	},
	{
		text: 'Twilio Trial Account',
		url:
			'https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account',
		description: 'Details on how to use a free trial account on twilio',
		color: '#BC027F',
	},
]

function makeCall() {
	const functionEndpoint = process.env.FUNCTION_ENDPOINT
	const phoneNumber = document.querySelector('input').value
	if (phoneNumber && phoneNumber.length === 10)
		fetch(functionEndpoint + phoneNumber)
			.then((response) => response.json())
			.then(({success, errorMessage}) => {
				const button = document.querySelector('button')
				if (success) button.innerText = 'You Will Be Threatened Soon'
				if (!success) button.innerText = errorMessage
			})
}

const IndexPage = () => {
	return (
		<main style={pageStyles}>
			<Helmet>
				<title>Threaten Me - Twilio</title>
			</Helmet>
			<h1 style={headingStyles}>
				Hello There
				<br />
				<span style={headingAccentStyles}>
					Enter your phone number to get a threatening phone call from Liam
					Neeson{' '}
				</span>
				<br />
				<span role="img" aria-label="emojis">
					💀📞
				</span>
			</h1>
			<p style={paragraphStyles}>
				+91 -{' '}
				<input type="number" style={codeStyles} placeholder="9999999999" />
				<button style={buttonStyle} onClick={makeCall}>
					Call
				</button>
			</p>
			<ul style={listStyles}>
				<li style={docLinkStyle}>
					<a
						style={linkStyle}
						href={docLink.url}
						target="_blank"
						rel="noreferrer"
					>
						{docLink.text}
					</a>
				</li>
				<br />
				<h3>
					<u>Useful Links</u>
				</h3>
				{links.map((link) => (
					<li
						key={link.url}
						style={{...listItemStyles, color: link.color}}
					>
						<span>
							<a
								style={linkStyle}
								href={link.url}
								target="_blank"
								rel="noreferrer"
							>
								{link.text}
							</a>
							<p style={descriptionStyle}>{link.description}</p>
						</span>
					</li>
				))}
			</ul>
		</main>
	)
}

export default IndexPage
