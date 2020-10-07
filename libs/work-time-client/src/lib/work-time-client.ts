import { WorkTime } from '@myin-work/cloud-shared';
import { AuthClient } from '@myin/auth-client';
import { ApiClient, Stage } from './api-client';

export class WorkTimeClient extends ApiClient {

	constructor(authClient: AuthClient) {
		super({ baseURL: 'https://ba9tfikzda.execute-api.eu-central-1.amazonaws.com/', stage: Stage.PROD, tokenFn: () => authClient.getToken() });
	}

	public async getTimeOfDay(date = new Date()): Promise<WorkTime> {
		return this.get(`/time?date=${date.toISOString()}`);
	}

	public async createWorkTime(workTime: WorkTime): Promise<WorkTime> {
		console.log(workTime);
		return this.post(`/time`, workTime);
	}

}