import { Loadout } from "@app/loadout";

import { IHttp } from "@interfaces/http";
import { LoadoutResponse } from "@interfaces/loadout";
import { IStore, YourItems } from "@interfaces/store";
import { ValorantSkin } from "@interfaces/utils";
import { gunsIdMappedByName } from "@resources/guns";
import { skinsIdMappedByGunName } from "@resources/skins";
import axios, { AxiosInstance } from "axios";

import { mock } from "jest-mock-extended";
import { mocked } from "ts-jest/utils";

const httpService = mock<IHttp>();
const store = mock<IStore>();

const valorantApi = mocked(axios, true);
const puuid = "puuid";
const skinLevelId = "newlevel-gun-id Level 4";
const variant = "variant-gun-id Level 4";
const gunId = gunsIdMappedByName["Judge"].toLowerCase();
const skinId = skinsIdMappedByGunName["Judge"]["Celestial Judge"].toLowerCase();

jest.mock("axios");

const loadout = new Loadout(httpService, puuid, valorantApi as AxiosInstance, store);

const mockedCurrentLoadout: LoadoutResponse = {
    Guns: [
        {
            Attachments: [],
            ChromaID: "id",
            ID: gunId,
            SkinID: "id",
            SkinLevelID: "id",
            CharmID: "id",
            CharmInstanceID: "id",
            CharmLevelID: "id",
        },
        {
            Attachments: [],
            ChromaID: "another_gun",
            ID: "another_gun",
            SkinID: "another_gun",
            SkinLevelID: "another_gun",
            CharmID: "another_gun",
            CharmInstanceID: "another_gun",
            CharmLevelID: "another_gun",
        },
    ],
    Identity: {
        AccountLevel: 1,
        HideAccountLevel: true,
        PlayerCardID: "id",
        PlayerTitleID: "id",
        PreferredLevelBorderID: "id",
    },
    Sprays: [
        {
            EquipSlotID: "id",
            SprayID: "id",
            SprayLevelID: "id",
        },
    ],
    Incognito: true,
    Subject: puuid,
    Version: 3.0,
};

const mockedChangeLoadout: LoadoutResponse = {
    Guns: [
        {
            Attachments: [],
            ChromaID: variant,
            ID: gunId,
            SkinID: skinId,
            SkinLevelID: skinLevelId,
            CharmID: "id",
            CharmInstanceID: "id",
            CharmLevelID: "id",
        },
        {
            Attachments: [],
            ChromaID: "another_gun",
            ID: "another_gun",
            SkinID: "another_gun",
            SkinLevelID: "another_gun",
            CharmID: "another_gun",
            CharmInstanceID: "another_gun",
            CharmLevelID: "another_gun",
        },
    ],
    Identity: {
        AccountLevel: 1,
        HideAccountLevel: true,
        PlayerCardID: "id",
        PlayerTitleID: "id",
        PreferredLevelBorderID: "id",
    },
    Sprays: [
        {
            EquipSlotID: "id",
            SprayID: "id",
            SprayLevelID: "id",
        },
    ],
    Incognito: true,
    Subject: puuid,
    Version: 3.0,
};

const mockedValorantApi: { data: { status: number; data: ValorantSkin } } = {
    data: {
        status: 200,
        data: {
            displayIcon: skinId,
            displayName: skinId,
            uuid: skinId,
            assetPath: skinId,
            contentTierUuid: skinId,
            themeUuid: skinId,
            wallpaper: skinId,
            levels: [
                {
                    assetPath: skinLevelId,
                    displayIcon: skinLevelId,
                    displayName: skinLevelId,
                    fullRender: skinLevelId,
                    streamedVideo: skinLevelId,
                    swatch: skinLevelId,
                    uuid: skinLevelId,
                },
            ],
            chromas: [
                {
                    assetPath: variant,
                    displayIcon: variant,
                    displayName: variant,
                    fullRender: variant,
                    streamedVideo: variant,
                    swatch: variant,
                    uuid: variant,
                },
                {
                    assetPath: variant,
                    displayIcon: variant,
                    displayName: "Celestial Judge",
                    fullRender: variant,
                    streamedVideo: variant,
                    swatch: variant,
                    uuid: variant,
                },
            ],
        },
    },
};

