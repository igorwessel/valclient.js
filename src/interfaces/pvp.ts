import { Queues, Regions } from "@type/resources";
import { PvpCompetitiveSeason, PvpEventItem, PvpItemProgressDefinitionsRewards } from "@type/pvp";
import { BooleanString } from "@type/utils";

export interface IPvp {
    contents(): Promise<PvpContents>;
    accountXp(): Promise<PvpAccountXp>;
    mmr(puuid?: string): Promise<PvpMMR>;
    matchHistory(params?: PvpMatchHistoryInput): Promise<PvpMatchHistory>;
    matchDetails(match_id: string): Promise<PvpMatchDetails>;
    competitiveUpdates(params?: PvpMatchHistoryInput): Promise<PvpCompetitiveUpdates>;
    leadersboards(params?: PvpLeaderboardParams): Promise<PvpLeaderboard>;
    playerRestrictions(): Promise<PvpPlayerRestrictions>;
    itemProgressDefinitions(): Promise<PvpItemProgressDefinitions[]>;
    internalConfig(): Promise<PvpInternalConfig>;
}
export interface PvpContentItem {
    Name: string;
    ID: string;
    AssetName: string;
    IsEnabled: boolean;
}

export interface PvpSeasonsItem {
    ID: string;
    Name: string;
    Type: string;
    StartTime: string;
    EndTime: string;
    IsEnabled: boolean;
    IsActive: boolean;
    DevelopmentOnly: boolean;
}

export interface PvpContents {
    Characters: PvpContentItem[];
    Maps: PvpContentItem[];
    Chromas: PvpContentItem[];
    Skins: PvpContentItem[];
    SkinLevels: PvpContentItem[];
    Attachments: PvpContentItem[];
    Equips: PvpContentItem[];
    Themes: PvpContentItem[];
    GameModes: PvpContentItem[];
    Sprays: PvpContentItem[];
    SprayLevels: PvpContentItem[];
    Charms: PvpContentItem[];
    CharmLevels: PvpContentItem[];
    PlayerCards: PvpContentItem[];
    PlayerTitles: PvpContentItem[];
    StorefrontItems: PvpContentItem[];
    Seasons: PvpSeasonsItem[];
    CompetitiveSeasons: PvpCompetitiveSeason[];
    Events: PvpEventItem[];
}

export interface PvpAccountXpSource {
    ID: string;
    Amount: number;
}

export interface PvpAccountHistoryXp {
    ID: string;
    MatchStart: string;
    StartProgress: {
        Level: number;
        XP: number;
    };
    EndProgress: {
        Level: number;
        XP: number;
    };
    XPDelta: number;
    XPSources: PvpAccountXpSource[];
    XPMultipliers: unknown[];
}

export interface PvpAccountXp {
    Version: number;
    Subject: string;
    Progress: {
        Level: number;
        XP: number;
    };
    History: PvpAccountHistoryXp[];
    LastTimeGrantedFirstWin: string;
    NextTimeFirstWinAvailable: string;
}

export interface PvpMMRLatestCompetitiveUpdate {
    MatchID: string;
    MapID: string;
    SeasonID: string;
    MatchStartTime: number;
    TierAfterUpdate: number;
    TierBeforeUpdate: number;
    RankedRatingAfterUpdate: number;
    RankedRatingBeforeUpdate: number;
    RankedRatingEarned: number;
    RankedRatingPerformanceBonus: number;
    CompetitiveMovement: string;
    AFKPenalty: number;
}

export interface PvpMMRQueueSkillSeasonalInfo {
    [key: string]: {
        SeasonID: string;
        NumberOfWins: number;
        NumberOfWinsWithPlacements: number;
        NumberOfGames: number;
        Rank: number;
        CapstoneWins: number;
        LeaderboardRank: number;
        CompetitiveTier: number;
        RankedRating: number;
        WinsByTier: Record<string, number>;
        GamesNeededForRating: number;
        TotalWinsNeededForRank: number;
    };
}

export interface PvpMMRQueueSkill {
    TotalGamesNeededForRating: number;
    TotalGamesNeededForLeaderboard: number;
    CurrentSeasonGamesNeededForRating: number;
    SeasonalInfoBySeasonID: PvpMMRQueueSkillSeasonalInfo;
}

