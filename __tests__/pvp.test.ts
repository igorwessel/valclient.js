import { Pvp } from "@app/pvp";
import { mock } from "jest-mock-extended";

import {
    PvpAccountXp,
    PvpContents,
    PvpInternalConfig,
    PvpLeaderboard,
    PvpItemProgressDefinitionsResponse,
    PvpMMR,
    PvpPlayerRestrictions,
    PvpMatchHistory,
    PvpMatchDetails,
    PvpCompetitiveUpdates,
} from "@interfaces/pvp";
import { Queues, Regions } from "@interfaces/resources";
import { IHttp } from "@interfaces/http";

const mockedHttpService = mock<IHttp>();

const currentUserId = "current_user";
const region = "br";
const defaultParams = "startIndex=0&size=25";
const currentSeasonID = "current_season";
const anotherSeasonID = "anoter_season";
const matchDetailsID = "match_details";

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
        SeasonID: currentSeasonID,
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

// const mockedLoadout: LoadoutResponse = {
//     Subject: "test",
//     Version: 1,
//     Guns: [
//         {
//             Attachments: [],
//             ID: "test",
//             ChromaID: "test",
//             SkinID: "test",
//             SkinLevelID: "test",
//             CharmID: "test",
//             CharmInstanceID: "test",
//             CharmLevelID: "test",
//         },
//     ],
//     Sprays: [
//         {
//             EquipSlotID: "test",
//             SprayID: "test",
//             SprayLevelID: "test",
//         },
//     ],
//     Identity: {
//         AccountLevel: 1,
//         HideAccountLevel: true,
//         PlayerCardID: "test",
//         PlayerTitleID: "test",
//         PreferredLevelBorderID: "test",
//     },
//     Incognito: true,
// };

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

