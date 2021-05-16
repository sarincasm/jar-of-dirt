/** @format */

require('dotenv').config()

const fs = require('fs')

const {
	CreateKeyPairCommand,
	CreateSecurityGroupCommand,
	AuthorizeSecurityGroupIngressCommand,
	DescribeSecurityGroupsCommand,

	AssociateIamInstanceProfileCommand,

	EC2Client,
	RunInstancesCommand,
	TerminateInstancesCommand,
	DescribeInstancesCommand,

	CreateImageCommand,

	CreateVolumeCommand,
	CreateSnapshotCommand,
	DeleteVolumeCommand,
} = require('@aws-sdk/client-ec2')

const client = new EC2Client({region: 'us-east-1'})

async function createKeyPair() {
	const params = {
		KeyName: 'dirty-key-1',
	}
	const command = new CreateKeyPairCommand(params)
	try {
		const result = await client.send(command)
		fs.writeFile('./dirty-key.pem', result.KeyMaterial, () => {})
		console.log(result)
	} catch (error) {
		console.log(error)
	}
}

async function listSecurityGroups() {
	const command = new DescribeSecurityGroupsCommand({})
	try {
		const result = await client.send(command)
		console.log(result)
		const {SecurityGroups} = result
		return SecurityGroups.map((securityGroup) => securityGroup.GroupId)
	} catch (error) {
		console.log(error)
	}
}

async function configureSecurityGroup() {
	// by default all Denied
	// open specific
	// SGs are stateful

	// allow SSH for an IP
	// const createParams = {
	// 	Description: 'Dirty SG',
	// 	GroupName: 'Dirty-SG-1',
	// 	VpcId: 'vpc-xxxxxxxx',
	// }
	// const ingressParams = {
	// 	// GroupId,
	// 	IpPermissions: [
	// 		{
	// 			FromPort: 22,
	// 			IpProtocol: 'tcp',
	// 			IpRanges: [
	// 				{
	// 					CidrIp: 'XX.XX.XX.XX/32',
	// 					Description: 'SSH access',
	// 				},
	// 			],
	// 			ToPort: 22,
	// 		},
	// 	],
	// }

	// enable SSH via EC2_INSTANCE_CONNECT
	const createParams = {
		Description: 'Dirty SG InstanceConnect',
		GroupName: 'Dirty-SG-i1',
		VpcId: 'vpc-xxxxxxxx',
	}
	// https://ip-ranges.amazonaws.com/ip-ranges.json
	// filter: service===EC2_INSTANCE_CONNECT, region===region
	const ingressParams = {
		// GroupId,
		IpPermissions: [
			{
				FromPort: 22,
				IpProtocol: 'tcp',
				IpRanges: [
					{
						CidrIp: '18.206.107.24/29',
						Description: 'EC2_INSTANCE_CONNECT',
					},
				],
				ToPort: 22,
			},
		],
	}

	const createCommand = new CreateSecurityGroupCommand(createParams)
	const ingressCommand = new AuthorizeSecurityGroupIngressCommand(
		ingressParamsEC2InstanceConnect
	)

	try {
		const createResponse = await client.send(createCommand)
		console.log(createResponse)
		ingressParams.GroupId = createResponse.GroupId
		const ingressResponse = await client.send(ingressCommand)
		console.log(ingressResponse)
	} catch (error) {
		console.log(error)
	}
}

async function associateInstanceProfile() {
	const params = {
		InstanceId: '',
		IamInstanceProfile: {
			Name: 'Dirty-Instance-Profile-01',
		},
	}
	const command = new AssociateIamInstanceProfileCommand(params)
	try {
		const result = await client.send(command)
		console.log(result)
	} catch (error) {
		console.log(error)
	}
}

async function runInstance() {
	const params = {
		ImageId: 'ami-047a51fa27710816e',
		InstanceType: 't2.micro',
		MinCount: 1,
		MaxCount: 1,
		KeyName: 'dirty-key-1',
		SecurityGroupIds: ['sg-xxxxxxxxxxxxxxxxx', 'sg-xxxxxxxxxxxxxxxxx'],
		IamInstanceProfile: {
			Name: 'Dirty-Instance-Profile-01',
		},
	}
	const command = new RunInstancesCommand(params)
	try {
		const result = await client.send(command)
		console.log(result)
	} catch (error) {
		console.log(error)
	}
}

async function describeInstance() {
	const params = {
		InstanceIds: ['i-'],
	}
	const command = new DescribeInstancesCommand(params)
	try {
		const result = await client.send(command)
		console.log(result.Reservations[0].Instances[0])
		return result.Reservations[0].Instances[0]
	} catch (error) {
		console.log(error)
	}
}

async function terminateInstance() {
	const params = {
		InstanceIds: ['i-xxxxxxxxxxxxxxxxx'],
	}
	const command = new TerminateInstancesCommand(params)
	try {
		const result = await client.send(command)
		console.log(result)
	} catch (error) {
		console.log(error)
	}
}

async function createAMI() {
	const params = {
		InstanceId: 'i-',
		Name: 'Dirty-AMI',
	}
	const command = new CreateImageCommand(params)
	try {
		const result = await client.send(command)
		console.log(result)
		return result.ImageId
	} catch (error) {
		console.log(error)
	}
}

async function createEBSVolume() {
	const params = {
		AvailabilityZone: 'us-east-1a',
		Size: 4,
		VolumeType: 'gp3',
		SnapshotId: 'snap-',
	}
	const command = new CreateVolumeCommand(params)
	try {
		const result = await client.send(command)
		const {VolumeId} = result
		console.log(result)
		return {VolumeId}
	} catch (error) {
		console.log(error)
	}
}

async function createSnapshot() {
	const params = {
		VolumeId: 'vol-',
	}
	const command = new CreateSnapshotCommand(params)
	try {
		const result = await client.send(command)
		const {SnapshotId} = result
		console.log(result)
		return {SnapshotId}
	} catch (error) {
		console.log(error)
	}
}

async function deleteEBSVolume() {
	const params = {
		VolumeId: 'vol-',
	}
	const command = new DeleteVolumeCommand(params)
	try {
		const result = await client.send(command)
		console.log(result)
	} catch (error) {
		console.log(error)
	}
}
