import { Regions } from "@interfaces/resources";
import { AuthInput } from "@interfaces/auth";

export interface LockFileType {
    name: string;
    PID: string;
    port: string;
    password: string;
    protocol: string;
}

export interface ClientConfig {
    region: Regions;
    auth: AuthInput;
}

export interface LocalHeaders {
    Authorization: string;
}

export interface Headers {
    Authorization: string;
    "X-Riot-Entitlements-JWT": string;
    "X-Riot-ClientPlatform": string;
    "X-Riot-ClientVersion": string;
}

export type EndpointType = "pd" | "glz" | "shared" | "local";