const mockedLeaderboardDefault: PvpLeaderboard = {
    Deployment: "na-glz-br-1",
    QueueID: "competitive",
    SeasonID: "4cb622e1-4244-6da3-7276-8daaf1c01be2",
    Players: [
        {
            PlayerCardID: "0c32a7a9-4661-cfbe-7c55-3880b0231a08",
            TitleID: "f0751060-4d86-39e8-b881-469f52058b3f",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "adb01d7f-ec11-579c-a652-45fc77d7f7e9",
            gameName: "VKS sacy",
            tagLine: "moba",
            leaderboardRank: 1,
            rankedRating: 771,
            numberOfWins: 35,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "f951d97c-4abb-0775-2312-4db199cde6bf",
            TitleID: "3a8f14a7-43e0-5c08-d021-41a5d8b3c983",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "79c05e63-5f1a-5ddd-b87b-2566d6a45b96",
            gameName: "cauanzin",
            tagLine: "2005",
            leaderboardRank: 2,
            rankedRating: 703,
            numberOfWins: 33,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "2dfbdbf2-4f2d-328e-01d8-f5a6f0a92318",
            TitleID: "e1cbd3aa-4156-5330-20c4-e4b95a236dc2",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "d2579e95-9d35-5fa6-832f-178d0eb22ccd",
            gameName: "axeddy",
            tagLine: "let",
            leaderboardRank: 3,
            rankedRating: 657,
            numberOfWins: 28,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "83bffdf0-4aa8-bcf4-7e32-a5a508cbd0f0",
            TitleID: "d13e579c-435e-44d4-cec2-6eae5a3c5ed4",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "56e7a83e-b9c0-59c9-8485-0254134dbacf",
            gameName: "aspas",
            tagLine: "aspas",
            leaderboardRank: 4,
            rankedRating: 631,
            numberOfWins: 21,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "b79b6dac-4d30-7a76-5710-c0873224f31b",
            TitleID: "d13e579c-435e-44d4-cec2-6eae5a3c5ed4",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "26417bfb-fa76-5394-b801-9e3aba035470",
            gameName: "havoc77",
            tagLine: "free",
            leaderboardRank: 5,
            rankedRating: 626,
            numberOfWins: 28,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "f78d39b2-4a43-35d6-488e-43a3619855c7",
            TitleID: "bf097526-4503-6b17-2859-49a67bde66d2",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "ecbdff99-1579-5289-8afd-86f44f2dc319",
            gameName: "askia desperate",
            tagLine: "IFL",
            leaderboardRank: 6,
            rankedRating: 590,
            numberOfWins: 44,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "504f38e4-4874-845c-ccb6-a3aec7a3a1eb",
            TitleID: "475467ae-4a07-41e7-df1e-699cc239fbd1",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "4f8400c4-97f0-5211-ba1d-6a65066db22d",
            gameName: "hPw silentzz",
            tagLine: "ntq",
            leaderboardRank: 7,
            rankedRating: 575,
            numberOfWins: 35,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "24e9c88c-4ee1-82fc-2048-bb8942f2147d",
            TitleID: "37121e2f-43f6-0b7d-fdc4-29b85f3121c9",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "0a226423-6185-52ca-8c21-0d83b6e25325",
            gameName: "NO2 kon4n",
            tagLine: "DTJ",
            leaderboardRank: 8,
            rankedRating: 564,
            numberOfWins: 28,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "35fc50fc-4af4-f00c-5a92-768fd3cc7257",
            TitleID: "566b6a77-4f72-af35-6d17-43be14e73cb7",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "4e82ca93-90dd-5bb5-bc15-6cd7c9d3a25b",
            gameName: "duh",
            tagLine: "duhT",
            leaderboardRank: 9,
            rankedRating: 561,
            numberOfWins: 40,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "df3adf8c-4fa3-5f57-544d-eabf8b68713d",
            TitleID: "24e2431e-45b4-ef91-e3f5-f19012522a70",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "35b1dbff-25e2-555c-97ef-13def672c679",
            gameName: "Windows Down",
            tagLine: "BR1",
            leaderboardRank: 10,
            rankedRating: 560,
            numberOfWins: 35,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "83bffdf0-4aa8-bcf4-7e32-a5a508cbd0f0",
            TitleID: "63057041-4f65-5579-e5a6-d88ae7007ebb",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "6a5a06cb-e8b1-52a6-9d93-00e24ec9b629",
            gameName: "poti",
            tagLine: "3003",
            leaderboardRank: 11,
            rankedRating: 560,
            numberOfWins: 41,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "cafddd6a-46f5-c6a2-8e40-688f872b5b36",
            TitleID: "d13e579c-435e-44d4-cec2-6eae5a3c5ed4",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "651e8e4e-0314-5d56-aa1e-17b9e0a2f8d5",
            gameName: "jowzikk",
            tagLine: "7557",
            leaderboardRank: 12,
            rankedRating: 552,
            numberOfWins: 67,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "4783e1f5-4132-d19f-01d8-a08edccf44be",
            TitleID: "229907f5-41a1-855d-a1f6-c1a934c74ed1",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "cc129ba8-656f-58d3-b912-64b6ba69a668",
            gameName: "Vínizera",
            tagLine: "Drip",
            leaderboardRank: 13,
            rankedRating: 538,
            numberOfWins: 48,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "59939bea-4b82-9ce0-0586-d4b0c8d5271d",
            TitleID: "229907f5-41a1-855d-a1f6-c1a934c74ed1",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "39e53905-7b18-50f8-83c0-37c684636871",
            gameName: "RND",
            tagLine: "japz",
            leaderboardRank: 14,
            rankedRating: 533,
            numberOfWins: 28,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "f78d39b2-4a43-35d6-488e-43a3619855c7",
            TitleID: "e23eaf20-4fb2-5c01-03b0-4fa7f14fbfbd",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "0fd4aa3e-b5d2-5059-9a9c-b87f7029203c",
            gameName: "forbanz",
            tagLine: "PATEK",
            leaderboardRank: 15,
            rankedRating: 530,
            numberOfWins: 19,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "52d88add-4269-97c1-fde3-36bcac1a436a",
            TitleID: "32087e8b-4260-37af-f865-5aa64d79f916",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "da29e759-323b-5378-9696-6d1ab7bb898b",
            gameName: "teddy",
            tagLine: "klaus",
            leaderboardRank: 16,
            rankedRating: 525,
            numberOfWins: 28,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "910ace70-4d3b-3c53-2c55-5f9fa179caa8",
            TitleID: "d13e579c-435e-44d4-cec2-6eae5a3c5ed4",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "74194562-db37-5859-bf04-9bf6f53d3350",
            gameName: "BLD",
            tagLine: "OTS",
            leaderboardRank: 17,
            rankedRating: 523,
            numberOfWins: 28,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "a80d8898-464d-1b63-4b1b-149930c22b6b",
            TitleID: "540826d2-4aff-4da9-e1b7-4ebf79deb4b4",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "23e56517-411b-5162-b43b-322a6432e22e",
            gameName: "Ant",
            tagLine: "sagim",
            leaderboardRank: 18,
            rankedRating: 519,
            numberOfWins: 27,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "31f30148-4c4b-397f-adfd-008de1072104",
            TitleID: "f0751060-4d86-39e8-b881-469f52058b3f",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "3b3fd20c-b9aa-58ae-9c16-aed65e0b46b6",
            gameName: "VKS sutecas",
            tagLine: "bagda",
            leaderboardRank: 19,
            rankedRating: 518,
            numberOfWins: 29,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "f78d39b2-4a43-35d6-488e-43a3619855c7",
            TitleID: "5c3e2030-4d8a-a242-04b1-ff872557ebfd",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "b5a042be-3d41-5188-9462-f4e9b6e6c2ef",
            gameName: "pvS",
            tagLine: "0005",
            leaderboardRank: 20,
            rankedRating: 512,
            numberOfWins: 31,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "2dfbdbf2-4f2d-328e-01d8-f5a6f0a92318",
            TitleID: "d13e579c-435e-44d4-cec2-6eae5a3c5ed4",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "024943c9-f6b6-55d1-bb41-ab7dac3e280a",
            gameName: "Leozin",
            tagLine: "2006",
            leaderboardRank: 21,
            rankedRating: 511,
            numberOfWins: 31,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "58314922-434e-6ed6-0625-cc9e137f7ea0",
            TitleID: "8f53997a-481a-d982-1deb-8fa995dbd7d4",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "5fcb9a26-3ce5-56a2-8d97-8d94cb38b8d1",
            gameName: "VKS Saadhak",
            tagLine: "2323",
            leaderboardRank: 22,
            rankedRating: 509,
            numberOfWins: 20,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "c7e58b09-4b1f-ca2a-5ab6-daa6cab2fa6c",
            TitleID: "633be923-4e83-204f-8da1-d5930f939369",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "6695e69e-301c-5d1c-aa3a-f473f6946274",
            gameName: "tfpn Lealzinnnn",
            tagLine: "flash",
            leaderboardRank: 23,
            rankedRating: 499,
            numberOfWins: 37,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "0c32a7a9-4661-cfbe-7c55-3880b0231a08",
            TitleID: "42e2f97d-4e69-274c-589c-0fbdeb397df9",
            IsBanned: false,
            IsAnonymized: false,
            puuid: "8faa4c3d-cdf9-5c18-8936-5ac984e56764",
            gameName: "rood",
            tagLine: "myzzi",
            leaderboardRank: 24,
            rankedRating: 491,
            numberOfWins: 24,
            competitiveTier: 24,
        },
        {
            PlayerCardID: "83bffdf0-4aa8-bcf4-7e32-a5a508cbd0f0",
            TitleID: "d13e579c-435e-44d4-cec2-6eae5a3c5ed4",
            IsBanned: false,
            IsAnonymized: true,
            puuid: "",
            gameName: "",
            tagLine: "",
            leaderboardRank: 25,
            rankedRating: 483,
            numberOfWins: 20,
            competitiveTier: 24,
        },
    ],
    totalPlayers: 4719,
    immortalStartingPage: 21,
    immortalStartingIndex: 501,
    topTierRRThreshold: 200,
    tierDetails: {
        "21": {
            rankedRatingThreshold: 0,
            startingPage: 63,
            startingIndex: 1570,
        },
        "22": {
            rankedRatingThreshold: 100,
            startingPage: 21,
            startingIndex: 501,
        },
        "23": {
            rankedRatingThreshold: 230,
            startingPage: -1,
            startingIndex: -1,
        },
        "24": {
            rankedRatingThreshold: 200,
            startingPage: 1,
            startingIndex: 1,
        },
    },
    startIndex: 0,
    query: "",
};

