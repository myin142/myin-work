/**
 * Time Booking
 * Time Booking hooray!
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { ProjectDateTimeSpans } from './ProjectDateTimeSpans';
import { HttpFile } from '../http/http';

export class GETProjectTimeSpansResponse {
    'projectTimeSpans'?: Array<ProjectDateTimeSpans>;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "projectTimeSpans",
            "baseName": "projectTimeSpans",
            "type": "Array<ProjectDateTimeSpans>",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return GETProjectTimeSpansResponse.attributeTypeMap;
    }
    
    public constructor() {
    }
}
