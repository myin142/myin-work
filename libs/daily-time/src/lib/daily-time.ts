import { getSubjectFromToken, dynamoWrapper, successAndBody, statusAndBody, toAWSAttributeMap, fromAWSAttributeMapArray, dynamodb } from '@myin/aws-utils';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Dynamo, WorkTime } from '../../../cloud-shared/src';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const subject = getSubjectFromToken(event.headers.Authorization as string) || 'DEFAULT';
	let error = '';

	try {
		switch (event.httpMethod) {
			case 'GET':
				const dates = event.multiValueQueryStringParameters.date;
				return successAndBody(await getWorkTimes(subject, dates));
			case 'POST':
				const workTime: WorkTime = JSON.parse(event.body) || {};
				workTime.userId = subject;

				if (!validWorkTime(workTime)) {
					error = `Invalid work time data ${event.body}`;
					break;
				}

				await createWorkTime(workTime);
				return successAndBody({ msg: 'Work Time created' });
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
	}
	return dateStr;
}

function getDateFromDate(date: Date): string {
	return date.toISOString().split('T')[0];
}

function isValidDate(date: Date): boolean {
	return !isNaN(date.getTime());
}

async function getWorkTimes(user: string, dates: string[]): Promise<WorkTime[]> {
	let expression = `${Dynamo.WorkTrackerUser} = :u and `;
	let values = { u: user };
	if (dates.length == 1) {
		expression += `begins_with(${Dynamo.WorkTrackerDate}, :d)`;
		values['d'] = parseOnlyDate(dates[0]);
	} else if (dates.length > 1) {
		expression += `${Dynamo.WorkTrackerDate} between :d1 and :d2`;
		values['d1'] = parseOnlyDate(dates[0]);
		values['d2'] = parseOnlyDate(dates[1]);
	}

	return dynamoWrapper.query(Dynamo.WorkTrackerTable, expression, values);
}