const mockedYourItems: YourItems = {
    ItemTypeID: "gun_id",
    Entitlements: [
        {
            ItemID: "dont_have",
            TypeID: "dont_have",
        },
        {
            ItemID: skinsIdMappedByGunName["Vandal"]["Elderflame Vandal"].toLowerCase(),
            TypeID: skinsIdMappedByGunName["Vandal"]["Elderflame Vandal"].toLowerCase(),
        },
        {
            ItemID: skinsIdMappedByGunName["Judge"]["Celestial Judge"].toLowerCase(),
            TypeID: skinsIdMappedByGunName["Judge"]["Celestial Judge"].toLowerCase(),
        },
    ],
};

afterEach(() => {
    store.yourItems.mockClear();
    httpService.fetch.mockClear();
    httpService.put.mockClear();
    valorantApi.get.mockClear();
});

test("get current loadout for user", async () => {
    httpService.fetch.mockResolvedValueOnce(mockedCurrentLoadout);

    const data = await loadout.current();

    expect(httpService.fetch).toHaveBeenCalledTimes(1);

    expect(httpService.fetch).toHaveBeenCalledWith(`/personalization/v2/players/${puuid}/playerloadout`, "pd");

    expect(data).toEqual(mockedCurrentLoadout);
});

test("if try to change a skin that doesn't have, return null", async () => {
    store.yourItems.mockResolvedValueOnce(mockedYourItems);

    const data = await loadout.changeGunSkin("Guardian", "Oni Guardian", "Level 4", "Black");

    expect(data).toBeNull();
});

test("change a skin gun for user with all options", async () => {
    store.yourItems.mockResolvedValueOnce(mockedYourItems);
    valorantApi.get.mockResolvedValueOnce(mockedValorantApi);
    httpService.fetch.mockResolvedValueOnce(mockedCurrentLoadout);
    httpService.put.mockResolvedValueOnce(mockedChangeLoadout);

    const { Guns, Identity, Incognito, Sprays } = mockedChangeLoadout;

    const data = await loadout.changeGunSkin("Judge", "Celestial Judge", "Level 4", "Default");

    expect(valorantApi.get).toHaveBeenCalledTimes(1);
    expect(valorantApi.get).toHaveBeenCalledWith(`weapons/skins/57ad1e5d-4289-4de0-7926-899cef10db37`);

    expect(httpService.fetch).toHaveBeenCalledTimes(1);
    expect(httpService.fetch).toHaveBeenCalledWith(`/personalization/v2/players/${puuid}/playerloadout`, "pd");

    expect(httpService.put).toHaveBeenCalledTimes(1);
    expect(httpService.put).toHaveBeenCalledWith(`/personalization/v2/players/${puuid}/playerloadout`, "pd", {
        Guns,
        Identity,
        Incognito,
        Sprays,
    });

    expect(data).toEqual(mockedChangeLoadout);
});

test("change a skin gun for user without options", async () => {
    const skinId = skinsIdMappedByGunName["Judge"]["Celestial Judge"].toLowerCase();

    const mockedValorantApiWithLevel1: { data: { status: number; data: ValorantSkin } } = {
        ...mockedValorantApi,
        data: {
            ...mockedValorantApi.data,
            data: {
                ...mockedValorantApi.data.data,
                levels: [
                    {
                        assetPath: skinLevelId,
                        displayIcon: skinLevelId,
                        displayName: skinLevelId,
                        fullRender: skinLevelId,
                        streamedVideo: skinLevelId,
                        swatch: skinLevelId,
                        uuid: skinLevelId,
                    },
                    {
                        assetPath: "Celestial Judge",
                        displayIcon: "Celestial Judge",
                        displayName: "Celestial Judge",
                        fullRender: "Celestial Judge",
                        streamedVideo: "Celestial Judge",
                        swatch: "Celestial Judge",
                        uuid: "default id for level 1",
                    },
                ],
            },
        },
    };

    const mockedChangeLoadoutLevel1: LoadoutResponse = {
        ...mockedChangeLoadout,
        Guns: [
            {
                ...mockedChangeLoadout.Guns[0],

                SkinLevelID: "default id for level 1",
            },
            {
                ...mockedChangeLoadout.Guns[1],
            },
        ],
    };

    store.yourItems.mockResolvedValueOnce(mockedYourItems);
    valorantApi.get.mockResolvedValueOnce(mockedValorantApiWithLevel1);
    httpService.fetch.mockResolvedValueOnce(mockedCurrentLoadout);
    httpService.put.mockResolvedValueOnce(mockedChangeLoadoutLevel1);

    const { Guns, Identity, Incognito, Sprays } = mockedChangeLoadoutLevel1;

    const data = await loadout.changeGunSkin("Judge", "Celestial Judge");

    expect(valorantApi.get).toHaveBeenCalledTimes(1);
    expect(valorantApi.get).toHaveBeenCalledWith(`weapons/skins/${skinId}`);

    expect(httpService.fetch).toHaveBeenCalledTimes(1);
    expect(httpService.fetch).toHaveBeenCalledWith(`/personalization/v2/players/${puuid}/playerloadout`, "pd");

    expect(httpService.put).toHaveBeenCalledTimes(1);
    expect(httpService.put).toHaveBeenCalledWith(`/personalization/v2/players/${puuid}/playerloadout`, "pd", {
        Guns,
        Identity,
        Incognito,
        Sprays,
    });

    expect(data).toEqual(mockedChangeLoadoutLevel1);
});

