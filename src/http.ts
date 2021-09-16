import { AxiosRequestConfig, AxiosStatic } from "axios";
import { BaseEndpoints, EndpointType } from "@interfaces/client";

class HttpService {
    private readonly _baseEndpoint: BaseEndpoints;
    private readonly _axios: AxiosStatic;

    constructor(baseEndpoints: BaseEndpoints, axios?: AxiosStatic) {
        this._baseEndpoint = baseEndpoints;
        this._axios = axios;
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
        return this._baseEndpoint[endpointType] + endpoint;
    }
}

export { HttpService };
