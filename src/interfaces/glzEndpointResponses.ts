import { Queues, CustomGameMapsName, Maps, GameModes, CustomGameModes, RiotServers } from "@interfaces/resources";
import { BooleanString } from "@interfaces/helpers";

export interface CurrentGameSessionResponse {
    subject: string;
    cxnState: string;
    clientID: string;
    clientVersion: string;
    loopState: string;
    loopStateMetadata: string;
    version: number;
    lastHeartbeatTime: string;
    expiredTime: string;
    heartbeatIntervalMillis: number;
    playtimeNotification: string;
    playtimeMinutes: number;
    isRestricted: boolean;
    userinfoValidTime: string;
    restrictionType: string;
    clientPlatformInfo: {
        platformType: string;
        platformOS: string;
        platformOSVersion: string;
        platformChipset: string;
    };
}

export interface ReconnectGameSessionResponse {
    reconnect: boolean;
}

export interface CurrentPartyRequest {
    ID: string;
    PartyID: string;
    RequestedBySubject: string;
    Subjects: string[];
    CreatedAt: string;
    ExpiresIn: number;
}

export interface CurrentPartyIdResponse {
    Subject: string;
    Version: number;
    CurrentPartyID: string;
    Invites: null;
    Requests: CurrentPartyRequest[];
    PlatformInfo: {
        platformType: string;
        platformOS: string;
        platformOSVersion: string;
        platformChipset: string;
    };
}

export interface PartyDetailsMemberPing {
    Ping: number;
    GamePodID: string;
}

export interface PartyDetailsMember {
    Subject: string;
    CompetitiveTier: number;
    PlayerIdentity: {
        Subject: string;
        PlayerCardID: string;
        PlayerTitleID: string;
        AccountLevel: number;
        PreferredLevelBorderID: string;
        Incognito: boolean;
        HideAccountLevel: boolean;
    };
    SeasonalBadgeInfo: {
        SeasonID: string;
        NumberOfWins: number;
        WinsByTier: Record<string, number>[];
        Rank: number;
        LeaderboardRank: number;
    };
    IsOwner: boolean;
    QueueEligibleRemainingGames: number;
    QueueEligibleRemainingWins: number;
    Pings: PartyDetailsMemberPing[];
    IsReady: boolean;
    IsModerator: boolean;
    UseBroadcastHUD: boolean;
    PlatformType: string;
}

export interface PartyDetailsMembership {
    Subject: string;
}

export interface PartyDetailsInvite {
    ID: string;
    PartyID: string;
    Subject: string;
    InvitedBySubject: string;
    CreatedAt: string;
    ExpiresIn: number;
}

export interface PartyDetailsCustomGameRules {
    AllowGameModifiers: BooleanString;
    PlayOutAllRounds: BooleanString;
    SkipMatchHistory: BooleanString;
    TournamentMode: BooleanString;
}

export interface CustomGameSettings {
    Map: `/Game/Maps/${CustomGameMapsName}`;
    Mode: `/Game/GameModes/${CustomGameModes}`;
    UseBots: boolean;
    GamePod: RiotServers;
    GameRules: PartyDetailsCustomGameRules | null;
}

export interface CustomGameSettingsInput {
    Map: Maps;
    Mode: GameModes;
    GamePod?: RiotServers;
    GameRules?: PartyDetailsCustomGameRules | null;
}

export interface PartyDetails {
    ID: string;
    MUCName: string;
    VoiceRoomID: string;
    Version: number;
    ClientVersion: string;
    Members: PartyDetailsMember[];
    State: string;
    PreviousState: string;
    StateTransitionReason: string;
    Accessibility: string;
    CustomGameData: {
        Settings: CustomGameSettings;
        Membership: {
            teamOne: PartyDetailsMembership[] | null;
            teamTwo: PartyDetailsMembership[] | null;
            teamSpectate: PartyDetailsMembership[] | null;
            teamOneCoaches: PartyDetailsMembership[] | null;
            teamTwoCoaches: PartyDetailsMembership[] | null;
        };
        MaxPartySize: number;
        AutobalanceEnabled: boolean;
        AutobalanceMinPlayers: number;
    };
    MatchmakingData: { QueueID: Queues; PreferredGamePods: [] };
    Invites: PartyDetailsInvite[] | null;
    Requests: Record<string, unknown>[]; //TODO: get example request for this type
    QueueEntryTime: string;
    ErrorNotification: { ErrorType: string; ErroredPlayers: PartyDetailsMembership[] | null };
    RestrictedSeconds: number;
    EligibleQueues: Queues[];
    PlatformType: string;
    QueueIneligibilities: Queues[];
    CheatData: { GamePodOverride: string; ForcePostGameProcessing: boolean };
    XPBonuses: Record<string, unknown>[]; //TODO: get example request for this type;
}
