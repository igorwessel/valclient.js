export interface ILiveGame {
    current(): Promise<CoreGameResponse>;
    details(): Promise<CoreGameDetailsResponse>;
    loadout(): Promise<CoreGameLoadoutResponse>;
    disconnect(): Promise<boolean>;
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
