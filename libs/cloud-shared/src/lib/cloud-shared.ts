export enum Dynamo {
	WorkTrackerTable = 'WorkTracker',
	WorkTrackerUser = 'userId',
	WorkTrackerDate = 'dayId',
}

export interface WorkTime {
	userId?: string;
	dayId: string;
	comment?: string;
}