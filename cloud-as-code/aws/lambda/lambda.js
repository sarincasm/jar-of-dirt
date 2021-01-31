/** @format */

require('dotenv').config()

const {
	LambdaClient,
	GetFunctionConfigurationCommand,
	UpdateFunctionConfigurationCommand,
} = require('@aws-sdk/client-lambda')

const client = new LambdaClient({region: 'ap-south-1'})

async function getConfig() {
	const command = new GetFunctionConfigurationCommand({
		FunctionName: 'function-name',
	})
	await client.send(command)
}

// https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars-api
async function updateEnvironmentVariables() {
	const command = new UpdateFunctionConfigurationCommand({
		FunctionName: 'function-name',
		Environment: {
			Variables: {
				key: 'value',
			},
		},
	})
	await client.send(command)
}