const mockedPvpMatchDetails: PvpMatchDetails = {
    bots: [],
    coaches: [],
    kills: [
        {
            assistants: ["test"],
            finishingDamage: {
                damageItem: "gun_knife_skill_id",
                damageType: "type",
                isSecondaryFireMode: false,
            },
            gameTime: 1,
            killer: "test",
            playerLocations: [
                {
                    location: {
                        x: 1,
                        y: 1,
                    },
                    subject: 2,
                    viewRadians: 5,
                },
            ],
            roundTime: 5,
            victim: "test",
            victimLocation: {
                x: 1,
                y: 1,
            },
        },
    ],
    matchInfo: {
        canProgressContracts: true,
        completionState: "test",
        customGameName: "test",
        forcePostProcessing: true,
        gameLengthMillis: 1,
        gameLoopZone: "test",
        gameMode: "test",
        gamePodId: "test",
        gameServerAddress: "test",
        gameStartMillis: 1,
        gameVersion: "test",
        isCompleted: true,
        isMatchSampled: true,
        isRanked: true,
        mapId: "test",
        matchId: "test",
        platformType: "test",
        provisioningFlowID: "test",
        queueID: "test",
        seasonId: "test",
    },
    players: [
        {
            accountLevel: 1,
            behaviorFactors: {
                afkRounds: 5,
                stayedInSpawnRounds: 1,
            },
            characterId: "test",
            competitiveTier: 1,
            gameName: "test",
            newPlayerExperienceDetails: {
                ability: {
                    idleTimeMillis: 1,
                    objectiveCompleteTimeMillis: 1,
                },
                adaptiveBots: {
                    idleTimeMillis: 1,
                    objectiveCompleteTimeMillis: 1,
                    adaptiveBotAverageDurationMillisAllAttempts: 1,
                    adaptiveBotAverageDurationMillisFirstAttempt: 1,
                    killDetailsFirstAttempt: 1,
                },
                basicGunSkill: {
                    idleTimeMillis: 1,
                    objectiveCompleteTimeMillis: 1,
                },
                basicMovement: {
                    idleTimeMillis: 1,
                    objectiveCompleteTimeMillis: 1,
                },
                bombPlant: {
                    idleTimeMillis: 1,
                    objectiveCompleteTimeMillis: 1,
                },
                defendBombSite: {
                    success: true,
                    idleTimeMillis: 1,
                    objectiveCompleteTimeMillis: 1,
                },
                settingStatus: {
                    isCrosshairDefault: false,
                    isMouseSensitivityDefault: false,
                },
            },
            partyId: "test",
            platformInfo: {
                platformChipset: "windows",
                platformOS: "windows",
                platformOSVersion: "windows",
                platformType: "windows",
            },
            playerCard: "test",
            playerTitle: "test",
            roundDamage: [
                {
                    damage: 1,
                    receiver: "test",
                    round: 1,
                },
            ],
            sessionPlaytimeMinutes: 1,
            stats: {
                abilityCasts: {
                    ability1Casts: 2,
                    ability2Casts: 3,
                    grenadeCasts: 1,
                    ultimateCasts: 5,
                },
                assists: 1,
                deaths: 1,
                kills: 1,
                playtimeMillis: 15,
                roundsPlayed: 1,
                score: 10,
            },
            subject: "test",
            tagLine: "test",
            teamId: "test",
        },
    ],
    roundResults: [
        {
            bombPlanter: "test",
            defuseLocation: {
                x: 1,
                y: 1,
            },
            defusePlayerLocations: [
                {
                    location: {
                        x: 1,
                        y: 1,
                    },
                    subject: 1,
                    viewRadians: 1,
                },
            ],
            defuseRoundTime: 1,
            plantLocation: {
                x: 1,
                y: 1,
            },
            plantPlayerLocations: [
                {
                    location: {
                        x: 1,
                        y: 1,
                    },
                    subject: 1,
                    viewRadians: 1,
                },
            ],
            plantRoundTime: 1,
            plantSite: "test",
            playerEconomies: [
                {
                    armor: "test",
                    loadoutValue: 100,
                    remaining: 100,
                    spent: 50,
                    subject: "test",
                    weapon: "test",
                },
            ],
            playerScores: [
                {
                    score: 1,
                    subject: "test",
                },
            ],
            playerStats: [
                {
                    ability: {
                        ability1Effects: 1,
                        ability2Effects: 1,
                        grenadeEffects: 1,
                        ultimateEffects: 12,
                    },
                    damage: [
                        {
                            bodyshots: 5,
                            damage: 5,
                            headshots: 3,
                            legshots: 1,
                            receiver: "test",
                        },
                    ],
                    economy: {
                        armor: "test",
                        loadoutValue: 1,
                        remaining: 1,
                        spent: 1,
                        weapon: "gun",
                    },
                    kills: [
                        {
                            assistants: ["test"],
                            finishingDamage: {
                                damageItem: "gun_knife_skill_id",
                                damageType: "type",
                                isSecondaryFireMode: false,
                            },
                            gameTime: 1,
                            killer: "test",
                            playerLocations: [
                                {
                                    location: {
                                        x: 1,
                                        y: 1,
                                    },
                                    subject: 2,
                                    viewRadians: 5,
                                },
                            ],
                            roundTime: 5,
                            victim: "test",
                            victimLocation: {
                                x: 1,
                                y: 1,
                            },
                        },
                    ],
                    score: 1,
                    stayedInSpawn: true,
                    subject: "test",
                    wasAfk: true,
                    wasPenalized: true,
                },
            ],
            roundCeremony: "test",
            roundNum: 5,
            roundResult: "test",
            roundResultCode: "test",
            winningTeam: "test",
        },
    ],
    teams: [
        {
            numPoints: 16,
            roundsPlayed: 10,
            roundsWon: 5,
            teamId: "blue",
            won: true,
        },
    ],
};