export interface PvpMMR {
    Version: number;
    Subject: string;
    NewPlayerExperienceFinished: boolean;
    QueueSkills: {
        competitive: PvpMMRQueueSkill;
        deathmatch: PvpMMRQueueSkill;
        seeding: PvpMMRQueueSkill;
        spikerush: PvpMMRQueueSkill;
        unrated: PvpMMRQueueSkill;
    };
    LatestCompetitiveUpdate: PvpMMRLatestCompetitiveUpdate;
    IsLeaderboardAnonymized: boolean;
    IsActRankBadgeHidden: boolean;
}

export interface PvpMatchHistoryItem {
    MatchID: string;
    GameStartTime: number;
    TeamID: string;
}

export interface PvpMatchHistoryInput {
    puuid?: string;
    start?: number;
    end?: number;
    queue_id?: Queues;
}

export interface PvpMatchHistory {
    Subject: string;
    BeginIndex: number;
    EndIndex: number;
    Total: number;
    History: PvpMatchHistoryItem[];
}

export interface PvpMatchDetailsRoundDamage {
    round: number;
    receiver: string;
    damage: number;
}

export interface PvpMatchDetailsPlayer {
    subject: string;
    gameName: string;
    tagLine: string;
    platformInfo: {
        platformType: string;
        platformOS: string;
        platformOSVersion: string;
        platformChipset: string;
    };
    teamId: string;
    partyId: string;
    characterId: string;
    stats: {
        score: number;
        roundsPlayed: number;
        kills: number;
        deaths: number;
        assists: number;
        playtimeMillis: number;
        abilityCasts: {
            grenadeCasts: number;
            ability1Casts: number;
            ability2Casts: number;
            ultimateCasts: number;
        };
    };
    roundDamage: PvpMatchDetailsRoundDamage[];
    competitiveTier: number;
    playerCard: string;
    playerTitle: string;
    accountLevel: number;
    sessionPlaytimeMinutes: number;
    behaviorFactors: {
        afkRounds: number;
        stayedInSpawnRounds: number;
    };
    newPlayerExperienceDetails: {
        basicMovement: {
            idleTimeMillis: number;
            objectiveCompleteTimeMillis: number;
        };
        basicGunSkill: {
            idleTimeMillis: number;
            objectiveCompleteTimeMillis: number;
        };
        adaptiveBots: {
            idleTimeMillis: number;
            objectiveCompleteTimeMillis: number;
            adaptiveBotAverageDurationMillisAllAttempts: number;
            adaptiveBotAverageDurationMillisFirstAttempt: number;
            killDetailsFirstAttempt: unknown | null;
        };
        ability: {
            idleTimeMillis: number;
            objectiveCompleteTimeMillis: number;
        };
        bombPlant: {
            idleTimeMillis: number;
            objectiveCompleteTimeMillis: number;
        };
        defendBombSite: {
            idleTimeMillis: number;
            objectiveCompleteTimeMillis: number;
            success: boolean;
        };
        settingStatus: {
            isMouseSensitivityDefault: boolean;
            isCrosshairDefault: boolean;
        };
    };
}

export interface PvpMatchTeams {
    teamId: string;
    won: boolean;
    roundsPlayed: number;
    roundsWon: number;
    numPoints: number;
}

export interface PlayerLocations {
    subject: number;
    viewRadians: number;
    location: {
        x: number;
        y: number;
    };
}

export interface PvpMatchPlayerStatsDamage {
    receiver: string;
    damage: number;
    legshots: number;
    bodyshots: number;
    headshots: number;
}

export interface PvpMatchPlayerStatsKill {
    gameTime: number;
    roundTime: number;
    killer: string;
    victim: string;
    victimLocation: {
        x: number;
        y: number;
    };
    assistants: string[];
    playerLocations: PlayerLocations[];
    finishingDamage: {
        damageType: string;
        damageItem: string;
        isSecondaryFireMode: boolean;
    };
}

