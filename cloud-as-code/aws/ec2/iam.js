/** @format */

require('dotenv').config()

const {
	IAMClient,
	AttachRolePolicyCommand,
	CreateRoleCommand,
	CreateInstanceProfileCommand,
	AddRoleToInstanceProfileCommand,
	GetRoleCommand,
} = require('@aws-sdk/client-iam')

const client = new IAMClient({region: 'us-east-1'})

async function getRole() {
	const RoleName = ''
	const params = {
		RoleName,
	}
	const command = new GetRoleCommand(params)
	try {
		const result = await client.send(command)
		console.log(result)
	} catch (error) {
		console.log(error)
	}
}

// https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreateRole.html
// https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html
async function createRole() {
	const RoleName = 'Dirty-Role-01'
	const InstanceProfileName = 'Dirty-Instance-Profile-01'

	const policy = {
		Version: '2012-10-17',
		Statement: [
			{
				Effect: 'Allow',
				Principal: {
					Service: ['ec2.amazonaws.com'],
				},
				Action: 'sts:AssumeRole',
			},
		],
	}
	const roleParams = {
		RoleName,
		AssumeRolePolicyDocument: JSON.stringify(policy),
	}
	const instanceParams = {
		InstanceProfileName,
	}
	const addParams = {
		InstanceProfileName,
		RoleName,
	}
	const attachParams = {
		RoleName,
		PolicyArn: 'arn:aws:iam::aws:policy/AdministratorAccess',
	}

	const roleCommand = new CreateRoleCommand(roleParams)
	const instanceCommand = new CreateInstanceProfileCommand(instanceParams)
	const addCommand = new AddRoleToInstanceProfileCommand(addParams)
	const attachCommand = new AttachRolePolicyCommand(attachParams)

	try {
		await Promise.all([
			client.send(roleCommand),
			client.send(instanceCommand),
		])
		await Promise.all([client.send(addCommand), client.send(attachCommand)])
	} catch (error) {
		console.log(error)
	}
}
