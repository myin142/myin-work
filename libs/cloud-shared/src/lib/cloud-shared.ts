export enum Dynamo {
	WorkTrackerTable = 'WorkTracker',
	WorkTrackerUser = 'userId',
	WorkTrackerDate = 'dayId',
}

export interface WorkTime {
	userId?: string;
	dayId: string;
	times: TimeSegment[];
}

export interface TimeSegment {
	time: string;
	name?: string;
	comment?: string;
}