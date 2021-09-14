import { Pvp } from "@app/pvp";

import { Fetch, Put } from "@interfaces/http";
import {
    PvpAccountXp,
    PvpContents,
    PvpInternalConfig,
    PvpItemProgressDefinitions,
    PvpItemProgressDefinitionsResponse,
    PvpLoadout,
    PvpMMR,
    PvpPlayerRestrictions,
} from "@interfaces/pvp";

jest.mock("axios");

const fetch = jest.fn();
const put = jest.fn();

const currentUserId = "current_user";
const region = "br";

const mockedPvpMmr: PvpMMR = {
    IsActRankBadgeHidden: true,
    IsLeaderboardAnonymized: true,
    LatestCompetitiveUpdate: {
        AFKPenalty: 1,
        CompetitiveMovement: "competitive",
        MapID: "map_id",
        MatchID: "teste",
        MatchStartTime: 1,
        RankedRatingAfterUpdate: 1,
        RankedRatingBeforeUpdate: 1,
        RankedRatingEarned: 1,
        RankedRatingPerformanceBonus: 1,
        SeasonID: "season_id",
        TierAfterUpdate: 1,
        TierBeforeUpdate: 1,
    },
    NewPlayerExperienceFinished: true,
    QueueSkills: {
        competitive: {
            CurrentSeasonGamesNeededForRating: 1,
            SeasonalInfoBySeasonID: {
                season_id: {
                    CapstoneWins: 1,
                    CompetitiveTier: 1,
                    GamesNeededForRating: 1,
                    LeaderboardRank: 1,
                    NumberOfGames: 1,
                    NumberOfWins: 1,
                    NumberOfWinsWithPlacements: 1,
                    Rank: 1,
                    RankedRating: 1,
                    SeasonID: "season_id",
                    TotalWinsNeededForRank: 1,
                    WinsByTier: {
                        "0": 5,
                    },
                },
            },
            TotalGamesNeededForLeaderboard: 1,
            TotalGamesNeededForRating: 1,
        },
        deathmatch: {
            CurrentSeasonGamesNeededForRating: 1,
            SeasonalInfoBySeasonID: {
                season_id: {
                    CapstoneWins: 1,
                    CompetitiveTier: 1,
                    GamesNeededForRating: 1,
                    LeaderboardRank: 1,
                    NumberOfGames: 1,
                    NumberOfWins: 1,
                    NumberOfWinsWithPlacements: 1,
                    Rank: 1,
                    RankedRating: 1,
                    SeasonID: "season_id",
                    TotalWinsNeededForRank: 1,
                    WinsByTier: {
                        "0": 5,
                    },
                },
            },
            TotalGamesNeededForLeaderboard: 1,
            TotalGamesNeededForRating: 1,
        },
        seeding: {
            CurrentSeasonGamesNeededForRating: 1,
            SeasonalInfoBySeasonID: {
                season_id: {
                    CapstoneWins: 1,
                    CompetitiveTier: 1,
                    GamesNeededForRating: 1,
                    LeaderboardRank: 1,
                    NumberOfGames: 1,
                    NumberOfWins: 1,
                    NumberOfWinsWithPlacements: 1,
                    Rank: 1,
                    RankedRating: 1,
                    SeasonID: "season_id",
                    TotalWinsNeededForRank: 1,
                    WinsByTier: {
                        "0": 5,
                    },
                },
            },
            TotalGamesNeededForLeaderboard: 1,
            TotalGamesNeededForRating: 1,
        },
        spikerush: {
            CurrentSeasonGamesNeededForRating: 1,
            SeasonalInfoBySeasonID: {
                season_id: {
                    CapstoneWins: 1,
                    CompetitiveTier: 1,
                    GamesNeededForRating: 1,
                    LeaderboardRank: 1,
                    NumberOfGames: 1,
                    NumberOfWins: 1,
                    NumberOfWinsWithPlacements: 1,
                    Rank: 1,
                    RankedRating: 1,
                    SeasonID: "season_id",
                    TotalWinsNeededForRank: 1,
                    WinsByTier: {
                        "0": 5,
                    },
                },
            },
            TotalGamesNeededForLeaderboard: 1,
            TotalGamesNeededForRating: 1,
        },
        unrated: {
            CurrentSeasonGamesNeededForRating: 1,
            SeasonalInfoBySeasonID: {
                season_id: {
                    CapstoneWins: 1,
                    CompetitiveTier: 1,
                    GamesNeededForRating: 1,
                    LeaderboardRank: 1,
                    NumberOfGames: 1,
                    NumberOfWins: 1,
                    NumberOfWinsWithPlacements: 1,
                    Rank: 1,
                    RankedRating: 1,
                    SeasonID: "season_id",
                    TotalWinsNeededForRank: 1,
                    WinsByTier: {
                        "0": 5,
                    },
                },
            },
            TotalGamesNeededForLeaderboard: 1,
            TotalGamesNeededForRating: 1,
        },
    },
    Subject: currentUserId,
    Version: 1,
};

