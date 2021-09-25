import { EndpointType } from "@type/client";
import { AxiosRequestConfig } from "axios";

export interface IHttp {
    fetch<T>(endPoint: string, endpointType: EndpointType, config?: AxiosRequestConfig): Promise<T>;
    post<T>(endPoint: string, endpointType: EndpointType, body?: unknown, config?: AxiosRequestConfig): Promise<T>;
    put<T>(endPoint: string, endpointType: EndpointType, body?: unknown, config?: AxiosRequestConfig): Promise<T>;
    del<T>(endPoint: string, endpointType: EndpointType, config?: AxiosRequestConfig): Promise<T>;
}
