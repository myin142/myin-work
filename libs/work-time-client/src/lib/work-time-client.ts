import {createConfiguration, DefaultApi, ProjectNameIDMap, ServerConfiguration} from '@myin-work/openapi';

export class WorkTimeClient {

  private static IMS_URL = 'https://ims-dev.it-experts.at/api/v1';

  private client: DefaultApi;

  constructor(token: string) {
    this.client = new DefaultApi(createConfiguration({
      baseServer: new ServerConfiguration(WorkTimeClient.IMS_URL, {}),
      authMethods: {ApiKey: token}
    }));
  }

  public async getProjects(): Promise<ProjectNameIDMap[]> {
    return this.client.projectGet().then(x => x.projects);
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
  projectId?: number;
}
