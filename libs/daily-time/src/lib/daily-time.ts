import { getSubjectFromToken, dynamoWrapper, successAndBody, statusAndBody, toAWSAttributeMap, fromAWSAttributeMapArray, dynamodb } from '@myin/aws-utils';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Dynamo, WorkTime } from '../../../cloud-shared/src';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const subject = getSubjectFromToken(event.headers.Authorization as string) || 'DEFAULT';
	let error = '';

	try {
		switch (event.httpMethod) {
			case 'GET':
				if (!event.queryStringParameters || !event.queryStringParameters.date) {
					error = 'Missing date query parameter';
					break;
				}

				const date = new Date(event.queryStringParameters.date);
				if (!isValidDate(date)) {
					error = `Invalid date query parameter: ${event.queryStringParameters.date}`;
					break;
				}

				return successAndBody(await getWorkTimes(subject, date));
			case 'POST':
				const workTime: WorkTime = JSON.parse(event.body) || {};
				workTime.userId = subject;

				if (!validWorkTime(workTime)) {
					error = `Invalid work time data ${event.body}`;
					break;
				}

				await createWorkTime(workTime);
				return successAndBody('Work Time created');
		}
	} catch (e) {
		return statusAndBody(500, { error: `${e}` });
	}

	return statusAndBody(400, { error });
};

function validWorkTime(workTime: WorkTime): boolean {
	return !!workTime.userId && !!workTime.dayId;
}

async function createWorkTime(workTime: WorkTime): Promise<void> {
	workTime.dayId = parseOnlyDate(workTime.dayId);

	await dynamoWrapper.dynamo.putItem({
		TableName: Dynamo.WorkTrackerTable,
		Item: toAWSAttributeMap(workTime),
	}).promise();
}

function parseOnlyDate(dateStr: string): string {
	if (dateStr.indexOf('T') !== -1) {
		const date = new Date(dateStr);
		if (isValidDate(date)) {
			return getDateFromDate(date);
		}
		return dateStr.split('T')[0];
	}
	return dateStr;
}

function getDateFromDate(date: Date): string {
	return date.toISOString().split('T')[0];
}

function isValidDate(date: Date): boolean {
	return !isNaN(date.getTime());
}

async function getWorkTimes(user: string, dateTime: Date): Promise<WorkTime[]> {
	const date = getDateFromDate(dateTime);

	return dynamoWrapper.query(Dynamo.WorkTrackerTable,
		`${Dynamo.WorkTrackerUser} = :u and begins_with(${Dynamo.WorkTrackerDate}, :d)`,
		{ u: user, d: date, });
}