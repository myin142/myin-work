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

import { ProjectNameIDMap } from './ProjectNameIDMap';
import { HttpFile } from '../http/http';

export class GETProjectResponse {
    'projects'?: Array<ProjectNameIDMap>;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "projects",
            "baseName": "projects",
            "type": "Array<ProjectNameIDMap>",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return GETProjectResponse.attributeTypeMap;
    }
    
    public constructor() {
    }
}

