import { Loadout } from "@app/loadout";

import { IHttp } from "@interfaces/http";
import { LoadoutResponse } from "@interfaces/loadout";
import { IStore, YourItems } from "@interfaces/store";
import { ValorantSkin } from "@interfaces/utils";
import { itemsMappedByName, sprayRoundsIdMappedByName } from "@resources";
import { buddyIdMappedByName, buddyLevelIdMappedByName } from "@resources/buddies";
import { gunsIdMappedByName } from "@resources/guns";
import { skinsIdMappedByGunName } from "@resources/skins";
import { sprayIdMappedByName } from "@resources/sprays";
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
            CharmInstanceID: "id_instance",
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
            EquipSlotID: sprayRoundsIdMappedByName["PreRound"],
            SprayID: "id",
            SprayLevelID: "id",
        },
        {
            EquipSlotID: sprayRoundsIdMappedByName["MiddleRound"],
            SprayID: "id",
            SprayLevelID: "id",
        },

        {
            EquipSlotID: sprayRoundsIdMappedByName["EndRound"],
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
            CharmInstanceID: "id_instance",
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
            EquipSlotID: sprayRoundsIdMappedByName["PreRound"],
            SprayID: "id",
            SprayLevelID: "id",
        },
        {
            EquipSlotID: sprayRoundsIdMappedByName["MiddleRound"],
            SprayID: "id",
            SprayLevelID: "id",
        },

        {
            EquipSlotID: sprayRoundsIdMappedByName["EndRound"],
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

const mockedYourItemsBuddy: YourItems<"buddy"> = {
    ItemTypeID: itemsMappedByName["buddy"],
    Entitlements: [
        {
            ItemID: "test",
            TypeID: "test",
            InstanceID: "test",
        },
        {
            ItemID: "another",
            TypeID: "another",
            InstanceID: "test",
        },
        {
            ItemID: buddyLevelIdMappedByName["2021 VCT Masters Winner Buddy"]["1"],
            TypeID: "test",
            InstanceID: "id_instance",
        },
    ],
};

const mockedYourItemsSprays: YourItems<"spray"> = {
    ItemTypeID: itemsMappedByName["spray"],
    Entitlements: [
        {
            ItemID: "test",
            TypeID: itemsMappedByName["spray"],
        },
        {
            ItemID: "another",
            TypeID: itemsMappedByName["spray"],
        },
        {
            ItemID: sprayIdMappedByName["<3 Spray"],
            TypeID: itemsMappedByName["spray"],
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

test("change a skin gun for user with all options", async () => {
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

test("change a skin buddy, if doesn't have the skin buddy return null", async () => {
    store.yourItems.mockResolvedValueOnce(mockedYourItemsBuddy);

    const data = await loadout.addSkinBuddy("Spectre", "Ancient Inheritance Buddy");

    expect(data).toBeNull();
});

test("change a skin buddy", async () => {
    const mockedGunChangedLoadout: LoadoutResponse = {
        ...mockedCurrentLoadout,
        Guns: [
            ...mockedCurrentLoadout.Guns,
            {
                ...mockedCurrentLoadout.Guns[1],
                ID: gunsIdMappedByName["Guardian"],
                CharmID: buddyIdMappedByName["2021 VCT Masters Winner Buddy"],
                CharmLevelID: buddyLevelIdMappedByName["2021 VCT Masters Winner Buddy"]["1"],
                CharmInstanceID: "id_instance",
            },
        ],
    };

    const mockedCurrentLoadoutWithGuardian: LoadoutResponse = {
        ...mockedCurrentLoadout,
        Guns: [
            ...mockedCurrentLoadout.Guns,
            {
                ...mockedCurrentLoadout.Guns[0],
                ID: gunsIdMappedByName["Guardian"].toLowerCase(),
            },
        ],
    };

    store.yourItems.mockResolvedValueOnce(mockedYourItemsBuddy);
    httpService.fetch.mockResolvedValueOnce(mockedCurrentLoadoutWithGuardian);
    httpService.put.mockResolvedValueOnce(mockedGunChangedLoadout);

    const data = await loadout.addSkinBuddy("Guardian", "2021 VCT Masters Winner Buddy");

    expect(data).toEqual(mockedGunChangedLoadout);
});

test("change a spray, if doesnt have the spray return null", async () => {
    store.yourItems.mockResolvedValueOnce(mockedYourItemsSprays);
    httpService.fetch.mockResolvedValueOnce(mockedCurrentLoadout);

    const data = await loadout.changeSpray("8-bit VALORANT Spray", "PreRound");

    expect(data).toBeNull();
});

test("change a spray", async () => {
    const mockedChangeSprayLoadout: LoadoutResponse = {
        ...mockedChangeLoadout,
        Sprays: [
            {
                ...mockedChangeLoadout.Sprays[0],
                SprayID: sprayIdMappedByName["<3 Spray"],
            },
            mockedChangeLoadout.Sprays[1],
            mockedChangeLoadout.Sprays[2],
        ],
    };

    store.yourItems.mockResolvedValueOnce(mockedYourItemsSprays);
    httpService.fetch.mockResolvedValueOnce(mockedCurrentLoadout);
    httpService.put.mockResolvedValueOnce(mockedChangeSprayLoadout);

    const data = await loadout.changeSpray("<3 Spray", "PreRound");

    expect(data).toEqual(mockedChangeSprayLoadout);
});