const mockedPvpMatchHistory: PvpMatchHistory = {
    BeginIndex: 0,
    EndIndex: 15,
    Subject: currentUserId,
    Total: 3,
    History: [
        {
            GameStartTime: 1,
            MatchID: "match_id",
            TeamID: "blue",
        },
    ],
};

const mockedPvpCompetitiveUpdates: PvpCompetitiveUpdates = {
    Matches: [
        {
            AFKPenalty: 0,
            CompetitiveMovement: "test",
            MapID: "test",
            MatchID: "test",
            MatchStartTime: 15,
            RankedRatingAfterUpdate: 15,
            RankedRatingBeforeUpdate: 0,
            RankedRatingEarned: 15,
            RankedRatingPerformanceBonus: 0,
            SeasonID: "test",
            TierAfterUpdate: 1,
            TierBeforeUpdate: 2,
        },
    ],
    Subject: currentUserId,
    Version: 1,
};

const pvp = new Pvp(mockedHttpService, currentUserId, region);

afterEach(() => {
    mockedHttpService.fetch.mockReset();
    mockedHttpService.put.mockReset();
});

test("should return mmr info about current user authenticated", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedPvpMmr);

    const data = await pvp.mmr();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/mmr/v1/players/${currentUserId}`, "pd");

    expect(data).toEqual(mockedPvpMmr);
});

test("should return all game contents such as maps, agents, etc...", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedContents);

    const data = await pvp.contents();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/content-service/v2/content`, "shared");

    expect(data).toEqual(mockedContents);
});

