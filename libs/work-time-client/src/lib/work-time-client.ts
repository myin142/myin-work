import { WorkTime } from '@myin-work/cloud-shared';
import { AuthClient } from '@myin/auth-client';
import { ApiClient, Stage } from './api-client';

export class WorkTimeClient extends ApiClient {

	constructor(authClient: AuthClient) {
		super({
			baseURL: 'https://ba9tfikzda.execute-api.eu-central-1.amazonaws.com/', stage: Stage.PROD,
			tokenFn: () => 'Bearer eyJraWQiOiJMajNlUnRiXC9sNzlpaHRzS0VDaldlSzM0QlY0ZmFwWnV2eEo5VzdQQkdoYz0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoidWJxbHJJT0VJdG5pUkdFN1BPSzZyZyIsInN1YiI6IjI0Y2NlZWExLTcwYzEtNDE1Ny1iY2NiLTA2MDk4MjY3M2VjNyIsImF1ZCI6IjNyajhubzJkc2Y1M28yamtkcW0wbDdrZGZjIiwiZXZlbnRfaWQiOiIxNDdhMTVlZi0yNDIyLTRlOTYtYTBlNy03M2E3ODY5MzlhZTEiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTYwMjE3Mjc1NCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfOUQ3UWZKYXBjIiwiY29nbml0bzp1c2VybmFtZSI6InNha2tha3UiLCJleHAiOjE2MDIxNzYzNTQsImlhdCI6MTYwMjE3Mjc1NH0.i_Mcnssx0-o2iFqaA4TsdyfwFF4jczvavMNPJMZCXmeRwZdFJgj8hTJNF1xvDxImSoIMZLG_R3rpcGleHB2mn-LBt77I13CZ76Bxri87JjW7OZER_92KggCb46ypoQMicnIUw0gvR5VyS7y4DqTeEKNPDkZPiYX2xQ044GgFtyX6wfx-wgm_cOwqHvKCDz6kEcWgkHJYCnKkch1mNUJdD6PPxeU8XvwtbBG7yhxf38VMEm3u-CjWpnG13Pol_sZ1wEU4H4C_gcmU0T5Y5WL5fwUQOz_eWZaLd0TEpAdyNBcl0evEPvXcBRjLnCpgnCLeJQKimSDCIsGxGB9djg4tsA'
		});
	}

	public async getTimeOfDay(date = new Date()): Promise<WorkTime> {
		return this.get(`/time?date=${date.toISOString()}`);
	}

	public async createWorkTime(workTime: WorkTime): Promise<WorkTime> {
		return this.post(`/time`, workTime);
	}

}