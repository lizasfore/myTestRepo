import axios from 'axios';

export class Base {
    public async request(request: object) {
        const startTime: number = new Date().getTime();
        const response = await axios(request);
        const endTime: number = new Date().getTime();
        return {
            data: response,
            responseTime: endTime - startTime
        };
    }
}