test("should return account xp, level and xp history about current user authenticated", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedAccountXP);

    const data = await pvp.accountXp();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/account-xp/v1/players/${currentUserId}`, "pd");

    expect(data).toEqual(mockedAccountXP);
});

test("should return internal config setting by riot from current user authenticated", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedInternalConfig);

    const data = await pvp.internalConfig();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith("/v1/config/br", "shared");

    expect(data).toEqual(mockedInternalConfig);
});

test("should return pvp item upgrades (gun, knifes, etc...) from current user authenticated", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedPvpItemProgress);

    const data = await pvp.itemProgressDefinitions();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith("/contract-definitions/v3/item-upgrades", "pd");

    expect(data).toEqual(mockedPvpItemProgress.Definitions);
});

test("should return any penalties from current user authenticated", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedPlayerRestrictions);

    const data = await pvp.playerRestrictions();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith("/restrictions/v2/penalties", "pd");

    expect(data).toEqual(mockedPlayerRestrictions);
});

test("should return leaderboard with default parameters when don't not pass anything", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedPvpMmr).mockResolvedValueOnce(mockedLeaderboardDefault);

    const data = await pvp.leadersboards();

    expect(mockedHttpService.fetch).toBeCalledTimes(2);

    expect(mockedHttpService.fetch).toHaveBeenNthCalledWith(1, `/mmr/v1/players/${currentUserId}`, "pd");

    expect(mockedHttpService.fetch).toHaveBeenNthCalledWith(
        2,
        `/mmr/v1/leaderboards/affinity/${region}/queue/competitive/season/${currentSeasonID}?${defaultParams}`,
        "pd",
    );

    expect(data.Players).toHaveLength(25);

    expect(data).toEqual(mockedLeaderboardDefault);
});

test("should return leaderboard with 26 players when pass size 26", async () => {
    const mockedLeaderboardSize26: PvpLeaderboard = {
        ...mockedLeaderboardDefault,
        Players: [
            ...mockedLeaderboardDefault.Players,
            {
                IsAnonymized: true,
                IsBanned: true,
                PlayerCardID: "test",
                TitleID: "test",
                competitiveTier: 1,
                gameName: "test",
                leaderboardRank: 1,
                numberOfWins: 15,
                puuid: "test",
                rankedRating: 15,
                tagLine: "test",
            },
        ],
    };

    mockedHttpService.fetch.mockResolvedValueOnce(mockedPvpMmr).mockResolvedValueOnce(mockedLeaderboardSize26);

    const data = await pvp.leadersboards({ size: 26 });

    expect(mockedHttpService.fetch).toBeCalledTimes(2);

    expect(mockedHttpService.fetch).toHaveBeenNthCalledWith(1, `/mmr/v1/players/${currentUserId}`, "pd");

    expect(mockedHttpService.fetch).toHaveBeenNthCalledWith(
        2,
        `/mmr/v1/leaderboards/affinity/${region}/queue/competitive/season/${currentSeasonID}?startIndex=0&size=26`,
        "pd",
    );

    expect(data.Players).toHaveLength(26);

    expect(data).toEqual(mockedLeaderboardSize26);
});

test("should return leaderboard with another season when pass season_id", async () => {
    const mockedLeaderboardSeasonID: PvpLeaderboard = {
        ...mockedLeaderboardDefault,
        SeasonID: anotherSeasonID,
    };

    mockedHttpService.fetch.mockResolvedValueOnce(mockedLeaderboardSeasonID);

    const data = await pvp.leadersboards({ season_id: anotherSeasonID });

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(
        `/mmr/v1/leaderboards/affinity/${region}/queue/competitive/season/${anotherSeasonID}?startIndex=0&size=25`,
        "pd",
    );

    expect(data.SeasonID).toBe(anotherSeasonID);

    expect(data).toEqual(mockedLeaderboardSeasonID);
});

test("should return leaderboard with another startIndex when pass start", async () => {
    const startIndex = 1;

    const mockedLeaderboardStart: PvpLeaderboard = {
        ...mockedLeaderboardDefault,
        startIndex,
    };

    mockedHttpService.fetch.mockResolvedValueOnce(mockedPvpMmr).mockResolvedValueOnce(mockedLeaderboardStart);

    const data = await pvp.leadersboards({ start: startIndex });

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(2);

    expect(mockedHttpService.fetch).toHaveBeenNthCalledWith(1, `/mmr/v1/players/${currentUserId}`, "pd");

    expect(mockedHttpService.fetch).toHaveBeenNthCalledWith(
        2,
        `/mmr/v1/leaderboards/affinity/${region}/queue/competitive/season/${currentSeasonID}?startIndex=${startIndex}&size=25`,
        "pd",
    );

    expect(data.startIndex).toBe(startIndex);

    expect(data).toEqual(mockedLeaderboardStart);
});

test("should return leaderboard from another region when pass region", async () => {
    const region: Regions = "na";

    mockedHttpService.fetch.mockResolvedValueOnce(mockedPvpMmr).mockResolvedValueOnce(mockedLeaderboardDefault);

    const data = await pvp.leadersboards({ region });

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(2);

    expect(mockedHttpService.fetch).toHaveBeenNthCalledWith(1, `/mmr/v1/players/${currentUserId}`, "pd");

    expect(mockedHttpService.fetch).toHaveBeenNthCalledWith(
        2,
        `/mmr/v1/leaderboards/affinity/${region}/queue/competitive/season/${currentSeasonID}?${defaultParams}`,
        "pd",
    );

    expect(data).toEqual(mockedLeaderboardDefault);
});

test("should return match details", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedPvpMatchDetails);

    const data = await pvp.matchDetails(matchDetailsID);

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/match-details/v1/matches/${matchDetailsID}`, "pd");

    expect(data).toEqual(mockedPvpMatchDetails);
});

