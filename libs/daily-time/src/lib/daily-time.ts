import { getSubjectFromToken, dynamoWrapper, successAndBody, statusAndBody, toAWSAttributeMap } from '@myin/aws-utils';
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
				if (isNaN(date.getTime())) {
					error = `Invalid date query parameter: ${event.queryStringParameters.date}`;
					break;
				}

				return successAndBody(getWorkTimes(subject, date));
			case 'POST':
				const workTime: WorkTime = JSON.parse(event.body) || {};
				workTime.user = subject;

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
	return !!workTime.user && !!workTime.timestamp && !!workTime.timeEnd;
}

async function createWorkTime(workTime: WorkTime): Promise<void> {
	await dynamoWrapper.dynamo.putItem({
		TableName: Dynamo.WorkTrackerTable,
		Item: toAWSAttributeMap(workTime),
	}).promise();
}

async function getWorkTimes(user: string, date: Date): Promise<WorkTime[]> {
	const nextDate = new Date(date);
	nextDate.setDate(nextDate.getDate() + 1);

	console.log(date.getTime());

	return dynamoWrapper.query(Dynamo.WorkTrackerTable,
		`${Dynamo.WorkTrackerUser} = :user, timestamp >= :currentDate, timestamp <= :nextDate`,
		{
			user,
			currentDate: date.getTime(),
			nextDate: nextDate.getTime(),
		});
}