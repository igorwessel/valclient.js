import { AxiosRequestConfig, AxiosStatic } from "axios";

import { BaseEndpoints } from "@interfaces/client";
import { EndpointType } from "@type/client";
import { IHttp } from "@interfaces/http";

class HttpService implements IHttp {
    private _baseEndpoints: BaseEndpoints = {
        pd: null,
        glz: null,
        shared: null,
        local: null,
    };

    private readonly _axios: AxiosStatic;

    constructor(axios?: AxiosStatic) {
        this._axios = axios;
    }

    get endpoints(): BaseEndpoints {
        return this._baseEndpoints;
    }

    set baseEndpoint(baseEndpoint: Partial<BaseEndpoints>) {
        this._baseEndpoints = {
            ...this._baseEndpoints,
            ...baseEndpoint,
        };
    }

    async fetch<T>(endpoint: string, endpointType: EndpointType, config?: AxiosRequestConfig): Promise<T> {
        const { data } = await this._axios.get<T>(this._getCorrectEndpoint(endpoint, endpointType), config);

        return data;
    }

    async post<T>(
        endpoint: string,
        endpointType: EndpointType,
        body?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        const { data } = await this._axios.post<T>(this._getCorrectEndpoint(endpoint, endpointType), body, config);

        return data;
    }

    async put<T>(
        endpoint: string,
        endpointType: EndpointType,
        body?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        const { data } = await this._axios.put<T>(this._getCorrectEndpoint(endpoint, endpointType), body, config);

        return data;
    }

    async del<T>(endpoint: string, endpointType: EndpointType, config?: AxiosRequestConfig): Promise<T> {
        const { data } = await this._axios.delete<T>(this._getCorrectEndpoint(endpoint, endpointType), config);

        return data;
    }

    private _getCorrectEndpoint(endpoint: string, endpointType: EndpointType) {
        return this._baseEndpoints[endpointType] + endpoint;
    }
}

export { HttpService };
