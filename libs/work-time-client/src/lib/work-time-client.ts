import { WorkTime } from '@myin-work/cloud-shared';
import { AuthClient, ApiClient, Stage } from '@myin/auth-client';

export class WorkTimeClient extends ApiClient {

	constructor(authClient: AuthClient) {
		super({
			authClient,
			stage: Stage.PROD,
			baseURL: 'https://ba9tfikzda.execute-api.eu-central-1.amazonaws.com/',
			debug: true,
			tokenFn: () => authClient.token,
		});
	}

	public async getTimeOfDay(dates: string[]): Promise<WorkTime[]> {
		const query = dates.map(d => `date=${d}`).join('&');
		return this.get(`/time?${query}`);
	}

	public async createWorkTime(workTime: WorkTime): Promise<WorkTime> {
		return this.post(`/time`, workTime);
	}

}