import { WorkTime } from '@myin-work/cloud-shared';
import { AuthClient } from '@myin/auth-client';
import { ApiClient, Stage } from './api-client';

export class WorkTimeClient extends ApiClient {

	constructor(authClient: AuthClient) {
		super({
			baseURL: 'https://ba9tfikzda.execute-api.eu-central-1.amazonaws.com/', stage: Stage.PROD,
			tokenFn: () => 'Bearer eyJraWQiOiJMajNlUnRiXC9sNzlpaHRzS0VDaldlSzM0QlY0ZmFwWnV2eEo5VzdQQkdoYz0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiem83Q2FZbXY0bHlKalNkcFdWeHE0ZyIsInN1YiI6IjI0Y2NlZWExLTcwYzEtNDE1Ny1iY2NiLTA2MDk4MjY3M2VjNyIsImF1ZCI6IjNyajhubzJkc2Y1M28yamtkcW0wbDdrZGZjIiwiZXZlbnRfaWQiOiJjNzg2MjY5Mi0yY2VlLTQ2MmEtOGUxZS1kODZmMjJhYjI1NzgiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTYwMjI1NjM0NiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfOUQ3UWZKYXBjIiwiY29nbml0bzp1c2VybmFtZSI6InNha2tha3UiLCJleHAiOjE2MDIyNTk5NDYsImlhdCI6MTYwMjI1NjM0Nn0.XIjRGlHBkHZG7onOxTF80VfSIJ_rQNGiB6IwHRwXa7S_eXi8vtE_FrjeqCh87zL7zLpmZSdzvn4UtuXprGARhtzDU--_JzWW2wFKlaNt5cvK49g0JOh4s3EOeSiiLu8MzI9BcGGpai7udBFKnSiI0d8-rd5VbCEpa2hoT36YVv2xUxX73_6NNeKFi-Ue0ek_0KI0RoC9EWwMqnBTeh43lr7lpletsq-1w5akm8Fj_iC7nMfDX3qo65S77Rnka_lLluo1gT1UHCfyK3d17ZoKRE8nkb3dcDblsLrvvtDZECxKX1V7Ca5eC579S_bhuDAz049_MaXitwgut6znB6Jnyg' //authClient.getToken(),
		});
	}

	public async getTimeOfDay(date = new Date()): Promise<WorkTime> {
		return this.get(`/time?date=${date.toISOString()}`);
	}

	public async createWorkTime(workTime: WorkTime): Promise<WorkTime> {
		return this.post(`/time`, workTime);
	}

}