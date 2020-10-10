import { WorkTime } from '@myin-work/cloud-shared';
import { AuthClient } from '@myin/auth-client';
import { ApiClient, Stage } from './api-client';

export class WorkTimeClient extends ApiClient {

	constructor(authClient: AuthClient) {
		super({
			baseURL: 'https://ba9tfikzda.execute-api.eu-central-1.amazonaws.com/', stage: Stage.PROD,
			tokenFn: () => authClient.getToken() || 'Bearer eyJraWQiOiJMajNlUnRiXC9sNzlpaHRzS0VDaldlSzM0QlY0ZmFwWnV2eEo5VzdQQkdoYz0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiUElCaGNpWlRqbzg1dzFVTzdPY0p5ZyIsInN1YiI6IjI0Y2NlZWExLTcwYzEtNDE1Ny1iY2NiLTA2MDk4MjY3M2VjNyIsImF1ZCI6IjNyajhubzJkc2Y1M28yamtkcW0wbDdrZGZjIiwiZXZlbnRfaWQiOiJiNDkyMTBiMC1hZTBmLTQ5YjgtYTFhYS1hYjljNjNjNDM1NWYiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTYwMjMxNDgzNywiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfOUQ3UWZKYXBjIiwiY29nbml0bzp1c2VybmFtZSI6InNha2tha3UiLCJleHAiOjE2MDIzMTg0MzcsImlhdCI6MTYwMjMxNDgzN30.WaUeF4MZ1Xlr0uVDXwRSHaqeSBZX9Gc3qAFJ8Wbaghb18qjaBlj2xLOcjnXzV4Y1FDPc2k67GoconorNd8GlgQTXGgmupVmfBE7MzahNtdp-NrAKvTSjWb8kNzUJhT_NG6DYlg5gsvHnDEVeV6U7LWeBA5ohVR37OsE3tSUw0y1hWicGSl7uoT3OELmJRur4CrNpNV_9mjN4nfcyDpdGb1XykItLGToWMzZ1bBj2Li_Ixa0f84JKQQKuoT0WTcNVWPVlbWyWHZ1NDCV6iXUFj3NMFdNYyRGIU-XnNs-pUzstPGJvb_S-1YqJo33gkpBI3xvOmGixgvNUe7Jc7VNNQw',
		});
	}

	public async getTimeOfDay(date = new Date()): Promise<WorkTime[]> {
		return this.get(`/time?date=${date.toISOString()}`);
	}

	public async createWorkTime(workTime: WorkTime): Promise<WorkTime> {
		return this.post(`/time`, workTime);
	}

}