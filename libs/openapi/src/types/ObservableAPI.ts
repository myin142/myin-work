import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
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

import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";
export class ObservableDefaultApi {
    private requestFactory: DefaultApiRequestFactory;
    private responseProcessor: DefaultApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new DefaultApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new DefaultApiResponseProcessor();
    }

    /**
     * Get all available Projects to book time on for the current user
     */
    public projectGet(options?: Configuration): Observable<GETProjectResponse> {
        const requestContextPromise = this.requestFactory.projectGet(options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.projectGet(rsp)));
            }));
    }
 
    /**
     * @param day 
     * @param project 
     */
    public projectTimeBookingDelete(day: string, project?: number, options?: Configuration): Observable<DELETEProjectTimeBookingResponse> {
        const requestContextPromise = this.requestFactory.projectTimeBookingDelete(day, project, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.projectTimeBookingDelete(rsp)));
            }));
    }
 
    /**
     * @param from 
     * @param to 
     */
    public projectTimeBookingGet(from: string, to: string, options?: Configuration): Observable<GETProjectTimeSpansResponse> {
        const requestContextPromise = this.requestFactory.projectTimeBookingGet(from, to, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.projectTimeBookingGet(rsp)));
            }));
    }
 
    /**
     * @param from 
     * @param to 
     */
    public projectTimeBookingNotBookedGet(from: string, to: string, options?: Configuration): Observable<GETNotBookedTimeResponse> {
        const requestContextPromise = this.requestFactory.projectTimeBookingNotBookedGet(from, to, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.projectTimeBookingNotBookedGet(rsp)));
            }));
    }
 
    /**
     * @param projectDateTimeSpans 
     */
    public projectTimeBookingPost(projectDateTimeSpans: ProjectDateTimeSpans, options?: Configuration): Observable<ProjectDateTimeSpans> {
        const requestContextPromise = this.requestFactory.projectTimeBookingPost(projectDateTimeSpans, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.projectTimeBookingPost(rsp)));
            }));
    }
 
    /**
     * @param projectDateTimeSpans 
     */
    public projectTimeBookingPut(projectDateTimeSpans: ProjectDateTimeSpans, options?: Configuration): Observable<ProjectDateTimeSpans> {
        const requestContextPromise = this.requestFactory.projectTimeBookingPut(projectDateTimeSpans, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.projectTimeBookingPut(rsp)));
            }));
    }
 
    /**
     * @param from 
     * @param to 
     * @param boss 
     * @param withdraw 
     * @param employee 
     */
    public timeBookingCommitPatch(from: string, to: string, boss?: boolean, withdraw?: boolean, employee?: number, options?: Configuration): Observable<PatchTimeBookingCommitResponse> {
        const requestContextPromise = this.requestFactory.timeBookingCommitPatch(from, to, boss, withdraw, employee, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.timeBookingCommitPatch(rsp)));
            }));
    }
 
    /**
     * Get Time bookings for specified time span
     * @param from 
     * @param to 
     */
    public timeBookingGet(from: string, to: string, options?: Configuration): Observable<GETTimeBookingResponse> {
        const requestContextPromise = this.requestFactory.timeBookingGet(from, to, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.timeBookingGet(rsp)));
            }));
    }
 
    /**
     * @param timeSpanWithoutID 
     */
    public timeBookingPost(timeSpanWithoutID: TimeSpanWithoutID, options?: Configuration): Observable<TimeSpanWithID> {
        const requestContextPromise = this.requestFactory.timeBookingPost(timeSpanWithoutID, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.timeBookingPost(rsp)));
            }));
    }
 
    /**
     * @param timeSpanId 
     */
    public timeBookingTimeSpanIdDelete(timeSpanId: number, options?: Configuration): Observable<TimeSpanWithID> {
        const requestContextPromise = this.requestFactory.timeBookingTimeSpanIdDelete(timeSpanId, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.timeBookingTimeSpanIdDelete(rsp)));
            }));
    }
 
    /**
     * @param timeSpanId 
     */
    public timeBookingTimeSpanIdGet(timeSpanId: number, options?: Configuration): Observable<TimeSpanWithID> {
        const requestContextPromise = this.requestFactory.timeBookingTimeSpanIdGet(timeSpanId, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.timeBookingTimeSpanIdGet(rsp)));
            }));
    }
 
    /**
     * @param timeSpanId 
     * @param timeSpanWithoutID 
     */
    public timeBookingTimeSpanIdPut(timeSpanId: number, timeSpanWithoutID?: TimeSpanWithoutID, options?: Configuration): Observable<TimeSpanWithID> {
        const requestContextPromise = this.requestFactory.timeBookingTimeSpanIdPut(timeSpanId, timeSpanWithoutID, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.timeBookingTimeSpanIdPut(rsp)));
            }));
    }
 
}