export interface PvpMatchPlayerStats {
    subject: string;
    kills: PvpMatchPlayerStatsKill[];
    damage: PvpMatchPlayerStatsDamage[];
    score: number;
    economy: {
        loadoutValue: number;
        weapon: string;
        armor: string;
        remaining: number;
        spent: number;
    };
    ability: {
        grenadeEffects: unknown | null;
        ability1Effects: unknown | null;
        ability2Effects: unknown | null;
        ultimateEffects: unknown | null;
    };
    wasAfk: boolean;
    wasPenalized: boolean;
    stayedInSpawn: boolean;
}

export interface PvpMatchPlayerEconomies {
    subject: string;
    loadoutValue: number;
    weapon: string;
    armor: string;
    remaining: number;
    spent: number;
}

export interface PvpMatchPlayerScore {
    subject: string;
    score: number;
}

export interface PvpMatchDetailsRoundResult {
    roundNum: number;
    roundResult: string;
    roundCeremony: string;
    winningTeam: string;
    bombPlanter: string;
    plantRoundTime: number;
    plantPlayerLocations: PlayerLocations[] | null;
    plantLocation: {
        x: number;
        y: number;
    };
    plantSite: string;
    defuseRoundTime: number;
    defusePlayerLocations: PlayerLocations[] | null;
    defuseLocation: {
        x: number;
        y: number;
    };
    playerStats: PvpMatchPlayerStats[];
    roundResultCode: string;
    playerEconomies: PvpMatchPlayerEconomies[];
    playerScores: PvpMatchPlayerScore[];
}

export interface PvpMatchDetails {
    matchInfo: {
        matchId: string;
        mapId: string;
        gamePodId: string;
        gameLoopZone: string;
        gameServerAddress: string;
        gameVersion: string;
        gameLengthMillis: number;
        gameStartMillis: number;
        provisioningFlowID: string;
        isCompleted: boolean;
        customGameName: string;
        forcePostProcessing: boolean;
        queueID: string;
        gameMode: string;
        isRanked: boolean;
        canProgressContracts: boolean;
        isMatchSampled: boolean;
        seasonId: string;
        completionState: string;
        platformType: string;
    };
    players: PvpMatchDetailsPlayer[];
    bots: unknown[];
    coaches: unknown[];
    teams: PvpMatchTeams[];
    roundResults: PvpMatchDetailsRoundResult[];
    kills: PvpMatchPlayerStatsKill[];
}

export interface PvpCompetitiveUpdatesMatch {
    MatchID: string;
    MapID: string;
    SeasonID: string;
    MatchStartTime: number;
    TierAfterUpdate: number;
    TierBeforeUpdate: number;
    RankedRatingAfterUpdate: number;
    RankedRatingBeforeUpdate: number;
    RankedRatingEarned: number;
    RankedRatingPerformanceBonus: number;
    CompetitiveMovement: string;
    AFKPenalty: number;
}

export interface PvpCompetitiveUpdates {
    Version: number;
    Subject: string;
    Matches: PvpCompetitiveUpdatesMatch[];
}

export interface PvpLeaderboardParams {
    season_id?: string;
    query?: string;
    start?: number;
    region?: Regions;
    size?: number;
}

export interface PvpLeaderboardTierDetail {
    [key: string]: {
        rankedRatingThreshold: number;
        startingPage: number;
        startingIndex: number;
    };
}

export interface PvpLeaderboardPlayer {
    PlayerCardID: string;
    TitleID: string;
    IsBanned: boolean;
    IsAnonymized: boolean;
    puuid: string;
    gameName: string;
    tagLine: string;
    leaderboardRank: number;
    rankedRating: number;
    numberOfWins: number;
    competitiveTier: number;
}

export interface PvpLeaderboard {
    Deployment: string;
    QueueID: Extract<Queues, "competitive">;
    SeasonID: string;
    Players: PvpLeaderboardPlayer[];
    totalPlayers: number;
    immortalStartingPage: number;
    immortalStartingIndex: number;
    topTierRRThreshold: number;
    tierDetails: PvpLeaderboardTierDetail;
    startIndex: number;
    query: string;
}

export interface PvpPlayerRestrictions {
    Subject: string;
    Penalties: unknown[];
    Version: number;
}

export interface PvpItemProgressDefinitionsItem {
    ItemTypeID: string;
    ItemID: string;
}

