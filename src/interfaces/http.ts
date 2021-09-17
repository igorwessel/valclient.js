import { EndpointType } from "@interfaces/client";

export interface IHttp {
    fetch<T>(endPoint: string, endpointType: EndpointType): Promise<T>;
    post<T>(endPoint: string, endpointType: EndpointType, data?: unknown): Promise<T>;
    put<T>(endPoint: string, endpointType: EndpointType, data?: unknown): Promise<T>;
    del<T>(endPoint: string, endpointType: EndpointType): Promise<T>;
}
