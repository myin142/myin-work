export enum Dynamo {
	WorkTrackerTable = 'WorkTracker',
	WorkTrackerUser = 'user',
	WorkTrackerTimestamp = 'timestamp',
}

export interface WorkTime {
	user: string;
	timestamp: number;
	timeEnd: number;
	comment: string;
}