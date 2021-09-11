import { EndpointType } from "./client";

export interface Fetch {
    <T>(endPoint: string, endpointType: EndpointType): Promise<T>;
}

export interface Delete {
    <T>(endPoint: string, endpointType: EndpointType): Promise<T>;
}

export interface Post {
    <T>(endPoint: string, endpointType: EndpointType, data?: Record<string, unknown>): Promise<T>;
}

export interface Put {
    <T>(endPoint: string, endpointType: EndpointType, data?: Record<string, unknown>): Promise<T>;
}
