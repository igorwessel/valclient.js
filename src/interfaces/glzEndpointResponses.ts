import { Queues } from "@interfaces/resources";

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

export interface CurrentPartyDetailsMemberPing {
    Ping: number;
    GamePodID: string;
}

export interface CurrentPartyDetailsMember {
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
    Pings: CurrentPartyDetailsMemberPing[];
    IsReady: boolean;
    IsModerator: boolean;
    UseBroadcastHUD: boolean;
    PlatformType: string;
}

export interface CurrentPartyDetailsMembership {
    Subject: string;
}

export interface CurrentPartyDetailsInvite {
    ID: string;
    PartyID: string;
    Subject: string;
    InvitedBySubject: string;
    CreatedAt: string;
    ExpiresIn: number;
}

export interface CurrentPartyDetailsCustomGameRules {
    AllowGameModifiers: string;
    PlayOutAllRounds: string;
    SkipMatchHistory: string;
    TournamentMode: string;
}

export interface CurrentPartyDetailsResponse {
    ID: string;
    MUCName: string;
    VoiceRoomID: string;
    Version: number;
    ClientVersion: string;
    Members: CurrentPartyDetailsMember[];
    State: string;
    PreviousState: string;
    StateTransitionReason: string;
    Accessibility: string;
    CustomGameData: {
        Settings: {
            Map: string;
            Mode: string;
            UseBots: boolean;
            GamePod: string;
            GameRules: CurrentPartyDetailsCustomGameRules | null;
        };
        Membership: {
            teamOne: CurrentPartyDetailsMembership[] | null;
            teamTwo: CurrentPartyDetailsMembership[] | null;
            teamSpectate: CurrentPartyDetailsMembership[] | null;
            teamOneCoaches: CurrentPartyDetailsMembership[] | null;
            teamTwoCoaches: CurrentPartyDetailsMembership[] | null;
        };
        MaxPartySize: number;
        AutobalanceEnabled: boolean;
        AutobalanceMinPlayers: number;
    };
    MatchmakingData: { QueueID: Queues; PreferredGamePods: [] };
    Invites: CurrentPartyDetailsInvite[] | null;
    Requests: Record<string, unknown>[]; //TODO: get example request for this type
    QueueEntryTime: string;
    ErrorNotification: { ErrorType: string; ErroredPlayers: CurrentPartyDetailsMembership[] | null };
    RestrictedSeconds: number;
    EligibleQueues: Queues[];
    PlatformType: string;
    QueueIneligibilities: Queues[];
    CheatData: { GamePodOverride: string; ForcePostGameProcessing: boolean };
    XPBonuses: Record<string, unknown>[]; //TODO: get example request for this type;
}