test("should return match history from current player when not pass", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedPvpMatchHistory);

    const data = await pvp.matchHistory();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(
        `/match-history/v1/history/${currentUserId}?startIndex=0&endIndex=15`,
        "pd",
    );

    expect(data).toEqual(mockedPvpMatchHistory);
});

test("should return match history of another player when pass puuid id", async () => {
    const another_user = "another_user";

    const mockedPvpMatchHistoryAnoter: PvpMatchHistory = {
        ...mockedPvpMatchHistory,
        Subject: another_user,
    };

    mockedHttpService.fetch.mockResolvedValueOnce(mockedPvpMatchHistoryAnoter);

    const data = await pvp.matchHistory({
        puuid: another_user,
    });

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(
        `/match-history/v1/history/${another_user}?startIndex=0&endIndex=15`,
        "pd",
    );

    expect(data).toEqual(mockedPvpMatchHistoryAnoter);
});

test("should return match history from another queue when pass", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedPvpMatchHistory);

    const data = await pvp.matchHistory({
        queue_id: "deathmatch",
    });

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(
        `/match-history/v1/history/${currentUserId}?startIndex=0&endIndex=15&queue=deathmatch`,
        "pd",
    );

    expect(data).toEqual(mockedPvpMatchHistory);
});

test("should return match history which starts with index passed in start param", async () => {
    const startIndex = 10;

    const mockedPvpMatchHistoryStart: PvpMatchHistory = {
        ...mockedPvpMatchHistory,
        BeginIndex: startIndex,
    };

    mockedHttpService.fetch.mockResolvedValueOnce(mockedPvpMatchHistoryStart);

    const data = await pvp.matchHistory({
        start: startIndex,
    });

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(
        `/match-history/v1/history/${currentUserId}?startIndex=${startIndex}&endIndex=15`,
        "pd",
    );

    expect(data).toEqual(mockedPvpMatchHistoryStart);
});

