import { Fetch } from "@interfaces/http";

import { ClientSettingsResponse, ValorantProcessResponse } from "@interfaces/localEndpointResponses";

interface ValorantInterface {
    process(): Promise<ValorantProcessResponse | Record<string, never>>;
    clientSettings(): Promise<ClientSettingsResponse>;
}

class Valorant implements ValorantInterface {
    private readonly _fetch: Fetch;

    constructor(fetch: Fetch) {
        this._fetch = fetch;
    }

    /**
     * RiotClientSession_FetchSessions
     *
     * Gets info about the running Valorant process including start arguments
     * @returns
     */
    async process(): Promise<ValorantProcessResponse | Record<string, never>> {
        const data = await this._fetch<ValorantProcessResponse>("/product-session/v1/external-sessions", "local");

        return data;
    }

    /**
     *  RiotKV_RNet_GetSettings
     *
     *  Get client settings
     */
    async clientSettings(): Promise<ClientSettingsResponse> {
        const data = await this._fetch<ClientSettingsResponse>(
            "/player-preferences/v1/data-json/Ares.PlayerSettings",
            "local",
        );

        return data;
    }
}

export { Valorant };
