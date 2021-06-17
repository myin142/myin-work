// TODO: better import syntax?
import { BaseAPIRequestFactory, RequiredError } from './baseapi';
import {Configuration} from '../configuration';
import { RequestContext, HttpMethod, ResponseContext, HttpFile} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {isCodeInRange} from '../util';

import { DELETEProjectTimeBookingResponse } from '../models/DELETEProjectTimeBookingResponse';
import { GETNotBookedTimeResponse } from '../models/GETNotBookedTimeResponse';
import { GETProjectResponse } from '../models/GETProjectResponse';
import { GETProjectTimeSpansResponse } from '../models/GETProjectTimeSpansResponse';
import { GETTimeBookingResponse } from '../models/GETTimeBookingResponse';
import { PatchTimeBookingCommitResponse } from '../models/PatchTimeBookingCommitResponse';
import { ProjectDateTimeSpans } from '../models/ProjectDateTimeSpans';
import { TimeBookingError } from '../models/TimeBookingError';
import { TimeSpanWithID } from '../models/TimeSpanWithID';
import { TimeSpanWithoutID } from '../models/TimeSpanWithoutID';

/**
 * no description
 */
export class DefaultApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * Get all available Projects to book time on for the current user
     */
    public async projectGet(options?: Configuration): Promise<RequestContext> {
        let config = options || this.configuration;

        // Path Params
        const localVarPath = '/project';

        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params

        // Header Params

        // Form Params


        // Body Params

        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["ApiKey"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * @param day 
     * @param project 
     */
    public async projectTimeBookingDelete(day: string, project?: number, options?: Configuration): Promise<RequestContext> {
        let config = options || this.configuration;

        // verify required parameter 'day' is not null or undefined
        if (day === null || day === undefined) {
            throw new RequiredError('Required parameter day was null or undefined when calling projectTimeBookingDelete.');
        }



        // Path Params
        const localVarPath = '/project-time-booking';

        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (day !== undefined) {
            requestContext.setQueryParam("day", ObjectSerializer.serialize(day, "string", "date"));
        }
        if (project !== undefined) {
            requestContext.setQueryParam("project", ObjectSerializer.serialize(project, "number", "int64"));
        }

        // Header Params

        // Form Params


        // Body Params

        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["ApiKey"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * @param from 
     * @param to 
     */
    public async projectTimeBookingGet(from: string, to: string, options?: Configuration): Promise<RequestContext> {
        let config = options || this.configuration;

        // verify required parameter 'from' is not null or undefined
        if (from === null || from === undefined) {
            throw new RequiredError('Required parameter from was null or undefined when calling projectTimeBookingGet.');
        }


        // verify required parameter 'to' is not null or undefined
        if (to === null || to === undefined) {
            throw new RequiredError('Required parameter to was null or undefined when calling projectTimeBookingGet.');
        }


        // Path Params
        const localVarPath = '/project-time-booking';

        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (from !== undefined) {
            requestContext.setQueryParam("from", ObjectSerializer.serialize(from, "string", "date"));
        }
        if (to !== undefined) {
            requestContext.setQueryParam("to", ObjectSerializer.serialize(to, "string", "date"));
        }

        // Header Params

        // Form Params


        // Body Params

        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["ApiKey"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * @param from 
     * @param to 
     */
    public async projectTimeBookingNotBookedGet(from: string, to: string, options?: Configuration): Promise<RequestContext> {
        let config = options || this.configuration;

        // verify required parameter 'from' is not null or undefined
        if (from === null || from === undefined) {
            throw new RequiredError('Required parameter from was null or undefined when calling projectTimeBookingNotBookedGet.');
        }


        // verify required parameter 'to' is not null or undefined
        if (to === null || to === undefined) {
            throw new RequiredError('Required parameter to was null or undefined when calling projectTimeBookingNotBookedGet.');
        }


        // Path Params
        const localVarPath = '/project-time-booking/not-booked';

        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (from !== undefined) {
            requestContext.setQueryParam("from", ObjectSerializer.serialize(from, "string", "date"));
        }
        if (to !== undefined) {
            requestContext.setQueryParam("to", ObjectSerializer.serialize(to, "string", "date"));
        }

        // Header Params

        // Form Params


        // Body Params

        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["ApiKey"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * @param projectDateTimeSpans 
     */
    public async projectTimeBookingPost(projectDateTimeSpans: ProjectDateTimeSpans, options?: Configuration): Promise<RequestContext> {
        let config = options || this.configuration;

        // verify required parameter 'projectDateTimeSpans' is not null or undefined
        if (projectDateTimeSpans === null || projectDateTimeSpans === undefined) {
            throw new RequiredError('Required parameter projectDateTimeSpans was null or undefined when calling projectTimeBookingPost.');
        }


        // Path Params
        const localVarPath = '/project-time-booking';

        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params

        // Header Params

        // Form Params


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(projectDateTimeSpans, "ProjectDateTimeSpans", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["ApiKey"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * @param projectDateTimeSpans 
     */
    public async projectTimeBookingPut(projectDateTimeSpans: ProjectDateTimeSpans, options?: Configuration): Promise<RequestContext> {
        let config = options || this.configuration;

        // verify required parameter 'projectDateTimeSpans' is not null or undefined
        if (projectDateTimeSpans === null || projectDateTimeSpans === undefined) {
            throw new RequiredError('Required parameter projectDateTimeSpans was null or undefined when calling projectTimeBookingPut.');
        }


        // Path Params
        const localVarPath = '/project-time-booking';

        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params

        // Header Params

        // Form Params


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(projectDateTimeSpans, "ProjectDateTimeSpans", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["ApiKey"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * @param from 
     * @param to 
     * @param boss 
     * @param withdraw 
     * @param employee 
     */
    public async timeBookingCommitPatch(from: string, to: string, boss?: boolean, withdraw?: boolean, employee?: number, options?: Configuration): Promise<RequestContext> {
        let config = options || this.configuration;

        // verify required parameter 'from' is not null or undefined
        if (from === null || from === undefined) {
            throw new RequiredError('Required parameter from was null or undefined when calling timeBookingCommitPatch.');
        }


        // verify required parameter 'to' is not null or undefined
        if (to === null || to === undefined) {
            throw new RequiredError('Required parameter to was null or undefined when calling timeBookingCommitPatch.');
        }





        // Path Params
        const localVarPath = '/time-booking/commit';

        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, HttpMethod.PATCH);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (boss !== undefined) {
            requestContext.setQueryParam("boss", ObjectSerializer.serialize(boss, "boolean", ""));
        }
        if (withdraw !== undefined) {
            requestContext.setQueryParam("withdraw", ObjectSerializer.serialize(withdraw, "boolean", ""));
        }
        if (from !== undefined) {
            requestContext.setQueryParam("from", ObjectSerializer.serialize(from, "string", "date"));
        }
        if (to !== undefined) {
            requestContext.setQueryParam("to", ObjectSerializer.serialize(to, "string", "date"));
        }
        if (employee !== undefined) {
            requestContext.setQueryParam("employee", ObjectSerializer.serialize(employee, "number", "int64"));
        }

        // Header Params

        // Form Params


        // Body Params

        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["ApiKey"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Get Time bookings for specified time span
     * @param from 
     * @param to 
     */
    public async timeBookingGet(from: string, to: string, options?: Configuration): Promise<RequestContext> {
        let config = options || this.configuration;

        // verify required parameter 'from' is not null or undefined
        if (from === null || from === undefined) {
            throw new RequiredError('Required parameter from was null or undefined when calling timeBookingGet.');
        }


        // verify required parameter 'to' is not null or undefined
        if (to === null || to === undefined) {
            throw new RequiredError('Required parameter to was null or undefined when calling timeBookingGet.');
        }


        // Path Params
        const localVarPath = '/time-booking';

        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (from !== undefined) {
            requestContext.setQueryParam("from", ObjectSerializer.serialize(from, "string", "date"));
        }
        if (to !== undefined) {
            requestContext.setQueryParam("to", ObjectSerializer.serialize(to, "string", "date"));
        }

        // Header Params

        // Form Params


        // Body Params

        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["ApiKey"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * @param timeSpanWithoutID 
     */
    public async timeBookingPost(timeSpanWithoutID: TimeSpanWithoutID, options?: Configuration): Promise<RequestContext> {
        let config = options || this.configuration;

        // verify required parameter 'timeSpanWithoutID' is not null or undefined
        if (timeSpanWithoutID === null || timeSpanWithoutID === undefined) {
            throw new RequiredError('Required parameter timeSpanWithoutID was null or undefined when calling timeBookingPost.');
        }


        // Path Params
        const localVarPath = '/time-booking';

        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params

        // Header Params

        // Form Params


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(timeSpanWithoutID, "TimeSpanWithoutID", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["ApiKey"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * @param timeSpanId 
     */
    public async timeBookingTimeSpanIdDelete(timeSpanId: number, options?: Configuration): Promise<RequestContext> {
        let config = options || this.configuration;

        // verify required parameter 'timeSpanId' is not null or undefined
        if (timeSpanId === null || timeSpanId === undefined) {
            throw new RequiredError('Required parameter timeSpanId was null or undefined when calling timeBookingTimeSpanIdDelete.');
        }


        // Path Params
        const localVarPath = '/time-booking/{timeSpanId}'
            .replace('{' + 'timeSpanId' + '}', encodeURIComponent(String(timeSpanId)));

        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params

        // Header Params

        // Form Params


        // Body Params

        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["ApiKey"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * @param timeSpanId 
     */
    public async timeBookingTimeSpanIdGet(timeSpanId: number, options?: Configuration): Promise<RequestContext> {
        let config = options || this.configuration;

        // verify required parameter 'timeSpanId' is not null or undefined
        if (timeSpanId === null || timeSpanId === undefined) {
            throw new RequiredError('Required parameter timeSpanId was null or undefined when calling timeBookingTimeSpanIdGet.');
        }


        // Path Params
        const localVarPath = '/time-booking/{timeSpanId}'
            .replace('{' + 'timeSpanId' + '}', encodeURIComponent(String(timeSpanId)));

        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params

        // Header Params

        // Form Params


        // Body Params

        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["ApiKey"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * @param timeSpanId 
     * @param timeSpanWithoutID 
     */
    public async timeBookingTimeSpanIdPut(timeSpanId: number, timeSpanWithoutID?: TimeSpanWithoutID, options?: Configuration): Promise<RequestContext> {
        let config = options || this.configuration;

        // verify required parameter 'timeSpanId' is not null or undefined
        if (timeSpanId === null || timeSpanId === undefined) {
            throw new RequiredError('Required parameter timeSpanId was null or undefined when calling timeBookingTimeSpanIdPut.');
        }



        // Path Params
        const localVarPath = '/time-booking/{timeSpanId}'
            .replace('{' + 'timeSpanId' + '}', encodeURIComponent(String(timeSpanId)));

        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params

        // Header Params

        // Form Params


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(timeSpanWithoutID, "TimeSpanWithoutID", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["ApiKey"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

}

export class DefaultApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to projectGet
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async projectGet(response: ResponseContext): Promise<GETProjectResponse > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: GETProjectResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GETProjectResponse", ""
            ) as GETProjectResponse;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: GETProjectResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GETProjectResponse", ""
            ) as GETProjectResponse;
            return body;
        }

        let body = response.body || "";
        throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to projectTimeBookingDelete
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async projectTimeBookingDelete(response: ResponseContext): Promise<DELETEProjectTimeBookingResponse > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: DELETEProjectTimeBookingResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DELETEProjectTimeBookingResponse", ""
            ) as DELETEProjectTimeBookingResponse;
            return body;
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: TimeBookingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeBookingError", ""
            ) as TimeBookingError;
            throw new ApiException<TimeBookingError>(400, body);
        }
        if (isCodeInRange("403", response.httpStatusCode)) {
            const body: TimeBookingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeBookingError", ""
            ) as TimeBookingError;
            throw new ApiException<TimeBookingError>(403, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: DELETEProjectTimeBookingResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DELETEProjectTimeBookingResponse", ""
            ) as DELETEProjectTimeBookingResponse;
            return body;
        }

        let body = response.body || "";
        throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to projectTimeBookingGet
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async projectTimeBookingGet(response: ResponseContext): Promise<GETProjectTimeSpansResponse > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: GETProjectTimeSpansResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GETProjectTimeSpansResponse", ""
            ) as GETProjectTimeSpansResponse;
            return body;
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: TimeBookingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeBookingError", ""
            ) as TimeBookingError;
            throw new ApiException<TimeBookingError>(400, body);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            throw new ApiException<string>(response.httpStatusCode, "Project not found");
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: GETProjectTimeSpansResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GETProjectTimeSpansResponse", ""
            ) as GETProjectTimeSpansResponse;
            return body;
        }

        let body = response.body || "";
        throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to projectTimeBookingNotBookedGet
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async projectTimeBookingNotBookedGet(response: ResponseContext): Promise<GETNotBookedTimeResponse > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: GETNotBookedTimeResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GETNotBookedTimeResponse", ""
            ) as GETNotBookedTimeResponse;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: GETNotBookedTimeResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GETNotBookedTimeResponse", ""
            ) as GETNotBookedTimeResponse;
            return body;
        }

        let body = response.body || "";
        throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to projectTimeBookingPost
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async projectTimeBookingPost(response: ResponseContext): Promise<ProjectDateTimeSpans > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: ProjectDateTimeSpans = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ProjectDateTimeSpans", ""
            ) as ProjectDateTimeSpans;
            return body;
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: TimeBookingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeBookingError", ""
            ) as TimeBookingError;
            throw new ApiException<TimeBookingError>(400, body);
        }
        if (isCodeInRange("403", response.httpStatusCode)) {
            const body: TimeBookingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeBookingError", ""
            ) as TimeBookingError;
            throw new ApiException<TimeBookingError>(403, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ProjectDateTimeSpans = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ProjectDateTimeSpans", ""
            ) as ProjectDateTimeSpans;
            return body;
        }

        let body = response.body || "";
        throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to projectTimeBookingPut
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async projectTimeBookingPut(response: ResponseContext): Promise<ProjectDateTimeSpans > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ProjectDateTimeSpans = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ProjectDateTimeSpans", ""
            ) as ProjectDateTimeSpans;
            return body;
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: TimeBookingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeBookingError", ""
            ) as TimeBookingError;
            throw new ApiException<TimeBookingError>(400, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ProjectDateTimeSpans = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ProjectDateTimeSpans", ""
            ) as ProjectDateTimeSpans;
            return body;
        }

        let body = response.body || "";
        throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to timeBookingCommitPatch
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async timeBookingCommitPatch(response: ResponseContext): Promise<PatchTimeBookingCommitResponse > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: PatchTimeBookingCommitResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PatchTimeBookingCommitResponse", ""
            ) as PatchTimeBookingCommitResponse;
            return body;
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: TimeBookingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeBookingError", ""
            ) as TimeBookingError;
            throw new ApiException<TimeBookingError>(400, body);
        }
        if (isCodeInRange("403", response.httpStatusCode)) {
            const body: TimeBookingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeBookingError", ""
            ) as TimeBookingError;
            throw new ApiException<TimeBookingError>(403, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: PatchTimeBookingCommitResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PatchTimeBookingCommitResponse", ""
            ) as PatchTimeBookingCommitResponse;
            return body;
        }

        let body = response.body || "";
        throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to timeBookingGet
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async timeBookingGet(response: ResponseContext): Promise<GETTimeBookingResponse > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: GETTimeBookingResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GETTimeBookingResponse", ""
            ) as GETTimeBookingResponse;
            return body;
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: TimeBookingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeBookingError", ""
            ) as TimeBookingError;
            throw new ApiException<TimeBookingError>(400, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: GETTimeBookingResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GETTimeBookingResponse", ""
            ) as GETTimeBookingResponse;
            return body;
        }

        let body = response.body || "";
        throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to timeBookingPost
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async timeBookingPost(response: ResponseContext): Promise<TimeSpanWithID > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: TimeSpanWithID = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeSpanWithID", ""
            ) as TimeSpanWithID;
            return body;
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: TimeBookingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeBookingError", ""
            ) as TimeBookingError;
            throw new ApiException<TimeBookingError>(400, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: TimeSpanWithID = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeSpanWithID", ""
            ) as TimeSpanWithID;
            return body;
        }

        let body = response.body || "";
        throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to timeBookingTimeSpanIdDelete
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async timeBookingTimeSpanIdDelete(response: ResponseContext): Promise<TimeSpanWithID > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: TimeSpanWithID = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeSpanWithID", ""
            ) as TimeSpanWithID;
            return body;
        }
        if (isCodeInRange("403", response.httpStatusCode)) {
            const body: TimeBookingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeBookingError", ""
            ) as TimeBookingError;
            throw new ApiException<TimeBookingError>(403, body);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            throw new ApiException<string>(response.httpStatusCode, "TimeSpanId not found");
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: TimeSpanWithID = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeSpanWithID", ""
            ) as TimeSpanWithID;
            return body;
        }

        let body = response.body || "";
        throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to timeBookingTimeSpanIdGet
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async timeBookingTimeSpanIdGet(response: ResponseContext): Promise<TimeSpanWithID > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: TimeSpanWithID = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeSpanWithID", ""
            ) as TimeSpanWithID;
            return body;
        }
        if (isCodeInRange("403", response.httpStatusCode)) {
            const body: TimeBookingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeBookingError", ""
            ) as TimeBookingError;
            throw new ApiException<TimeBookingError>(403, body);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            throw new ApiException<string>(response.httpStatusCode, "TimeSpanId not found");
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: TimeSpanWithID = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeSpanWithID", ""
            ) as TimeSpanWithID;
            return body;
        }

        let body = response.body || "";
        throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to timeBookingTimeSpanIdPut
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async timeBookingTimeSpanIdPut(response: ResponseContext): Promise<TimeSpanWithID > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: TimeSpanWithID = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeSpanWithID", ""
            ) as TimeSpanWithID;
            return body;
        }
        if (isCodeInRange("304", response.httpStatusCode)) {
            throw new ApiException<string>(response.httpStatusCode, "Not modified");
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: TimeBookingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeBookingError", ""
            ) as TimeBookingError;
            throw new ApiException<TimeBookingError>(400, body);
        }
        if (isCodeInRange("403", response.httpStatusCode)) {
            const body: TimeBookingError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeBookingError", ""
            ) as TimeBookingError;
            throw new ApiException<TimeBookingError>(403, body);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            throw new ApiException<string>(response.httpStatusCode, "TimeSpanId not found");
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: TimeSpanWithID = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeSpanWithID", ""
            ) as TimeSpanWithID;
            return body;
        }

        let body = response.body || "";
        throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }

}