export interface PvpItemProgressDefinitionsWalletCost {
    CurrencyID: string;
    AmountToDeduct: number;
}

export interface PvpItemProgressDefinitionsOption {
    OptionID: string;
    Cost: {
        WalletCosts: PvpItemProgressDefinitionsWalletCost[];
    };
    Rewards: PvpItemProgressDefinitionsRewards[];
}

export interface PvpItemProgressDefinitionsSidegrades {
    SidegradeID: string;
    Options: PvpItemProgressDefinitionsOption[];
    Prerequisites: {
        RequiredEntitlements: PvpItemProgressDefinitionsItem[];
    };
}

export interface PvpItemProgressRewardsPerLevel {
    EntitlementRewards: PvpItemProgressDefinitionsRewards[];
    WalletRewards: unknown | null;
    CounterRewards: unknown | null;
}

export interface PvpItemProgressPrerequisite {
    RequiredEntitlements: PvpItemProgressDefinitionsItem[];
}

export interface PvpItemProgressDefinitions {
    ID: number;
    Item: PvpItemProgressDefinitionsItem;
    RequiredEntitlement: PvpItemProgressDefinitionsItem;
    ProgressionSchedule: {
        Name: string;
        ProgressionCurrencyID: string;
        ProgressionDeltaPerLevel: unknown | null;
    };
    RewardSchedule: {
        ID: string;
        Name: string;
        Prerequisites: PvpItemProgressPrerequisite | null;
        RewardsPerLevel: PvpItemProgressRewardsPerLevel[] | null;
    };
    Sidegrades: PvpItemProgressDefinitionsSidegrades[];
}

export interface PvpItemProgressDefinitionsResponse {
    Definitions: PvpItemProgressDefinitions[];
}

