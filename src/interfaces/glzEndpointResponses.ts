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

export interface CurrentGroupRequest {
    ID: string;
    PartyID: string;
    RequestedBySubject: string;
    Subjects: string[];
    CreatedAt: string;
    ExpiresIn: number;
}

export interface CurrentGroupIdResponse {
    Subject: string;
    Version: number;
    CurrentPartyID: string;
    Invites: null;
    Requests: CurrentGroupRequest[];
    PlatformInfo: {
        platformType: string;
        platformOS: string;
        platformOSVersion: string;
        platformChipset: string;
    };
}

export interface GroupMemberPing {
    Ping: number;
    GamePodID: string;
}

export interface GroupMember {
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
    Pings: GroupMemberPing[];
    IsReady: boolean;
    IsModerator: boolean;
    UseBroadcastHUD: boolean;
    PlatformType: string;
}

export interface GroupMembership {
    Subject: string;
}

export interface GroupInvite {
    ID: string;
    PartyID: string;
    Subject: string;
    InvitedBySubject: string;
    CreatedAt: string;
    ExpiresIn: number;
}

export interface GroupCustomGameRules {
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
    GameRules: GroupCustomGameRules | null;
}

export interface CustomGameSettingsInput {
    Map: Maps;
    Mode: GameModes;
    GamePod?: RiotServers;
    GameRules?: GroupCustomGameRules | null;
}

export interface GroupDetails {
    ID: string;
    MUCName: string;
    VoiceRoomID: string;
    Version: number;
    ClientVersion: string;
    Members: GroupMember[];
    State: string;
    PreviousState: string;
    StateTransitionReason: string;
    Accessibility: string;
    CustomGameData: {
        Settings: CustomGameSettings;
        Membership: {
            teamOne: GroupMembership[] | null;
            teamTwo: GroupMembership[] | null;
            teamSpectate: GroupMembership[] | null;
            teamOneCoaches: GroupMembership[] | null;
            teamTwoCoaches: GroupMembership[] | null;
        };
        MaxPartySize: number;
        AutobalanceEnabled: boolean;
        AutobalanceMinPlayers: number;
    };
    MatchmakingData: { QueueID: Queues; PreferredGamePods: [] };
    Invites: GroupInvite[] | null;
    Requests: Record<string, unknown>[]; //TODO: get example request for this type
    QueueEntryTime: string;
    ErrorNotification: { ErrorType: string; ErroredPlayers: GroupMembership[] | null };
    RestrictedSeconds: number;
    EligibleQueues: Queues[];
    PlatformType: string;
    QueueIneligibilities: Queues[];
    CheatData: { GamePodOverride: string; ForcePostGameProcessing: boolean };
    XPBonuses: Record<string, unknown>[]; //TODO: get example request for this type;
}

export interface CurrentAvailableGameModeQueue {
    QueueID: Queues;
    Enabled: boolean;
    TeamSize: number;
    NumTeams: number;
    MaxPartySize: number;
    MinPartySize: number;
    MaxPartySizeHighSkill: number;
    HighSkillTier: number;
    Mode: string;
    IsRanked: boolean;
    IsTournament: boolean;
    Priority: number;
    PartyMaxCompetitiveTierRange: number;
    PartyMaxCompetitiveTierRangePlacementBuffer: number;
    FullPartyMaxCompetitiveTierRange: number;
    PartySkillDisparityCompetitiveTiersCeilings: Record<string, number>[];
    MinimumGamesRequired: number;
    QueuesForMinimumGamesEligibility: string[];
    MinimumWinsRequired: number;
    QueuesForMinimumWinsEligibility: unknown[];
    GameRules: {
        AllowDropOut?: BooleanString;
        AssignRandomAgents?: BooleanString;
        SkipPregame?: BooleanString;
        IsOvertimeWinByTwo?: BooleanString;
        AllowLenientSurrender?: BooleanString;
    };
    SupportedPlatformTypes: unknown[];
    DisabledContent: unknown[];
    queueFieldA: unknown[];
    NextScheduleChangeSeconds: number;
    TimeUntilNextScheduleChangeSeconds: number;
}

export interface CurrentAvailableGameModePing {
    [key: string]: {
        SecurityHash: number;
        ObfuscatedIP: number;
        PingProxyAddress: string;
    };
}
export interface CurrentAvailableGameModeResponse {
    Enabled: boolean;
    EnabledMaps: Maps[];
    EnabledModes: string[];
    Queues: CurrentAvailableGameModeQueue[];
    GamePodPingServiceInfo: CurrentAvailableGameModePing;
}

export interface GLZEndpointTokenResponse {
    Token: string;
    Room: string;
}

export interface CoreGameResponse {
    Subject: string;
    MatchID: string;
    Version: number;
}

export interface CoreGameConnectionDetails {
    GameServerHost: string;
    GameServerPort: number;
    GameServerObfuscatedIP: number;
    GameClientHash: number;
    PlayerKey: string;
    TempMap: string;
    TempTeam: string;
}

export interface CoreGamePlayer {
    Subject: string;
    TeamID: string;
    CharacterID: string;
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
        WinsByTier: Record<string, number> | null;
        Rank: number;
        LeaderboardRank: number;
    };
    IsCoach: boolean;
}
export interface CoreGameDetailsResponse {
    MatchID: string;
    Version: number;
    State: string;
    MapID: string;
    ModeID: string;
    ProvisioningFlow: string;
    GamePodID: string;
    AllMUCName: string;
    TeamMUCName: string;
    TeamVoiceID: string;
    IsReconnectable: boolean;
    ConnectionDetails: CoreGameConnectionDetails;
    PostGameDetails: unknown | null;
    Players: CoreGamePlayer[];
    MatchmakingData: unknown | null;
}

export interface CoreGameSpraySelection {
    SocketID: string;
    SprayID: string;
    LevelID: string;
}

export interface CoreGameItem {
    [key: string]: {
        ID: string;
        TypeID: string;
        Sockets: CoreGameItemSocket;
    };
}

export interface CoreGameItemSocket {
    [key: string]: {
        ID: string;
        Item: {
            ID: string;
            TypeID: string;
        };
    };
}
export interface CoreGameLoadout {
    CharacterID: string;
    Loadout: {
        Sprays: {
            SpraySelections: CoreGameSpraySelection[];
        };
        Items: CoreGameItem[];
    };
}

export interface CoreGameLoadoutResponse {
    Loadouts: CoreGameLoadout[];
}

export interface PreGameTeam {
    TeamID: string;
    Players: PreGamePlayer[];
}

export interface PreGamePlayer {
    Subject: string;
    CharacterID: string;
    CharacterSelectionState: string;
    PregamePlayerState: string;
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
        WinsByTier: Record<string, number> | null;
        Rank: number;
        LeaderboardRank: number;
    };
}

export interface PreGameDetailsResponse {
    ID: string;
    Version: number;
    Teams: PreGameTeam[];
    AllyTeam: PreGameTeam;
    EnemyTeam: PreGameTeam | null;
    ObserverSubjects: string[];
    MatchCoaches: unknown;
    EnemyTeamSize: number;
    EnemyTeamLockCount: number;
    PregameState: string;
    LastUpdated: string;
    MapID: string;
    GamePodID: string;
    Mode: string;
    VoiceSessionID: string;
    MUCName: string;
    QueueID: string;
    ProvisioningFlowID: string;
    IsRanked: boolean;
    PhaseTimeRemainingNS: number;
    altModesFlagADA: boolean;
}

export interface PreGameLoadout {
    Sprays: {
        SpraySelections: CoreGameSpraySelection[];
    };
    Items: CoreGameItem[];
}