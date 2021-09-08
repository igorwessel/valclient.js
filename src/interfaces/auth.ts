import { Headers } from "@interfaces/client";

export interface AuthInput {
    username: string;
    password: string;
}

export interface AuthInterface {
    authenticate: () => void;
}

export interface AuthenticateResponse {
    puuid: string;
    headers: Partial<Headers>;
}
