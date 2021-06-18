import { WorkTime } from '@myin-work/cloud-shared';

export class WorkTimeClient {

  private sessionExpiredCallback: () => void;

  constructor(private token: string) {
  }

  private callExpiredCallbacks() {
      this.sessionExpiredCallback();
  }

  public addExpiredCallback(callback: () => void) {
      this.sessionExpiredCallback = callback;
  }

  public async getTimeOfDay(dates: string[]): Promise<WorkTime[]> {
    const query = dates.map((d) => `date=${d}`).join('&');
    // return this.get(`/time?${query}`);
    return [];
  }

  public async createWorkTime(workTime: WorkTime): Promise<WorkTime> {
    // return this.post(`/time`, workTime);
    return null;
  }
}
