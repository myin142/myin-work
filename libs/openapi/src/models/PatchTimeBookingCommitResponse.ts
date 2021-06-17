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

import { TimeBookingLockDate } from './TimeBookingLockDate';
import { HttpFile } from '../http/http';

export class PatchTimeBookingCommitResponse {
    'locks': Array<TimeBookingLockDate>;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "locks",
            "baseName": "locks",
            "type": "Array<TimeBookingLockDate>",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return PatchTimeBookingCommitResponse.attributeTypeMap;
    }
    
    public constructor() {
    }
}

