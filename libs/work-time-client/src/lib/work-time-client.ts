import { WorkTime } from '@myin-work/cloud-shared';
import { ApiClient, Stage } from './api-client';

export class WorkTimeClient extends ApiClient {

	constructor() {
		super({ baseURL: 'https://4qzzej7oka.execute-api.eu-central-1.amazonaws.com', });
	}

	public async getTimeOfDay(date = new Date()): Promise<WorkTime> {
		return this.get(`/time?date=${date.toISOString()}`);
	}

	public async createWorkTime(workTime: WorkTime): Promise<WorkTime> {
		return this.post(`/time`, workTime);
	}

}