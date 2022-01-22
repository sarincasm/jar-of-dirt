/** @format */

require('dotenv').config()

const fs = require('fs')
const {
	S3Client,
	CreateBucketCommand,
	PutObjectCommand,
	DeleteBucketCommand,
} = require('@aws-sdk/client-s3')

const client = new S3Client({region: 'us-east-1'})

const BUCKET_NAME = 'very-dirty-bucket'

async function createBucket() {
	const params = {
		Bucket: BUCKET_NAME,
		'x-amz-acl': 'public-read',
	}
	const command = new CreateBucketCommand(params)
	try {
		const data = await client.send(command)
		console.log({data})
	} catch (error) {
		console.log({error})
	}
}

async function deleteBucket() {
	const params = {
		Bucket: BUCKET_NAME,
	}
	const command = new DeleteBucketCommand(params)
	try {
		const data = await client.send(command)
		console.log({data})
	} catch (error) {
		console.log({error})
	}
}

async function putObject() {
	const params = {
		Bucket: BUCKET_NAME,
		GrantRead: 'uri=http://acs.amazonaws.com/groups/global/AllUsers',
	}
	const fileName = 'README.md'
	const stream = fs.createReadStream(fileName)
	params.Body = stream
	params.Key = fileName
	const command = new PutObjectCommand(params)
	try {
		const data = await client.send(command)
		console.log({data})
	} catch (error) {
		console.log({error})
	}
}
