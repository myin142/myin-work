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

import { ObservableDefaultApi } from "./ObservableAPI";
import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";

export interface DefaultApiProjectGetRequest {
}

export interface DefaultApiProjectTimeBookingDeleteRequest {
    /**
     * 
     * @type string
     * @memberof DefaultApiprojectTimeBookingDelete
     */
    day: string
    /**
     * 
     * @type number
     * @memberof DefaultApiprojectTimeBookingDelete
     */
    project?: number
}

export interface DefaultApiProjectTimeBookingGetRequest {
    /**
     * 
     * @type string
     * @memberof DefaultApiprojectTimeBookingGet
     */
    from: string
    /**
     * 
     * @type string
     * @memberof DefaultApiprojectTimeBookingGet
     */
    to: string
}

export interface DefaultApiProjectTimeBookingNotBookedGetRequest {
    /**
     * 
     * @type string
     * @memberof DefaultApiprojectTimeBookingNotBookedGet
     */
    from: string
    /**
     * 
     * @type string
     * @memberof DefaultApiprojectTimeBookingNotBookedGet
     */
    to: string
}

export interface DefaultApiProjectTimeBookingPostRequest {
    /**
     * 
     * @type ProjectDateTimeSpans
     * @memberof DefaultApiprojectTimeBookingPost
     */
    projectDateTimeSpans: ProjectDateTimeSpans
}

export interface DefaultApiProjectTimeBookingPutRequest {
    /**
     * 
     * @type ProjectDateTimeSpans
     * @memberof DefaultApiprojectTimeBookingPut
     */
    projectDateTimeSpans: ProjectDateTimeSpans
}

export interface DefaultApiTimeBookingCommitPatchRequest {
    /**
     * 
     * @type string
     * @memberof DefaultApitimeBookingCommitPatch
     */
    from: string
    /**
     * 
     * @type string
     * @memberof DefaultApitimeBookingCommitPatch
     */
    to: string
    /**
     * 
     * @type boolean
     * @memberof DefaultApitimeBookingCommitPatch
     */
    boss?: boolean
    /**
     * 
     * @type boolean
     * @memberof DefaultApitimeBookingCommitPatch
     */
    withdraw?: boolean
    /**
     * 
     * @type number
     * @memberof DefaultApitimeBookingCommitPatch
     */
    employee?: number
}

export interface DefaultApiTimeBookingGetRequest {
    /**
     * 
     * @type string
     * @memberof DefaultApitimeBookingGet
     */
    from: string
    /**
     * 
     * @type string
     * @memberof DefaultApitimeBookingGet
     */
    to: string
}

export interface DefaultApiTimeBookingPostRequest {
    /**
     * 
     * @type TimeSpanWithoutID
     * @memberof DefaultApitimeBookingPost
     */
    timeSpanWithoutID: TimeSpanWithoutID
}

export interface DefaultApiTimeBookingTimeSpanIdDeleteRequest {
    /**
     * 
     * @type number
     * @memberof DefaultApitimeBookingTimeSpanIdDelete
     */
    timeSpanId: number
}

export interface DefaultApiTimeBookingTimeSpanIdGetRequest {
    /**
     * 
     * @type number
     * @memberof DefaultApitimeBookingTimeSpanIdGet
     */
    timeSpanId: number
}

export interface DefaultApiTimeBookingTimeSpanIdPutRequest {
    /**
     * 
     * @type number
     * @memberof DefaultApitimeBookingTimeSpanIdPut
     */
    timeSpanId: number
    /**
     * 
     * @type TimeSpanWithoutID
     * @memberof DefaultApitimeBookingTimeSpanIdPut
     */
    timeSpanWithoutID?: TimeSpanWithoutID
}

export class ObjectDefaultApi {
    private api: ObservableDefaultApi

    public constructor(configuration: Configuration, requestFactory?: DefaultApiRequestFactory, responseProcessor?: DefaultApiResponseProcessor) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get all available Projects to book time on for the current user
     * @param param the request object
     */
    public projectGet(param: DefaultApiProjectGetRequest, options?: Configuration): Promise<GETProjectResponse> {
        return this.api.projectGet( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public projectTimeBookingDelete(param: DefaultApiProjectTimeBookingDeleteRequest, options?: Configuration): Promise<DELETEProjectTimeBookingResponse> {
        return this.api.projectTimeBookingDelete(param.day, param.project,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public projectTimeBookingGet(param: DefaultApiProjectTimeBookingGetRequest, options?: Configuration): Promise<GETProjectTimeSpansResponse> {
        return this.api.projectTimeBookingGet(param.from, param.to,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public projectTimeBookingNotBookedGet(param: DefaultApiProjectTimeBookingNotBookedGetRequest, options?: Configuration): Promise<GETNotBookedTimeResponse> {
        return this.api.projectTimeBookingNotBookedGet(param.from, param.to,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public projectTimeBookingPost(param: DefaultApiProjectTimeBookingPostRequest, options?: Configuration): Promise<ProjectDateTimeSpans> {
        return this.api.projectTimeBookingPost(param.projectDateTimeSpans,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public projectTimeBookingPut(param: DefaultApiProjectTimeBookingPutRequest, options?: Configuration): Promise<ProjectDateTimeSpans> {
        return this.api.projectTimeBookingPut(param.projectDateTimeSpans,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public timeBookingCommitPatch(param: DefaultApiTimeBookingCommitPatchRequest, options?: Configuration): Promise<PatchTimeBookingCommitResponse> {
        return this.api.timeBookingCommitPatch(param.from, param.to, param.boss, param.withdraw, param.employee,  options).toPromise();
    }

    /**
     * Get Time bookings for specified time span
     * @param param the request object
     */
    public timeBookingGet(param: DefaultApiTimeBookingGetRequest, options?: Configuration): Promise<GETTimeBookingResponse> {
        return this.api.timeBookingGet(param.from, param.to,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public timeBookingPost(param: DefaultApiTimeBookingPostRequest, options?: Configuration): Promise<TimeSpanWithID> {
        return this.api.timeBookingPost(param.timeSpanWithoutID,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public timeBookingTimeSpanIdDelete(param: DefaultApiTimeBookingTimeSpanIdDeleteRequest, options?: Configuration): Promise<TimeSpanWithID> {
        return this.api.timeBookingTimeSpanIdDelete(param.timeSpanId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public timeBookingTimeSpanIdGet(param: DefaultApiTimeBookingTimeSpanIdGetRequest, options?: Configuration): Promise<TimeSpanWithID> {
        return this.api.timeBookingTimeSpanIdGet(param.timeSpanId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public timeBookingTimeSpanIdPut(param: DefaultApiTimeBookingTimeSpanIdPutRequest, options?: Configuration): Promise<TimeSpanWithID> {
        return this.api.timeBookingTimeSpanIdPut(param.timeSpanId, param.timeSpanWithoutID,  options).toPromise();
    }

}
