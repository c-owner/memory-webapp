import axios, { AxiosRequestConfig } from 'axios';

const client = axios.create();

const axiosRequest = function (url: string, config?: AxiosRequestConfig) {
    const onSuccess = function (response: any) {
        console.debug(`Request Successful!`, response);
        return response.data;
    };

    const onError = function (error: any) {
        console.error(`Request Failed:`, error.config);

        if (error.response) {
            console.error(`Status:`, error.response.status);
            console.error(`Data:`, error.response.data);
            console.error(`Headers:`, error.response.headers);
        } else {
            console.error(`Error Message:`, error.message);
        }

        return Promise.reject(error);
    };

    return client(url, config).then(onSuccess).catch(onError);
};

export default axiosRequest;

export const fetcher = (url: string, config?: AxiosRequestConfig) => axiosRequest(url, config);
