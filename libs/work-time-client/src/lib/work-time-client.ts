import { WorkTime } from '@myin-work/cloud-shared';
import { AuthClient } from '@myin/auth-client';
import { ApiClient, Stage } from './api-client';

export class WorkTimeClient extends ApiClient {

	constructor(authClient: AuthClient) {
		super({
			baseURL: 'https://ba9tfikzda.execute-api.eu-central-1.amazonaws.com/', stage: Stage.PROD,
			tokenFn: () => authClient.getToken() || 'Bearer eyJraWQiOiJMajNlUnRiXC9sNzlpaHRzS0VDaldlSzM0QlY0ZmFwWnV2eEo5VzdQQkdoYz0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiWkgzZHdzYm5qaThGZXBEeWVFdkFTdyIsInN1YiI6IjI0Y2NlZWExLTcwYzEtNDE1Ny1iY2NiLTA2MDk4MjY3M2VjNyIsImF1ZCI6IjNyajhubzJkc2Y1M28yamtkcW0wbDdrZGZjIiwiZXZlbnRfaWQiOiIxNDg3M2ZhOS1iNjYyLTQ3ZWUtODExYy00ZGMwNGIwYmEzNzQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTYwMjgzMjg4OCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfOUQ3UWZKYXBjIiwiY29nbml0bzp1c2VybmFtZSI6InNha2tha3UiLCJleHAiOjE2MDI4MzY0ODgsImlhdCI6MTYwMjgzMjg4OH0.BD86aD_vzWwhqd8UwEoFlzVt3ABi2EU17fCQWideycKc-j1RQYOf65Wch4kAm_j3vDxdTtfJVDQ7IDbFRJa_76doQz6epaYWh0xCBDXCt_gop_ZKGXpbAPnIdETKEPmj_HS4p_wO4r6gLqOYgbgBdT_e7ConWeI7poeWumvY2f6s1Vcn1Betz9rkBNpMwZetQ0D5-3oc8RE5-WMwLpoFqhtBh8JAUzBR02JSY8PFITW-hCBFa1Bcar15fqd6-8nG_ceFhfMqXhurHt1N8jMdNBA_X_AEebUfpCG3FprtMryc12da-X-pwf4HSPo51LOwkIcqTmtVZUbisrhVF12XHw',
		});
	}

	public async getTimeOfDay(date: string): Promise<WorkTime[]> {
		return this.get(`/time?date=${date}`);
	}

	public async createWorkTime(workTime: WorkTime): Promise<WorkTime> {
		return this.post(`/time`, workTime);
	}

}