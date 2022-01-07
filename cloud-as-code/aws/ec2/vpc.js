/** @format */

require('dotenv').config()

const {
	EC2Client,

	AttachInternetGatewayCommand,
	CreateInternetGatewayCommand,

	AllocateAddressCommand,
	CreateNatGatewayCommand,

	CreateRouteTableCommand,
	CreateRouteCommand,
	AssociateRouteTableCommand,

	CreateSubnetCommand,
	CreateVpcCommand,

	DescribeNetworkAclsCommand,
	CreateNetworkAclCommand,
	CreateNetworkAclEntryCommand,
	ReplaceNetworkAclAssociationCommand,
} = require('@aws-sdk/client-ec2')

const client = new EC2Client({region: 'us-east-1'})

/**
 * Will also create
 * main route table for the vpc - new subnets are associated with this
 * default NACL
 * default SG
 */
async function createVPC() {
	const params = {
		CidrBlock: '10.0.0.0/16',
		TagSpecifications: [
			{
				ResourceType: 'vpc',
				Tags: [
					{
						Key: 'Name',
						Value: 'dirty-vpc-01',
					},
				],
			},
		],
	}
	const command = new CreateVpcCommand(params)
	try {
		const result = await client.send(command)
		console.log(result)
	} catch (error) {
		console.log(error)
	}
}

async function createSubnet({VpcId = ''} = {}) {
	const params = {
		CidrBlock: '10.0.1.0/24',
		VpcId,
		TagSpecifications: [
			{
				ResourceType: 'subnet',
				Tags: [
					{
						Key: 'Name',
						Value: 'dirty-public-subnet',
					},
				],
			},
		],
	}
	const command = new CreateSubnetCommand(params)
	try {
		const result = await client.send(command)
		console.log(result)
	} catch (error) {
		console.log(error)
	}
}

async function createInternetGateway({VpcId = ''} = {}) {
	const createParams = {
		TagSpecifications: [
			{
				ResourceType: 'internet-gateway',
				Tags: [
					{
						Key: 'Name',
						Value: 'dirty-igw-01',
					},
				],
			},
		],
	}
	const attachParams = {
		InternetGatewayId: '',
		VpcId,
	}
	const createCommand = new CreateInternetGatewayCommand(createParams)
	const attachCommand = new AttachInternetGatewayCommand(attachParams)
	try {
		const createResult = await client.send(createCommand)
		console.log(createResult)
		attachParams.InternetGatewayId =
			createResult.InternetGateway.InternetGatewayId
		const attachResult = await client.send(attachCommand)
		console.log(attachResult)
	} catch (error) {
		console.log(error)
	}
}

async function createRouteOut({
	VpcId = '',
	GatewayId = '',
	SubnetId = '',
} = {}) {
	const createTableParams = {
		VpcId,
		TagSpecifications: [
			{
				ResourceType: 'route-table',
				Tags: [
					{
						Key: 'Name',
						Value: 'dirty-route-table-01',
					},
				],
			},
		],
	}
	const createRouteParams = {
		DestinationCidrBlock: '0.0.0.0/0',
		GatewayId,
		RouteTableId: '',
	}
	const associateParams = {
		RouteTableId: '',
		SubnetId,
	}
	const createTableCommand = new CreateRouteTableCommand(createTableParams)
	const createRouteCommand = new CreateRouteCommand(createRouteParams)
	const associateRouteTableCommand = new AssociateRouteTableCommand(
		associateParams
	)
	try {
		const createTableResult = await client.send(createTableCommand)
		console.log(createTableResult)
		createRouteParams.RouteTableId = createTableResult.RouteTable.RouteTableId
		associateParams.RouteTableId = createTableResult.RouteTable.RouteTableId
		const [createRouteResult, associateResult] = await Promise.all([
			client.send(createRouteCommand),
			client.send(associateRouteTableCommand),
		])
		console.log(createRouteResult)
		console.log(associateResult)
	} catch (error) {
		console.log(error)
	}
}

async function createNATGateway({SubnetId = '', RouteTableId = ''} = {}) {
	const allocateAddressParams = {
		Domain: 'vpc',
	}
	const createParams = {
		AllocationId: '',
		SubnetId,
	}
	const createRouteParams = {
		DestinationCidrBlock: '0.0.0.0/0',
		NatGatewayId: '',
		RouteTableId,
	}
	const allocateCommand = new AllocateAddressCommand(allocateAddressParams)
	const createCommand = new CreateNatGatewayCommand(createParams)
	const createRouteCommand = new CreateRouteCommand(createRouteParams)
	try {
		const allocateResult = await client.send(allocateCommand)
		console.log(allocateResult)
		createParams.AllocationId = allocateResult.AllocationId
		const createResult = await client.send(createCommand)
		console.log(createResult)
		createRouteParams.NatGatewayId = createResult.NatGateway.NatGatewayId
		console.log('Waiting to be available')
		await new Promise((resolve) => setTimeout(resolve, 4000))
		const createRouteResult = await client.send(createRouteCommand)
		console.log(createRouteResult)
	} catch (error) {
		console.log(error)
	}
}

async function createNACL({VpcId = ''} = {}) {
	const describeParams = {
		Filters: [
			{
				Name: 'vpc-id',
				Values: [VpcId],
			},
			{
				Name: 'default',
				Values: [true],
			},
		],
	}
	const createNACLParams = {
		VpcId,
		TagSpecifications: [
			{
				ResourceType: 'network-acl',
				Tags: [
					{
						Key: 'Name',
						Value: 'dirty-nacl',
					},
				],
			},
		],
	}
	const createEntryParams = {
		CidrBlock: '0.0.0.0/0',
		Egress: false,
		NetworkAclId: '',
		PortRange: {
			From: 53,
			To: 53,
		},
		Protocol: '17',
		RuleAction: 'allow',
		RuleNumber: 100,
	}
	const associateParams = {
		AssociationId: '',
		NetworkAclId: '',
	}

	const describeNACLsCommand = new DescribeNetworkAclsCommand(describeParams)

	const createNACLCommand = new CreateNetworkAclCommand(createNACLParams)
	const createEntryCommand = new CreateNetworkAclEntryCommand(
		createEntryParams
	)
	const associateCommand = new ReplaceNetworkAclAssociationCommand(
		associateParams
	)
	try {
		const describeResult = await client.send(describeNACLsCommand)
		console.log(describeResult)
		const currentAssociationId =
			describeResult.NetworkAcls[0].Associations[0].NetworkAclAssociationId

		const createNACLResult = await client.send(createNACLCommand)
		console.log(createNACLResult)
		createEntryParams.NetworkAclId = createNACLResult.NetworkAcl.NetworkAclId
		associateParams.AssociationId = currentAssociationId
		associateParams.NetworkAclId = createNACLResult.NetworkAcl.NetworkAclId
		const [createEntryResult, associateResult] = await Promise.all([
			client.send(createEntryCommand),
			client.send(associateCommand),
		])
		console.log(createEntryResult)
		console.log(associateResult)
	} catch (error) {
		console.log(error)
	}
}