const mockedContents: PvpContents = {
    Attachments: [
        {
            AssetName: "test",
            ID: "test",
            IsEnabled: true,
            Name: "teste",
        },
    ],
    Characters: [
        {
            AssetName: "test",
            ID: "test",
            IsEnabled: true,
            Name: "teste",
        },
    ],
    CharmLevels: [
        {
            AssetName: "test",
            ID: "test",
            IsEnabled: true,
            Name: "teste",
        },
    ],
    Charms: [
        {
            AssetName: "test",
            ID: "test",
            IsEnabled: true,
            Name: "teste",
        },
    ],
    Chromas: [
        {
            AssetName: "test",
            ID: "test",
            IsEnabled: true,
            Name: "teste",
        },
    ],
    CompetitiveSeasons: [
        {
            DevelopmentOnly: false,
            EndTime: "timestamp",
            ID: "id",
            SeasonID: "season",
            StartTime: "timestamp",
        },
    ],
    Equips: [
        {
            AssetName: "test",
            ID: "test",
            IsEnabled: true,
            Name: "teste",
        },
    ],
    Events: [
        {
            DevelopmentOnly: false,
            EndTime: "timestamp",
            ID: "id",
            IsActive: true,
            IsEnabled: true,
            Name: "teste",
            StartTime: "timestamp",
        },
    ],
    GameModes: [
        {
            AssetName: "test",
            ID: "test",
            IsEnabled: true,
            Name: "teste",
        },
    ],
    Maps: [
        {
            AssetName: "test",
            ID: "test",
            IsEnabled: true,
            Name: "teste",
        },
    ],
    PlayerCards: [{ AssetName: "test", ID: "test", IsEnabled: true, Name: "teste" }],
    PlayerTitles: [{ AssetName: "test", ID: "test", IsEnabled: true, Name: "teste" }],
    Seasons: [
        {
            Name: "test",
            IsEnabled: true,
            IsActive: true,
            StartTime: "timestamp",
            ID: "test",
            EndTime: "timestamp",
            DevelopmentOnly: false,
            Type: "type",
        },
    ],
    SkinLevels: [{ AssetName: "test", ID: "test", IsEnabled: true, Name: "teste" }],
    Skins: [{ AssetName: "test", ID: "test", IsEnabled: true, Name: "teste" }],
    SprayLevels: [{ AssetName: "test", ID: "test", IsEnabled: true, Name: "teste" }],
    Sprays: [{ AssetName: "test", ID: "test", IsEnabled: true, Name: "teste" }],
    StorefrontItems: [{ AssetName: "test", ID: "test", IsEnabled: true, Name: "teste" }],
    Themes: [{ AssetName: "test", ID: "test", IsEnabled: true, Name: "teste" }],
};

const mockedAccountXP: PvpAccountXp = {
    History: [
        {
            EndProgress: {
                Level: 1,
                XP: 1000,
            },
            ID: "test",
            MatchStart: "test",
            StartProgress: {
                Level: 0,
                XP: 1000,
            },
            XPDelta: 1,
            XPMultipliers: [],
            XPSources: [
                {
                    Amount: 500,
                    ID: "test",
                },
            ],
        },
    ],
    LastTimeGrantedFirstWin: "test",
    NextTimeFirstWinAvailable: "test",
    Progress: {
        Level: 1,
        XP: 500,
    },
    Subject: "test",
    Version: 1,
};