test("change a skin gun for user, passing another variant", async () => {
    const skinId = skinsIdMappedByGunName["Vandal"]["Elderflame Vandal"].toLowerCase();

    const mockedValorantApiDark: { data: { status: number; data: ValorantSkin } } = {
        data: {
            ...mockedValorantApi.data,
            data: {
                ...mockedValorantApi.data.data,
                chromas: [
                    {
                        assetPath: variant,
                        displayIcon: variant,
                        displayName: variant,
                        fullRender: variant,
                        streamedVideo: variant,
                        swatch: variant,
                        uuid: variant,
                    },
                    {
                        assetPath: variant,
                        displayIcon: variant,
                        displayName: "Elderflame Vandal (Dark)",
                        fullRender: variant,
                        streamedVideo: variant,
                        swatch: variant,
                        uuid: "Elderflame Vandal (Dark) id",
                    },
                ],
                levels: [
                    {
                        assetPath: skinLevelId,
                        displayIcon: skinLevelId,
                        displayName: skinLevelId,
                        fullRender: skinLevelId,
                        streamedVideo: skinLevelId,
                        swatch: skinLevelId,
                        uuid: skinLevelId,
                    },
                    {
                        assetPath: variant,
                        displayIcon: variant,
                        displayName: "Elderflame Vandal Level 3",
                        fullRender: variant,
                        streamedVideo: variant,
                        swatch: variant,
                        uuid: variant,
                    },
                ],
            },
        },
    };
    const mockedChangeLoadoutLevelAndVariantDark: LoadoutResponse = {
        ...mockedChangeLoadout,
        Guns: [
            {
                ...mockedChangeLoadout.Guns[0],
                SkinID: "Elderflame Vandal (Dark) id",
                SkinLevelID: "Elderflame Vandal Level 3",
            },
            {
                ...mockedChangeLoadout.Guns[1],
            },
        ],
    };

    store.yourItems.mockResolvedValueOnce(mockedYourItems);
    valorantApi.get.mockResolvedValueOnce(mockedValorantApiDark);
    httpService.fetch.mockResolvedValueOnce(mockedCurrentLoadout);
    httpService.put.mockResolvedValueOnce(mockedChangeLoadoutLevelAndVariantDark);

    const { Guns, Identity, Incognito, Sprays } = mockedCurrentLoadout;

    const data = await loadout.changeGunSkin("Vandal", "Elderflame Vandal", "Level 3", "Dark");

    expect(valorantApi.get).toHaveBeenCalledTimes(1);
    expect(valorantApi.get).toHaveBeenCalledWith(`weapons/skins/${skinId}`);

    expect(httpService.fetch).toHaveBeenCalledTimes(1);
    expect(httpService.fetch).toHaveBeenCalledWith(`/personalization/v2/players/${puuid}/playerloadout`, "pd");

    expect(httpService.put).toHaveBeenCalledTimes(1);
    expect(httpService.put).toHaveBeenCalledWith(`/personalization/v2/players/${puuid}/playerloadout`, "pd", {
        Guns,
        Identity,
        Incognito,
        Sprays,
    });

    expect(data).toEqual(mockedChangeLoadoutLevelAndVariantDark);
});
