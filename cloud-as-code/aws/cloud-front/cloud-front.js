/** @format */

require('dotenv').config()

const {
	CloudFrontClient,
	CreateDistributionCommand,
	CreateCachePolicyCommand,
} = require('@aws-sdk/client-cloudfront')

const client = new CloudFrontClient({region: 'us-east-1'})

// https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_CreateDistribution.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFront.html#createDistribution-property
async function createDistribution({CachePolicyId}) {
	const params = {
		DistributionConfig: {
			CallerReference: 'unique-id',
			Origins: {
				Quantity: 1,
				Items: [
					{
						Id: '1',
						DomainName: 'very-dirty-bucket.s3.amazonaws.com',
						S3OriginConfig: {
							OriginAccessIdentity: '',
						},
					},
				],
			},
			DefaultCacheBehavior: {
				TargetOriginId: '1',
				ViewerProtocolPolicy: 'redirect-to-https',
				CachePolicyId,
			},
			Comment: '',
			Enabled: true,
		},
	}
	const command = new CreateDistributionCommand(params)
	try {
		const data = await client.send(command)
		console.log({data})
		const {DomainName} = data.Distribution
		return {DomainName}
	} catch (error) {
		console.log({error})
	}
}

// https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_CreateCachePolicy.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFront.html#createCachePolicy-property
async function createCachePolicy() {
	const params = {
		CachePolicyConfig: {
			MinTTL: 3600,
			Name: 'DirtyCachePolicy',
		},
	}
	const command = new CreateCachePolicyCommand(params)
	try {
		const data = await client.send(command)
		console.log({data})
		const CachePolicyId = data.CachePolicy.Id
		return {CachePolicyId}
	} catch (error) {
		console.log({error})
	}
}
