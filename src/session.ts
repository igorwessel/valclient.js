import { CurrentGameSessionResponse, ReconnectGameSessionResponse } from "@interfaces/glzEndpointResponses";
import { Fetch } from "@interfaces/http";

class Session {
    private readonly _fetch: Fetch;
    private readonly _puuid: string;

    constructor(fetch: Fetch, puuid: string) {
        this._fetch = fetch;
        this._puuid = puuid;
    }
    /**
     *  Session_Get
     *
     *  Get information about the current game session
     * @returns
     */
    async current(): Promise<CurrentGameSessionResponse> {
        const data = await this._fetch<CurrentGameSessionResponse>(`/session/v1/sessions/${this._puuid}`, "glz");

        return data;
    }

    /**
     * Session_ReConnect
     *
     * Try reconnect current game session
     * @returns
     */
    async reconnect(): Promise<ReconnectGameSessionResponse> {
        const data = await this._fetch<ReconnectGameSessionResponse>(
            `/session/v1/sessions/${this._puuid}/reconnect`,
            "glz",
        );

        return data;
    }
}

export { Session };
