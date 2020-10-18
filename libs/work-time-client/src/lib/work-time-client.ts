import { WorkTime } from '@myin-work/cloud-shared';
import { AuthClient, ApiClient, Stage } from '@myin/auth-client';

export class WorkTimeClient extends ApiClient {

	constructor(authClient: AuthClient) {
		super({
			authClient,
			baseURL: 'https://ba9tfikzda.execute-api.eu-central-1.amazonaws.com/', stage: Stage.PROD,
			tokenFn: () => authClient.getToken(),
		});
	}

	public async getTimeOfDay(date: string): Promise<WorkTime[]> {
		return this.get(`/time?date=${date}`);
	}

	public async createWorkTime(workTime: WorkTime): Promise<WorkTime> {
		return this.post(`/time`, workTime);
	}

}