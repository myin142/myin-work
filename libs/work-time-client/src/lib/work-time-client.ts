import { WorkTime } from '@myin-work/cloud-shared';
import { AuthClient } from '@myin/auth-client';
import { ApiClient, Stage } from './api-client';

export class WorkTimeClient extends ApiClient {

	constructor(authClient: AuthClient) {
		super({
			baseURL: 'https://ba9tfikzda.execute-api.eu-central-1.amazonaws.com/', stage: Stage.PROD,
			tokenFn: () => authClient.getToken() || 'Bearer eyJraWQiOiJMajNlUnRiXC9sNzlpaHRzS0VDaldlSzM0QlY0ZmFwWnV2eEo5VzdQQkdoYz0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiaVotWVdMOVBfQUZTVlZ6RnRzbWMydyIsInN1YiI6IjI0Y2NlZWExLTcwYzEtNDE1Ny1iY2NiLTA2MDk4MjY3M2VjNyIsImF1ZCI6IjNyajhubzJkc2Y1M28yamtkcW0wbDdrZGZjIiwiZXZlbnRfaWQiOiIxMDdjOGU2Zi02YjdkLTQ4OTgtYTMxZi0yMmMzYjYxYmQ0MDUiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTYwMjg0NDA5NywiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfOUQ3UWZKYXBjIiwiY29nbml0bzp1c2VybmFtZSI6InNha2tha3UiLCJleHAiOjE2MDI4NDc2OTcsImlhdCI6MTYwMjg0NDA5N30.dlJq_TTv9vLzzi5oEF551kLnBOTalz2NEnMU-N3xgAbsyc0sPsk5z8dceF32cFDCQV670ju3xiR-Qq_OBtSxMVrOfjn9o9AZm7H5_fmV31oFUSADI4iJOUmhFfb6ZQnYeNQz2eS0P3rTKd14kAM_Oc1QehEgDrq1Gbimp6lEROKWckKe_B51STyGn_2fSBjVQE05ipES8XeTdDISVmZlGkOX67YsYhbguyR-rvZPHTnFg1UXiihem_qOYPsaS2Fgiqy0PIze-lUAmgU5kv4DgKtOHF6qVp2qnqkB64XaMmoF9OOZ3beUi12n9Z03F2Gha0HK0pi95A54adL_wd2wiQ',
		});
	}

	public async getTimeOfDay(date: string): Promise<WorkTime[]> {
		return this.get(`/time?date=${date}`);
	}

	public async createWorkTime(workTime: WorkTime): Promise<WorkTime> {
		return this.post(`/time`, workTime);
	}

}