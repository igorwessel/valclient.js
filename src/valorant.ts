import { CrossHair, CrossHairProfileData } from "@interfaces/crosshair";
import { IHttp } from "@interfaces/http";

import { ClientSettingsResponse, IValorant, ValorantProcessResponse } from "@interfaces/valorant";

class Valorant implements IValorant {
    private readonly _http: IHttp;

    constructor(http: IHttp) {
        this._http = http;
    }

    /**
     * RiotClientSession_FetchSessions
     *
     * Gets info about the running Valorant process including start arguments
     * @returns
     */
    async process(): Promise<ValorantProcessResponse | Record<string, never>> {
        const data = await this._http.fetch<ValorantProcessResponse>("/product-session/v1/external-sessions", "local");

        return data;
    }

    /**
     *  RiotKV_RNet_GetSettings
     *
     *  Get client settings
     */
    async clientSettings(): Promise<ClientSettingsResponse> {
        const data = await this._http.fetch<ClientSettingsResponse>(
            "/player-preferences/v1/data-json/Ares.PlayerSettings",
            "local",
        );

        return data;
    }

    /**
     * Get crosshair settings
     * @returns Profile name with crosshair settings
     */
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