const mockedLoadout: PvpLoadout = {
    Subject: "test",
    Version: 1,
    Guns: [
        {
            Attachments: [],
            ID: "test",
            ChromaID: "test",
            SkinID: "test",
            SkinLevelID: "test",
            CharmID: "test",
            CharmInstanceID: "test",
            CharmLevelID: "test",
        },
    ],
    Sprays: [
        {
            EquipSlotID: "test",
            SprayID: "test",
            SprayLevelID: "test",
        },
    ],
    Identity: {
        AccountLevel: 1,
        HideAccountLevel: true,
        PlayerCardID: "test",
        PlayerTitleID: "test",
        PreferredLevelBorderID: "test",
    },
    Incognito: true,
};

const mockedInternalConfig: PvpInternalConfig = {
    LastApplication: "test",
    Collapsed: {
        ARES_MOC_ENTITLEMENT: "test",
        "CLIENT.ICONS.ENABLED": "true",
        CLIENT_LEADERBOARDS_ENABLED: "true",
        GAME_ALLOW_CONSOLE: "true",
        GAME_ALLOW_DEVELOPER_MENU: "true",
        GAME_DISABLED_DEATHCAM: "true",
        GAME_DISABLED_SKINS_WEAPONS: "test",
        GAME_PERFREPORTING_ENABLED: "true",
        GAME_REMOTE_MOVE_INTERP_ENABLED: "true",
        GAME_ROAMINGSETTINGS_ENABLED: "true",
        GAME_ROAMINGSETTINGS_KEY: "test",
        GAME_ROAMINGSETTINGS_STORAGEURL: "test",
        MAP_PRELOADING_ENABLED: "true",
        NAMECHECK_PLATFORM_REGION: "test",
        NAMECHECK_PLATFORM_URL: "test",
        SECURITY_WATERMARK_ENABLED: "true",
        SECURITY_WATERMARK_MAX_OPACITY: "test",
        SECURITY_WATERMARK_MIN_OPACITY: "test",
        SECURITY_WATERMARK_TILING_FACTOR: "test",
        SERVICEURL_ACCOUNT_XP: "test",
        SERVICEURL_AGGSTATS: "test",
        SERVICEURL_CONTENT: "test",
        SERVICEURL_CONTRACTS: "test",
        SERVICEURL_CONTRACT_DEFINITIONS: "test",
        SERVICEURL_COREGAME: "test",
        SERVICEURL_LATENCY: "test",
        SERVICEURL_LOGINQUEUE: "test",
        SERVICEURL_MASS_REWARDS: "test",
        SERVICEURL_MATCHDETAILS: "test",
        SERVICEURL_MATCHHISTORY: "test",
        SERVICEURL_MATCHMAKING: "test",
        SERVICEURL_MMR: "test",
        SERVICEURL_NAME: "test",
        SERVICEURL_PARTY: "test",
        SERVICEURL_PATCHNOTES: "test",
        SERVICEURL_PERSONALIZATION: "test",
        SERVICEURL_PLAYERFEEDBACK: "test",
        SERVICEURL_PREGAME: "test",
        SERVICEURL_PROGRESSION: "test",
        SERVICEURL_PURCHASEMERCHANT: "test",
        SERVICEURL_RESTRICTIONS: "test",
        SERVICEURL_SESSION: "test",
        SERVICEURL_STORE: "test",
        SERVICE_TICKER_MESSAGE: "test",
        "SERVICE_TICKER_MESSAGE.de-DE": "test",
        "SERVICE_TICKER_MESSAGE.es-MX": "test",
        "SERVICE_TICKER_MESSAGE.fr-FR": "test",
        "SERVICE_TICKER_MESSAGE.it-IT": "test",
        "SERVICE_TICKER_MESSAGE.pl-PL": "test",
        "SERVICE_TICKER_MESSAGE.pt-BR": "test",
        "SERVICE_TICKER_MESSAGE.ru-RU": "test",
        "SERVICE_TICKER_MESSAGE.tr-TR": "test",
        SERVICE_TICKER_SEVERITY: "test",
        STORESCREEN_OFFERREFRESH_MAXDELAY_MILLISECONDS: "test",
        "cap.location": "test",
        "characterselect.debugwidgets.hide": "true",
        "chat.v3.enabled": "true",
        "collection.characters.enabled": "true",
        competitiveSeasonOffsetEndTime: "test",
        "config.client.telemetry.samplerate": "test",
        "content.maps.disabled": "test",
        "eog.wip": "true",
        "friends.enabled": "true",
        "game.umgchat.enabled": "true",
        "homescreen.featuredQueues": "test",
        "homescreen.promo.enabled": "true",
        "homescreen.promo.key": "test",
        "loginqueue.region": "test",
        "mainmenubar.collections.enabled": "true",
        "mainmenubar.debug.enabled": "true",
        "mainmenubar.profile.enabled": "true",
        "mainmenubar.progression.enabled": "true",
        "mainmenubar.shootingrange.enabled": "true",
        "mainmenubar.store.enabled": "true",
        "match.details.delay": "test",
        "notifications.enabled": "true",
        "parties.auto.balance.enabled": "true",
        "party.observers.enabled": "true",
        "partyinvites.enabled": "true",
        "patchavailability.enabled": "true",
        "ping.packet.count": "test",
        "ping.packet.rounds": "test",
        "ping.useGamePodsFromParties": "true",
        "ping.useMedian": "true",
        "platformFaulted.level": "test",
        "playerfeedbacktool.accessurl": "test",
        "playerfeedbacktool.locale": "test",
        "playerfeedbacktool.shard": "test",
        "playerfeedbacktool.show": "true",
        "playerfeedbacktool.survey_request_rate_float": "test",
        "playscreen.custom.enabled": "true",
        "playscreen.partywidget.enabled": "true",
        "playscreen.partywidget.matchmaking.maxsize": "test",
        "queue.status.enabled": "true",
        "rchat.ingame.enabled": "true",
        "reporterfeedback.fetch.enabled": "true",
        "reporterfeedback.notifications.enabled": "true",
        "restrictions.v2.fetch.enabled": "true",
        "restrictions.v2.warnings.enabled": "true",
        "riotwarning.fetch.enabled": "true",
        "riotwarning.notifications.enabled": "true",
        "rnet.useAuthenticatedVoice": "true",
        "russia.voice.enabled": "true",
        "shootingtest.enabled": "true",
        "skillrating.enabled": "true",
        "skillrating.inGame.enabled": "true",
        "skillrating.preGame.enabled": "true",
        "social.panel.v6.enabled": "true",
        "socialpanel.v5.enabled": "true",
        "socialviewcontroller.enabled": "true",
        "socialviewcontroller.v2.enabled": "true",
        "store.use_platform_bundle_discounted_prices": "true",
        "temp.voice.allowmuting": "true",
        "tickermanager.deployment": "test",
        "vanguard.accessurl": "test",
        "voice.provider": "test",
        "whisper.enabled": "true",
    },
};

