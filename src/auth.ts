import axios, { AxiosInstance } from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from "tough-cookie";

import { AuthenticateResponse, AuthenticateRiotResponseParsed, AuthInput, AuthInterface } from "@interfaces/auth";
import { Headers } from "@interfaces/client";
import { URL } from "url";
import { parseQueryString } from "@utils";

class Auth implements AuthInterface {
    private _username: string;
    private _password: string;
    private _axios: AxiosInstance = axios.create();
    private _authUrlRiotEndpoint = "https://auth.riotgames.com/api/v1/authorization";
    private _entitlementsAuthRiotEndpoint = "https://entitlements.auth.riotgames.com/api/token/v1";
    private _authUserUrlRiotEndpoint = "https://auth.riotgames.com/userinfo";
    private _cookieJar = new tough.CookieJar();

    constructor(auth: AuthInput) {
        this._username = auth.username;
        this._password = auth.password;
        axiosCookieJarSupport(this._axios);
        this._axios.defaults.jar = this._cookieJar;
    }

    /**
     * Get current autheticate person
     */
    get auth(): AuthInput {
        return {
            username: this._username,
            password: this._password,
        };
    }

    private async _createSession() {
        const data = {
            client_id: "play-valorant-web-prod",
            nonce: "1",
            redirect_uri: "https://playvalorant.com/opt_in",
            response_type: "token id_token",
        };

        await this._axios.post(this._authUrlRiotEndpoint, data, {
            withCredentials: true,
            jar: this._cookieJar,
        });
    }

    async authenticate(): Promise<AuthenticateResponse> {
        await this._createSession();

        const authorization = {
            type: "auth",
            username: this._username,
            password: this._password,
        };

        const login = await this._axios.put(this._authUrlRiotEndpoint, authorization, {
            withCredentials: true,
            jar: this._cookieJar,
        });

        const urlResponse = new URL(login.data.response.parameters.uri);
        const { access_token } = parseQueryString<AuthenticateRiotResponseParsed>(urlResponse.hash);

        const headers: Partial<Headers> = {
            Authorization: `Bearer ${access_token}`,
        };

        this._axios.defaults.headers = {
            ...this._axios.defaults.headers,
            ...headers,
        };
        this._axios.defaults.withCredentials = true;

        const {
            data: { entitlements_token },
        } = await this._axios.post(this._entitlementsAuthRiotEndpoint, {}, { jar: this._cookieJar });

        const {
            data: { sub: puuid },
        } = await this._axios.post(this._authUserUrlRiotEndpoint, {}, { jar: this._cookieJar });

        headers["X-Riot-Entitlements-JWT"] = entitlements_token;

        return { puuid, headers };
    }
}

export default Auth;
