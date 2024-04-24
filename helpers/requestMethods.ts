import { Base } from './base';
import { config } from 'dotenv';
config();

export class requestMethod extends Base {
    get(baseUrl: string, endPoint: string, queryParams: string = '', requestHeaders: object = {}): object {
        return {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}${endPoint}${queryParams}`,
            headers: requestHeaders
        };
    }

    post(baseUrl: string, endPoint: string, payload: object = {}, requestHeaders = {}): object {
        return {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}${endPoint}`,
            headers: requestHeaders,
            data: payload
        };
    }

    put(baseUrl: string, endPoint: string, payload: object = {}, requestHeaders: object = {}): object {
        return {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${baseUrl}${endPoint}`,
            headers: requestHeaders,
            // {
            //     'Content-Type': 'application/json',
            //     Authorization: `Bearer ${this.Token}`
            // },
            data: payload
        };
    }

    delete(baseUrl: string, endPoint: string, requestHeaders: object = {}): object {
        return {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${baseUrl}${endPoint}`,
            headers: requestHeaders,
            // {
            //     Authorization: `Bearer ${this.Token}`
            // }
        };
    }
}

export default new requestMethod();