import { CrossHair, CrossHairProfile, CrossHairProfileData } from "@interfaces/crosshair";
import { Fetch, Put } from "@interfaces/http";

import { ClientSettingsResponse, ValorantProcessResponse } from "@interfaces/valorant";

interface ValorantInterface {
    process(): Promise<ValorantProcessResponse | Record<string, never>>;
    clientSettings(): Promise<ClientSettingsResponse>;
}

class Valorant implements ValorantInterface {
    private readonly _fetch: Fetch;
    private readonly _put: Put;

    constructor(fetch: Fetch, put: Put) {
        this._fetch = fetch;
        this._put = put;
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

    async crossHair(): Promise<Record<string, CrossHair>> {
        const {
            data: { stringSettings },
        } = await this.clientSettings();

        const crossHairProfileData = stringSettings.find(
            (setting) => setting.settingEnum === "EAresStringSettingName::SavedCrosshairProfileData",
        );

        const crossHairSettings: CrossHairProfileData = JSON.parse(crossHairProfileData.value);

        const crossHairProfiles: Record<string, CrossHair> = crossHairSettings.profiles.reduce(
            (obj, crossHairProfile) => {
                const primary = crossHairProfile.primary;

                const innerLines = primary.innerLines;
                const outerLines = primary.outerLines;

                return {
                    ...obj,
                    [crossHairProfile.profileName]: {
                        innerLines,
                        outerLines,
                        ...primary,
                    },
                };
            },
            {},
        );

        return crossHairProfiles;
    }
}

export { Valorant };
