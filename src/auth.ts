import axios, { AxiosInstance } from "axios";

interface AuthInput {
    username?: string;
    password?: string;
}

interface AuthInterface {
    authenticate: () => void;
}

interface HeadersAuthenticated {
    Authorization: string;
    "X-Riot-Entitlements-JWT": string;
}

interface AuthenticateResponse {
    user_id: string;
    headers: Partial<HeadersAuthenticated>;
}

class Auth implements AuthInterface {
    private _username: string;
    private _password: string;
    private _axios: AxiosInstance = axios;
    private _authUrlRiotEndpoint = "https://auth.riotgames.com/api/v1/authorization";
    private _entitlementsAuthRiotEndpoint = "https://entitlements.auth.riotgames.com/api/token/v1";
    private _authUserUrlRiotEndpoint = "https://auth.riotgames.com/userinfo";

    constructor(auth: AuthInput) {
        this._username = auth.username;
        this._password = auth.password;
    }

    private async _createSession() {
        const data = {
            client_id: "play-valorant-web-prod",
            nonce: "1",
            redirect_uri: "https://playvalorant.com/opt_in",
            response_type: "token id_token",
        };
        const resp = await this._axios.post(this._authUrlRiotEndpoint, data);
        const cookies: [string] = resp.headers["set-cookie"];
        const cookie = cookies.reduce((string, cookie) => string + cookie + "; ", "");
        this._axios.defaults.headers.Cookie = cookie;
    }

    async authenticate(): Promise<AuthenticateResponse> {
        await this._createSession();

        const authorization = {
            type: "auth",
            username: this._username,
            password: this._password,
        };

        const login = await this._axios.put(this._authUrlRiotEndpoint, authorization, { withCredentials: true });

        const patternAcessToken =
            /access_token=((?:[a-zA-Z]|\d|\.|-|_)*).*id_token=((?:[a-zA-Z]|\d|\.|-|_)*).*expires_in=(\d*)/;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, access_token] = patternAcessToken.exec(login.data.response.parameters.uri);

        const headers = {
            Authorization: `Bearer ${access_token}`,
        };

        const {
            data: { entitlements_token },
        } = await this._axios.post(this._entitlementsAuthRiotEndpoint, {}, { headers });

        const {
            data: { sub: user_id },
        } = await this._axios.post(this._authUserUrlRiotEndpoint, {}, { headers });

        headers["X-Riot-Entitlements-JWT"] = entitlements_token;

        return { user_id, headers };
    }
}

export default Auth;