test("should return match history which end with index passed in end param", async () => {
    const endIndex = 30;

    const mockedPvpMatchHistoryEndIndex: PvpMatchHistory = {
        ...mockedPvpMatchHistory,
        EndIndex: endIndex,
        History: Array(endIndex).fill({
            GameStartTime: 1,
            MatchID: "match_id",
            TeamID: "blue",
        }),
    };

    mockedHttpService.fetch.mockResolvedValueOnce(mockedPvpMatchHistoryEndIndex);

    const data = await pvp.matchHistory({
        end: endIndex,
    });

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(
        `/match-history/v1/history/${currentUserId}?startIndex=0&endIndex=${endIndex}`,
        "pd",
    );

    expect(data.History).toHaveLength(endIndex);

    expect(data).toEqual(mockedPvpMatchHistoryEndIndex);
});

test("should return competitives updates from current player", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedPvpCompetitiveUpdates);

    const data = await pvp.competitiveUpdates();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(
        `/mmr/v1/players/${currentUserId}/competitiveupdates?startIndex=0&endIndex=15`,
        "pd",
    );

    expect(data).toEqual(mockedPvpCompetitiveUpdates);
});

test("should return competitives updates from another player", async () => {
    const anotherUserId = "another_user";

    const mockedPvpCompetitiveUpdatesAnother: PvpCompetitiveUpdates = {
        ...mockedPvpCompetitiveUpdates,
        Subject: anotherUserId,
    };

    mockedHttpService.fetch.mockResolvedValueOnce(mockedPvpCompetitiveUpdatesAnother);

    const data = await pvp.competitiveUpdates({
        puuid: anotherUserId,
    });

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(
        `/mmr/v1/players/${anotherUserId}/competitiveupdates?startIndex=0&endIndex=15`,
        "pd",
    );

    expect(data).toEqual(mockedPvpCompetitiveUpdatesAnother);
});