export interface PvpInternalConfig {
    LastApplication: string;
    Collapsed: {
        ARES_MOC_ENTITLEMENT: string;
        "CLIENT.ICONS.ENABLED": BooleanString;
        CLIENT_LEADERBOARDS_ENABLED: BooleanString;
        GAME_ALLOW_CONSOLE: BooleanString;
        GAME_ALLOW_DEVELOPER_MENU: BooleanString;
        GAME_DISABLED_DEATHCAM: BooleanString;
        GAME_DISABLED_SKINS_WEAPONS: string;
        GAME_PERFREPORTING_ENABLED: BooleanString;
        GAME_REMOTE_MOVE_INTERP_ENABLED: BooleanString;
        GAME_ROAMINGSETTINGS_ENABLED: BooleanString;
        GAME_ROAMINGSETTINGS_KEY: string;
        GAME_ROAMINGSETTINGS_STORAGEURL: string;
        MAP_PRELOADING_ENABLED: BooleanString;
        NAMECHECK_PLATFORM_REGION: string;
        NAMECHECK_PLATFORM_URL: string;
        SECURITY_WATERMARK_ENABLED: BooleanString;
        SECURITY_WATERMARK_MAX_OPACITY: string;
        SECURITY_WATERMARK_MIN_OPACITY: string;
        SECURITY_WATERMARK_TILING_FACTOR: string;
        SERVICEURL_ACCOUNT_XP: string;
        SERVICEURL_AGGSTATS: string;
        SERVICEURL_CONTENT: string;
        SERVICEURL_CONTRACTS: string;
        SERVICEURL_CONTRACT_DEFINITIONS: string;
        SERVICEURL_COREGAME: string;
        SERVICEURL_LATENCY: string;
        SERVICEURL_LOGINQUEUE: string;
        SERVICEURL_MASS_REWARDS: string;
        SERVICEURL_MATCHDETAILS: string;
        SERVICEURL_MATCHHISTORY: string;
        SERVICEURL_MATCHMAKING: string;
        SERVICEURL_MMR: string;
        SERVICEURL_NAME: string;
        SERVICEURL_PARTY: string;
        SERVICEURL_PATCHNOTES: string;
        SERVICEURL_PERSONALIZATION: string;
        SERVICEURL_PLAYERFEEDBACK: string;
        SERVICEURL_PREGAME: string;
        SERVICEURL_PROGRESSION: string;
        SERVICEURL_PURCHASEMERCHANT: string;
        SERVICEURL_RESTRICTIONS: string;
        SERVICEURL_SESSION: string;
        SERVICEURL_STORE: string;
        SERVICE_TICKER_MESSAGE: string;
        "SERVICE_TICKER_MESSAGE.de-DE": string;
        "SERVICE_TICKER_MESSAGE.es-MX": string;
        "SERVICE_TICKER_MESSAGE.fr-FR": string;
        "SERVICE_TICKER_MESSAGE.it-IT": string;
        "SERVICE_TICKER_MESSAGE.pl-PL": string;
        "SERVICE_TICKER_MESSAGE.pt-BR": string;
        "SERVICE_TICKER_MESSAGE.ru-RU": string;
        "SERVICE_TICKER_MESSAGE.tr-TR": string;
        SERVICE_TICKER_SEVERITY: string;
        STORESCREEN_OFFERREFRESH_MAXDELAY_MILLISECONDS: string;
        "cap.location": string;
        "characterselect.debugwidgets.hide": BooleanString;
        "chat.v3.enabled": BooleanString;
        "collection.characters.enabled": BooleanString;
        competitiveSeasonOffsetEndTime: string;
        "config.client.telemetry.samplerate": string;
        "content.maps.disabled": string;
        "eog.wip": BooleanString;
        "friends.enabled": BooleanString;
        "game.umgchat.enabled": BooleanString;
        "homescreen.featuredQueues": string;
        "homescreen.promo.enabled": BooleanString;
        "homescreen.promo.key": string;
        "loginqueue.region": string;
        "mainmenubar.collections.enabled": BooleanString;
        "mainmenubar.debug.enabled": BooleanString;
        "mainmenubar.profile.enabled": BooleanString;
        "mainmenubar.progression.enabled": BooleanString;
        "mainmenubar.shootingrange.enabled": BooleanString;
        "mainmenubar.store.enabled": BooleanString;
        "match.details.delay": string;
        "notifications.enabled": BooleanString;
        "parties.auto.balance.enabled": BooleanString;
        "party.observers.enabled": BooleanString;
        "partyinvites.enabled": BooleanString;
        "patchavailability.enabled": BooleanString;
        "ping.packet.count": string;
        "ping.packet.rounds": string;
        "ping.useGamePodsFromParties": BooleanString;
        "ping.useMedian": BooleanString;
        "platformFaulted.level": string;
        "playerfeedbacktool.accessurl": string;
        "playerfeedbacktool.locale": string;
        "playerfeedbacktool.shard": string;
        "playerfeedbacktool.show": BooleanString;
        "playerfeedbacktool.survey_request_rate_float": string;
        "playscreen.custom.enabled": BooleanString;
        "playscreen.partywidget.enabled": BooleanString;
        "playscreen.partywidget.matchmaking.maxsize": string;
        "queue.status.enabled": BooleanString;
        "rchat.ingame.enabled": BooleanString;
        "reporterfeedback.fetch.enabled": BooleanString;
        "reporterfeedback.notifications.enabled": BooleanString;
        "restrictions.v2.fetch.enabled": BooleanString;
        "restrictions.v2.warnings.enabled": BooleanString;
        "riotwarning.fetch.enabled": BooleanString;
        "riotwarning.notifications.enabled": BooleanString;
        "rnet.useAuthenticatedVoice": BooleanString;
        "russia.voice.enabled": BooleanString;
        "shootingtest.enabled": BooleanString;
        "skillrating.enabled": BooleanString;
        "skillrating.inGame.enabled": BooleanString;
        "skillrating.preGame.enabled": BooleanString;
        "social.panel.v6.enabled": BooleanString;
        "socialpanel.v5.enabled": BooleanString;
        "socialviewcontroller.enabled": BooleanString;
        "socialviewcontroller.v2.enabled": BooleanString;
        "store.use_platform_bundle_discounted_prices": BooleanString;
        "temp.voice.allowmuting": BooleanString;
        "tickermanager.deployment": string;
        "vanguard.accessurl": string;
        "voice.provider": string;
        "whisper.enabled": BooleanString;
    };
}
