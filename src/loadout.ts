import { AxiosInstance } from "axios";
import { GunsType, SkinsType, Levels, LoadoutBody } from "@type/loadout";
import { VariantSkin } from "@type/chroma";
import { BuddyType } from "@type/buddies";

import { gunsIdMappedByName } from "@resources/guns";
import { skinsIdMappedByGunName } from "@resources/skins";

import { IHttp } from "@interfaces/http";
import { ILoadout, LoadoutResponse } from "@interfaces/loadout";
import { IStore } from "@interfaces/store";
import { buddyIdMappedByName, buddyLevelIdMappedByName } from "@resources/buddies";

class Loadout implements ILoadout {
    private readonly _http: IHttp;
    private readonly _store: IStore;
    private readonly _puuid: string;
    private readonly _valorant_api: AxiosInstance;

    constructor(http: IHttp, puuid: string, api: AxiosInstance, store: IStore) {
        this._http = http;
        this._puuid = puuid;
        this._valorant_api = api;
        this._store = store;
    }

    /**
     * Player_Loadout_Current
     *
     * Get the player's current loadout
     */
    async current(): Promise<LoadoutResponse> {
        const data = await this._http.fetch<LoadoutResponse>(
            `/personalization/v2/players/${this._puuid}/playerloadout`,
            "pd",
        );

        return data;
    }

    /**
     * Player_Loadout_Update
     *
     * Loadout changes take effect when starting a new game
     * @param weapon
     * @param skins
     * @param level
     * @param variant
     * @returns
     */
    async changeGunSkin<T extends GunsType, K extends SkinsType<T>, V extends VariantSkin<K>>(
        weapon: T,
        skins: K,
        level?: Levels,
        variant?: V,
    ): Promise<LoadoutResponse> {
        level = level || "Level 1";

        const gunId = gunsIdMappedByName[weapon].toLowerCase();

        const skinId = skinsIdMappedByGunName[weapon][skins as string].toLowerCase();

        const { Entitlements } = await this._store.yourItems("skin_level");

        const haveSkin = Entitlements.find(({ ItemID }) => ItemID === skinId);

        if (!haveSkin) {
            return null;
        }

        const {
            data: {
                data: { chromas, levels },
            },
        } = await this._valorant_api.get(`weapons/skins/${skinId}`);

        const { Guns, Sprays, Identity, Incognito } = await this.current();

        const variantId = chromas.find((chroma) =>
            variant && variant !== "Default" ? chroma.displayName.includes(variant) : chroma.displayName === skins,
        ).uuid;

        const levelId = levels.find((levelApi) =>
            level && level !== "Level 1" ? levelApi.displayName.includes(level) : levelApi.displayName === skins,
        ).uuid;

        const body: LoadoutBody = {
            Guns: Guns.map((gun) =>
                gun.ID === gunId ? { ...gun, SkinID: skinId, ChromaID: variantId, SkinLevelID: levelId } : gun,
            ),
            Sprays,
            Identity,
            Incognito,
        };

        const data = await this._changeLoadout(body);

        return data;
    }

    async addSkinBuddy(gun: Exclude<GunsType, "Knife">, buddy: BuddyType): Promise<unknown> {
        const gunId = gunsIdMappedByName[gun].toLowerCase();
        const buddyId = buddyIdMappedByName[buddy].toLowerCase();
        const buddyLevelId = buddyLevelIdMappedByName[buddy]["1"];

        const { Entitlements } = await this._store.yourItems<"buddy">("buddy");

        const haveSkin = Entitlements.filter(({ ItemID }) => ItemID === buddyLevelId);

        if (haveSkin.length === 0) {
            return null;
        }

        const { Guns, Sprays, Identity, Incognito } = await this.current();
        const { InstanceID } = haveSkin[0];

        const body = {
            Guns: Guns.map((gun) =>
                gun.CharmInstanceID === InstanceID
                    ? {
                          Attachments: gun.Attachments,
                          ChromaID: gun.ChromaID,
                          ID: gun.ID,
                          SkinID: gun.SkinID,
                          SkinLevelID: gun.SkinLevelID,
                      }
                    : gun.ID === gunId
                    ? {
                          ...gun,
                          CharmInstanceID: InstanceID,
                          CharmID: buddyId,
                          CharmLevelID: buddyLevelId,
                      }
                    : gun,
            ),
            Sprays,
            Identity,
            Incognito,
        };

        const data = await this._changeLoadout(body);

        return data;
    }

    private async _changeLoadout(body: LoadoutBody): Promise<LoadoutResponse> {
        return await this._http.put(`/personalization/v2/players/${this._puuid}/playerloadout`, "pd", body);
    }
}

export { Loadout };
