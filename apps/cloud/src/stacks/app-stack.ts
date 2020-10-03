import * as cdk from '@aws-cdk/core';
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb';
import { Dynamo } from '../../../../libs/cloud-shared/src';
import { LambdaIntegration } from '@aws-cdk/aws-apigateway';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
import {
	RestApi,
	AuthorizationType,
	CfnAuthorizer,
	MethodOptions,
} from '@aws-cdk/aws-apigateway';


export class AppStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const workTrackerTable = new Table(this, Dynamo.WorkTracker, {
			tableName: Dynamo.WorkTracker,
			partitionKey: {
				name: 'user',
				type: AttributeType.STRING
			},
			sortKey: {
				name: 'day',
				type: AttributeType.STRING
			},
		});

		const api = new RestApi(this, 'WorkTrackerApi', {
			deployOptions: {
				throttlingBurstLimit: 10,
				throttlingRateLimit: 10,
			},
			defaultCorsPreflightOptions: {
				allowOrigins: ['*'],
				allowHeaders: ['Authorization'],
				allowCredentials: true,
			},
		});

		const getTimesOfDay = new Function(this, 'getTimesOfDay', {
			runtime: Runtime.NODEJS_12_X,
			code: Code.fromAsset('../../dist/libs/daily-time'),
			handler: 'daily-time.handler',
		});

		workTrackerTable.grantReadData(getTimesOfDay);

		const timeResource = api.root.addResource('time');
		timeResource.addMethod('GET', new LambdaIntegration(getTimesOfDay));
	}
}

// Waiting https://github.com/aws/aws-cdk/issues/5618
export const defaultCognito = (api: RestApi): MethodOptions => {
	const authorizer = new CfnAuthorizer(api.stack, 'authorizer', {
		restApiId: api.restApiId,
		type: AuthorizationType.COGNITO,
		name: 'MainPoolAuthorizer',
		identitySource: 'method.request.header.Authorization',
		providerArns: [process.env.USERPOOL_ARN],
	});

	return {
		authorizationType: AuthorizationType.COGNITO,
		authorizer: { authorizerId: authorizer.ref },
	};
};