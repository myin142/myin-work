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

import { HttpFile } from '../http/http';

export class TimePeriod {
    /**
    * Time Format in a 00:00 - 23:45 range, in 15 min units
    */
    'from': string;
    /**
    * Time Format in a 00:00 - 23:45 range, in 15 min units
    */
    'to': string;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "from",
            "baseName": "from",
            "type": "string",
            "format": ""
        },
        {
            "name": "to",
            "baseName": "to",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return TimePeriod.attributeTypeMap;
    }
    
    public constructor() {
    }
}

