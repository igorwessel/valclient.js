import { CurrentGameSessionResponse, ISession, ReconnectGameSessionResponse } from "@interfaces/session";
import { IHttp } from "@interfaces/http";

class Session implements ISession {
    private readonly _http: IHttp;
    private readonly _puuid: string;

    constructor(http: IHttp, puuid: string) {
        this._http = http;
        this._puuid = puuid;
    }
    /**
     *  Session_Get
     *
     *  Get information about the current game session
     * @returns
     */
    async current(): Promise<CurrentGameSessionResponse> {
        const data = await this._http.fetch<CurrentGameSessionResponse>(`/session/v1/sessions/${this._puuid}`, "glz");

        return data;
    }

    /**
     * Session_ReConnect
     *
     * Try reconnect current game session
     * @returns
     */
    async reconnect(): Promise<ReconnectGameSessionResponse> {
        const data = await this._http.fetch<ReconnectGameSessionResponse>(
            `/session/v1/sessions/${this._puuid}/reconnect`,
            "glz",
        );

        return data;
    }
}

export { Session };