const mockedPvpItemProgress: PvpItemProgressDefinitionsResponse = {
    Definitions: [
        {
            ID: 5,
            Item: {
                ItemID: "test",
                ItemTypeID: "test",
            },
            ProgressionSchedule: {
                Name: "test",
                ProgressionCurrencyID: "test",
                ProgressionDeltaPerLevel: "test",
            },
            RequiredEntitlement: {
                ItemID: "test",
                ItemTypeID: "test",
            },
            RewardSchedule: {
                ID: "test",
                Name: "test",
                Prerequisites: {
                    RequiredEntitlements: [
                        {
                            ItemID: "test",
                            ItemTypeID: "test",
                        },
                    ],
                },
                RewardsPerLevel: [
                    {
                        CounterRewards: "test",
                        EntitlementRewards: [
                            {
                                Amount: 15,
                                ItemID: "test",
                                ItemTypeID: "test",
                            },
                        ],
                        WalletRewards: "test",
                    },
                ],
            },
            Sidegrades: [
                {
                    Options: [
                        {
                            Cost: {
                                WalletCosts: [
                                    {
                                        AmountToDeduct: 5,
                                        CurrencyID: "5",
                                    },
                                ],
                            },
                            OptionID: "test",
                            Rewards: [{ ItemTypeID: "test", ItemID: "test", Amount: 5 }],
                        },
                    ],
                    Prerequisites: { RequiredEntitlements: [{ ItemID: "test", ItemTypeID: "test" }] },
                    SidegradeID: "test",
                },
            ],
        },
    ],
};

