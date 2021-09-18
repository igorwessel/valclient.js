import { Headers } from "@interfaces/client";

export interface AuthInput {
    username: string;
    password: string;
}

export interface IAuth {
    authenticate: () => Promise<AuthenticateResponse>;
    auth: AuthInput;
}

export interface AuthenticateResponse {
    puuid: string;
    headers: Partial<Headers>;
}

export interface AuthenticationFailedResponse {
    type: string;
    error: string;
    country: string;
}

export interface AuthenticationSucceedResponse {
    response: {
        parameters: {
            uri: string;
        };
    };
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
