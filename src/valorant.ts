import { Fetch } from "@interfaces/http";
import { Regions } from "@interfaces/resources";

import { ClientSettingsResponse, ValorantProcessResponse } from "@interfaces/localEndpointResponses";
import { PvpInternalConfig } from "@interfaces/sharedEndpointResponses";

interface ValorantInterface {
    process(): Promise<ValorantProcessResponse | Record<string, never>>;
    clientSettings(): Promise<ClientSettingsResponse>;
}

class Valorant implements ValorantInterface {
    private readonly _fetch: Fetch;
    private readonly _region: Regions;

    constructor(fetch: Fetch, region: Regions) {
        this._fetch = fetch;
        this._region = region;
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
     * Config_FetchConfig
     *
     * Get various internal game configuration settings set by Riot
     */
    async internalConfig(): Promise<PvpInternalConfig> {
        const data = await this._fetch<PvpInternalConfig>(`/v1/config/${this._region}`, "shared");

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
