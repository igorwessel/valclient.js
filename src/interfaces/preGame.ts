import { CoreGameItem, CoreGameResponse, CoreGameSpraySelection } from "@interfaces/liveGame";
import { Agents } from "@type/resources";

export interface IPreGame {
    current(): Promise<CoreGameResponse>;
    details(match_id?: string): Promise<PreGameDetailsResponse>;
    loadout(match_id?: string): Promise<PreGameLoadout>;
    selectCharacter(agent_id: Agents, match_id?: string): Promise<PreGameDetailsResponse>;
    lockCharacter(agent_id: Agents, match_id?: string): Promise<PreGameDetailsResponse>;
    quitMatch(match_id?: string): Promise<boolean>;
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
