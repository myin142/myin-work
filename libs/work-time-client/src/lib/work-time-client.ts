export class WorkTimeClient {

  constructor(private token: string) {
  }

  public async getTimeOfDay(dates: string[]): Promise<WorkTime[]> {
    console.log(dates);
    const query = dates.map((d) => `date=${d}`).join('&');
    // return this.get(`/time?${query}`);
    return [];
  }

  public async createWorkTime(workTime: WorkTime): Promise<WorkTime> {
    // return this.post(`/time`, workTime);
    console.log(workTime);
    return null;
  }
}

export interface WorkTime {
	userId?: string;
	dayId: string;
	times: TimeSegment[];
}

export interface TimeSegment {
	start: string;
	end?: string;
	name?: string;
	comment?: string;
	break?: boolean;
}
