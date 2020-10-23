import { WorkTime } from '@myin-work/cloud-shared';
import { AuthClient, ApiClient, Stage } from '@myin/auth-client';

export class WorkTimeClient extends ApiClient {

	constructor(authClient: AuthClient) {
		super({
			authClient,
			stage: Stage.PROD,
			baseURL: 'https://ba9tfikzda.execute-api.eu-central-1.amazonaws.com/',
			debug: true,
			tokenFn: () => authClient.token || 'Bearer eyJraWQiOiJMajNlUnRiXC9sNzlpaHRzS0VDaldlSzM0QlY0ZmFwWnV2eEo5VzdQQkdoYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyNGNjZWVhMS03MGMxLTQxNTctYmNjYi0wNjA5ODI2NzNlYzciLCJhdWQiOiIzcmo4bm8yZHNmNTNvMmprZHFtMGw3a2RmYyIsImV2ZW50X2lkIjoiYmViZDA2OGItNTRhZi00ZDgyLWFhODAtYzA4MDkxZjIxMjM4IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2MDMyMTEyMjMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xXzlEN1FmSmFwYyIsImNvZ25pdG86dXNlcm5hbWUiOiJzYWtrYWt1IiwiZXhwIjoxNjAzMjE0ODIzLCJpYXQiOjE2MDMyMTEyMjN9.BwcE5QVWJNRwqqIhXJJLj0YCPqYvWGnAxOCZTD_vAMY0aYEif-4kf98j1u7LxmbctWGjvnQ8a2SwXdKfJR80M7Rf_y3ctxIISHPmN9QT0JZ7yAAuW5_fOJFXn1-hg2Dv2AIj3sDGszE4-7u4JzIRTpgNGybSqXPPDzOmYDAa1c1SnPE6NKXFUlLhPzcx-IqU_46wLn3OnQX95atiY4iqfKhfB7TnWg5BK4qNmkVMvyCgCRVlRfaJrRFMZoENc-oEkEYdAhp4dMDdZDE1v24FIGfPXJAfh_sxjQnUjDhU1C173Wn4vM0vmpfFcmzOooCI5krwi4c6QRBsJ7Un8Qp2HQ',
		});
	}

	public async getTimeOfDay(date: string): Promise<WorkTime[]> {
		return this.get(`/time?date=${date}`);
	}

	public async createWorkTime(workTime: WorkTime): Promise<WorkTime> {
		return this.post(`/time`, workTime);
	}

}