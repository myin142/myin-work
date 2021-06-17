import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'

import { DELETEProjectTimeBookingResponse } from '../models/DELETEProjectTimeBookingResponse';
import { ErrorCodeEnum } from '../models/ErrorCodeEnum';
import { GETNotBookedTimeResponse } from '../models/GETNotBookedTimeResponse';
import { GETProjectResponse } from '../models/GETProjectResponse';
import { GETProjectTimeSpansResponse } from '../models/GETProjectTimeSpansResponse';
import { GETTimeBookingResponse } from '../models/GETTimeBookingResponse';
import { NotBookedTimePeriod } from '../models/NotBookedTimePeriod';
import { PUTTimeBookingRequest } from '../models/PUTTimeBookingRequest';
import { PUTTimeBookingTimeSpan } from '../models/PUTTimeBookingTimeSpan';
import { PatchTimeBookingCommitResponse } from '../models/PatchTimeBookingCommitResponse';
import { ProjectDateTimeSpans } from '../models/ProjectDateTimeSpans';
import { ProjectNameIDMap } from '../models/ProjectNameIDMap';
import { ProjectTimeSpan } from '../models/ProjectTimeSpan';
import { TimeBookingError } from '../models/TimeBookingError';
import { TimeBookingLockDate } from '../models/TimeBookingLockDate';
import { TimePeriod } from '../models/TimePeriod';
import { TimeSpanTypeEnum } from '../models/TimeSpanTypeEnum';
import { TimeSpanWithID } from '../models/TimeSpanWithID';
import { TimeSpanWithIDAllOf } from '../models/TimeSpanWithIDAllOf';
import { TimeSpanWithoutID } from '../models/TimeSpanWithoutID';
import { ObservableDefaultApi } from './ObservableAPI';

import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";
export class PromiseDefaultApi {
    private api: ObservableDefaultApi

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get all available Projects to book time on for the current user
     */
    public projectGet(options?: Configuration): Promise<GETProjectResponse> {
        const result = this.api.projectGet(options);
        return result.toPromise();
    }

    /**
     * @param day 
     * @param project 
     */
    public projectTimeBookingDelete(day: string, project?: number, options?: Configuration): Promise<DELETEProjectTimeBookingResponse> {
        const result = this.api.projectTimeBookingDelete(day, project, options);
        return result.toPromise();
    }

    /**
     * @param from 
     * @param to 
     */
    public projectTimeBookingGet(from: string, to: string, options?: Configuration): Promise<GETProjectTimeSpansResponse> {
        const result = this.api.projectTimeBookingGet(from, to, options);
        return result.toPromise();
    }

    /**
     * @param from 
     * @param to 
     */
    public projectTimeBookingNotBookedGet(from: string, to: string, options?: Configuration): Promise<GETNotBookedTimeResponse> {
        const result = this.api.projectTimeBookingNotBookedGet(from, to, options);
        return result.toPromise();
    }

    /**
     * @param projectDateTimeSpans 
     */
    public projectTimeBookingPost(projectDateTimeSpans: ProjectDateTimeSpans, options?: Configuration): Promise<ProjectDateTimeSpans> {
        const result = this.api.projectTimeBookingPost(projectDateTimeSpans, options);
        return result.toPromise();
    }

    /**
     * @param projectDateTimeSpans 
     */
    public projectTimeBookingPut(projectDateTimeSpans: ProjectDateTimeSpans, options?: Configuration): Promise<ProjectDateTimeSpans> {
        const result = this.api.projectTimeBookingPut(projectDateTimeSpans, options);
        return result.toPromise();
    }

    /**
     * @param from 
     * @param to 
     * @param boss 
     * @param withdraw 
     * @param employee 
     */
    public timeBookingCommitPatch(from: string, to: string, boss?: boolean, withdraw?: boolean, employee?: number, options?: Configuration): Promise<PatchTimeBookingCommitResponse> {
        const result = this.api.timeBookingCommitPatch(from, to, boss, withdraw, employee, options);
        return result.toPromise();
    }

    /**
     * Get Time bookings for specified time span
     * @param from 
     * @param to 
     */
    public timeBookingGet(from: string, to: string, options?: Configuration): Promise<GETTimeBookingResponse> {
        const result = this.api.timeBookingGet(from, to, options);
        return result.toPromise();
    }

    /**
     * @param timeSpanWithoutID 
     */
    public timeBookingPost(timeSpanWithoutID: TimeSpanWithoutID, options?: Configuration): Promise<TimeSpanWithID> {
        const result = this.api.timeBookingPost(timeSpanWithoutID, options);
        return result.toPromise();
    }

    /**
     * @param timeSpanId 
     */
    public timeBookingTimeSpanIdDelete(timeSpanId: number, options?: Configuration): Promise<TimeSpanWithID> {
        const result = this.api.timeBookingTimeSpanIdDelete(timeSpanId, options);
        return result.toPromise();
    }

    /**
     * @param timeSpanId 
     */
    public timeBookingTimeSpanIdGet(timeSpanId: number, options?: Configuration): Promise<TimeSpanWithID> {
        const result = this.api.timeBookingTimeSpanIdGet(timeSpanId, options);
        return result.toPromise();
    }

    /**
     * @param timeSpanId 
     * @param timeSpanWithoutID 
     */
    public timeBookingTimeSpanIdPut(timeSpanId: number, timeSpanWithoutID?: TimeSpanWithoutID, options?: Configuration): Promise<TimeSpanWithID> {
        const result = this.api.timeBookingTimeSpanIdPut(timeSpanId, timeSpanWithoutID, options);
        return result.toPromise();
    }


}



