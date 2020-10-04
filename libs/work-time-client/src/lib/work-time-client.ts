import { WorkTime } from '@myin-work/cloud-shared';
import { ApiClient, Stage } from './api-client';

export class WorkTimeClient extends ApiClient {

	constructor() {
		super({ baseURL: '' });
	}

	public async getTimeOfDay(date = new Date()): Promise<WorkTime> {
		return this.get(`/time?date=${date.toISOString()}`);
	}

	public async createWorkTime(workTime: WorkTime): Promise<WorkTime> {
		return this.post(`/time`, workTime);
	}

}