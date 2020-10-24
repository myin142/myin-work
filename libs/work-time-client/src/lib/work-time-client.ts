import { WorkTime } from '@myin-work/cloud-shared';
import { AuthClient, ApiClient, Stage } from '@myin/auth-client';

export class WorkTimeClient extends ApiClient {

	constructor(authClient: AuthClient) {
		super({
			authClient,
			stage: Stage.PROD,
			baseURL: 'https://ba9tfikzda.execute-api.eu-central-1.amazonaws.com/',
			debug: true,
			tokenFn: () => authClient.token || 'Bearer eyJraWQiOiJMajNlUnRiXC9sNzlpaHRzS0VDaldlSzM0QlY0ZmFwWnV2eEo5VzdQQkdoYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyNGNjZWVhMS03MGMxLTQxNTctYmNjYi0wNjA5ODI2NzNlYzciLCJhdWQiOiIzcmo4bm8yZHNmNTNvMmprZHFtMGw3a2RmYyIsImV2ZW50X2lkIjoiMzQ5NDhjMTQtMDM4Ny00NGFmLWI2ZjktYjdmZTUyOTRlMjI4IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2MDM1Mjc0NDksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xXzlEN1FmSmFwYyIsImNvZ25pdG86dXNlcm5hbWUiOiJzYWtrYWt1IiwiZXhwIjoxNjAzNTMxMDQ5LCJpYXQiOjE2MDM1Mjc0NDl9.T_BuHtrRT43MQeH1Zvjv-KmIxK89BWBq7_pwX3t3CLG0TCwTaj38-Xv0ngXJzGuwsR1iJnwwbTdzb5woJK_n6PBLdZ7yCNpb1xme3UZiMXq3eIkFy5Q6bytJk5ylI-2lvqOBRDJS_ouy3u2rKTXNa51C_awdL8eqCzhitMUjoMRvMmOk8emBXn9zDjfP5bjdSe-s8k0FdiANRzqZfUq5dRGVkVvOClAqNY2WbrlhudbgIHWL_tHO47lSsiVrPazpbDcr7A7DHni-2ZQ4i5qu7FXgG4kFhDUXAB676WDpJOGxn_4R5WxVBzSBpcN8vIxHpqo7kv11a5YELKK9po3jdg',
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