test("should return competitives updates which starts with index passed in start param", async () => {
    const startIndex = 10;

    mockedHttpService.fetch.mockResolvedValueOnce(mockedPvpCompetitiveUpdates);

    const data = await pvp.competitiveUpdates({
        start: startIndex,
    });

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(
        `/mmr/v1/players/${currentUserId}/competitiveupdates?startIndex=${startIndex}&endIndex=15`,
        "pd",
    );

    expect(data).toEqual(mockedPvpCompetitiveUpdates);
});

test("should return competitives updates which end with index passed in start param", async () => {
    const endIndex = 30;

    const mockedPvpCompetitiveUpdatesEnd: PvpCompetitiveUpdates = {
        ...mockedPvpCompetitiveUpdates,
        Matches: Array(endIndex).fill({
            AFKPenalty: 0,
            CompetitiveMovement: "test",
            MapID: "test",
            MatchID: "test",
            MatchStartTime: 15,
            RankedRatingAfterUpdate: 15,
            RankedRatingBeforeUpdate: 0,
            RankedRatingEarned: 15,
            RankedRatingPerformanceBonus: 0,
            SeasonID: "test",
            TierAfterUpdate: 1,
            TierBeforeUpdate: 2,
        }),
    };

    mockedHttpService.fetch.mockResolvedValueOnce(mockedPvpCompetitiveUpdatesEnd);

    const data = await pvp.competitiveUpdates({
        end: endIndex,
    });

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(
        `/mmr/v1/players/${currentUserId}/competitiveupdates?startIndex=0&endIndex=${endIndex}`,
        "pd",
    );

    expect(data).toEqual(mockedPvpCompetitiveUpdatesEnd);
});

test("should return competitives updates from another queue when pas", async () => {
    const queue: Queues = "deathmatch";

    mockedHttpService.fetch.mockResolvedValueOnce(mockedPvpCompetitiveUpdates);

    const data = await pvp.competitiveUpdates({
        queue_id: queue,
    });

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(
        `/mmr/v1/players/${currentUserId}/competitiveupdates?startIndex=0&endIndex=15&queue=${queue}`,
        "pd",
    );

    expect(data).toEqual(mockedPvpCompetitiveUpdates);
});
