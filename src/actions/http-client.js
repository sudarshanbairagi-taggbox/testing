
import axios from 'axios';
import { APIHOST } from './api'

const requestInterceptor = (config) => {
    return {
        ...config,
        headers: {
            'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6MTIzNDUsInUiOiJnZWlyOTE4MjkzIiwiaWF0IjoxNjM3NjU2OTYwLCJleHAiOjE2NDU0MzI5NjB9W08RIyF40I9wIDxTaAZ1Zlg=',
            ...config.headers,
            productdomain: `taggbox.com`,
            requestDomain: window.location.href,
            isLiteCode: true
        },
    }
};

class HttpClient {
    constructor() {
        const options = { baseURL: APIHOST };
        const instance = axios.create(options);
        instance.interceptors.request.use(requestInterceptor);
        axios.interceptors.response.use(
            function (response) {
                return response;
            },
            function (error) {
                return Promise.reject(error);
            }
        );
        return instance;
    }
}
export default HttpClient;
