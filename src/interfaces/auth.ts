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

export interface AuthenticateRiotResponseParsed {
    access_token: string;
    expires_in: string;
    id_token: string;
    iss: string;
    scope: string;
    session_state: string;
    token_type: string;
}