const mockedPlayerRestrictions: PvpPlayerRestrictions = {
    Subject: currentUserId,
    Penalties: [],
    Version: 1,
};

const pvp = new Pvp(fetch as Fetch, put as Put, currentUserId, region);

describe("[PD/SHARED] - Pvp", () => {
    afterEach(() => {
        fetch.mockReset();
        put.mockReset();
    });

    test("should return mmr info about current user authenticated", async () => {
        fetch.mockResolvedValueOnce(mockedPvpMmr);

        const data = await pvp.mmr();

        expect(fetch).toHaveBeenCalledTimes(1);

        expect(fetch).toHaveBeenCalledWith(`/mmr/v1/players/${currentUserId}`, "pd");

        expect(data).toEqual(mockedPvpMmr);
    });

    test("should return all game contents such as maps, agents, etc...", async () => {
        fetch.mockResolvedValueOnce(mockedContents);

        const data = await pvp.contents();

        expect(fetch).toHaveBeenCalledTimes(1);

        expect(fetch).toHaveBeenCalledWith(`/content-service/v2/content`, "shared");

        expect(data).toEqual(mockedContents);
    });

    test("should return account xp, level and xp history about current user authenticated", async () => {
        fetch.mockResolvedValueOnce(mockedAccountXP);

        const data = await pvp.accountXp();

        expect(fetch).toHaveBeenCalledTimes(1);

        expect(fetch).toHaveBeenCalledWith(`/account-xp/v1/players/${currentUserId}`, "pd");

        expect(data).toEqual(mockedAccountXP);
    });

    test("should return loadout from current user authenticated ", async () => {
        fetch.mockResolvedValueOnce(mockedLoadout);

        const data = await pvp.loadout();

        expect(fetch).toHaveBeenCalledTimes(1);

        expect(fetch).toHaveBeenCalledWith(`/personalization/v2/players/${currentUserId}/playerloadout`, "pd");

        expect(data).toEqual(mockedLoadout);
    });

    test("should update a loadout from current user authenticated", async () => {
        put.mockResolvedValueOnce(mockedLoadout);

        const body = {
            Guns: mockedLoadout.Guns,
            Identity: mockedLoadout.Identity,
            Incognito: mockedLoadout.Incognito,
            Sprays: mockedLoadout.Sprays,
        };

        const data = await pvp.changeLoadout(body);

        expect(put).toHaveBeenCalledTimes(1);

        expect(put).toHaveBeenCalledWith(`/personalization/v2/players/${currentUserId}/playerloadout`, "pd", body);

        expect(data).toEqual(mockedLoadout);
    });

    test("should return internal config setting by riot from current user authenticated", async () => {
        fetch.mockResolvedValueOnce(mockedInternalConfig);

        const data = await pvp.internalConfig();

        expect(fetch).toHaveBeenCalledTimes(1);

        expect(fetch).toHaveBeenCalledWith("/v1/config/br", "shared");

        expect(data).toEqual(mockedInternalConfig);
    });

    test("should return pvp item upgrades (gun, knifes, etc...) from current user authenticated", async () => {
        fetch.mockResolvedValueOnce(mockedPvpItemProgress);

        const data = await pvp.itemProgressDefinitions();

        expect(fetch).toHaveBeenCalledTimes(1);

        expect(fetch).toHaveBeenCalledWith("/contract-definitions/v3/item-upgrades", "pd");

        expect(data).toEqual(mockedPvpItemProgress.Definitions);
    });

    test("should return any penalties from current user authenticated", async () => {
        fetch.mockResolvedValueOnce(mockedPlayerRestrictions);

        const data = await pvp.playerRestrictions();

        expect(fetch).toHaveBeenCalledTimes(1);

        expect(fetch).toHaveBeenCalledWith("/restrictions/v2/penalties", "pd");

        expect(data).toEqual(mockedPlayerRestrictions);
    });
});
