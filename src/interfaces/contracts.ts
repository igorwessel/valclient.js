import { PvpItemProgressDefinitions } from "@interfaces/pvp";

export interface IContracts {
    all(): Promise<ContractsAll>;
    activate(contract_id: string): Promise<ContractsAll>;
    itemUpgrades(): Promise<PvpItemProgressDefinitions[]>;
}

export interface Contract {
    ContractDefinitionID: string;
    ContractProgression: {
        TotalProgressionEarned: number;
        HighestRewardedLevel: Record<string, number>;
    };
    ProgressionLevelReached: number;
    ProgressionTowardsNextLevel: number;
}

export interface XPGrantsModifier {
    Value: number;
    Name: string;
    BaseOnly: boolean;
}
export interface XPGrants {
    GamePlayed: number;
    GameWon: number;
    RoundPlayed: number;
    RoundWon: number;
    Missions: Record<string, number>;
    Modifier: {
        Value: number;
        BaseMultiplierValue: number;
        Modifiers: XPGrantsModifier[];
    };
    NumAFKRounds: number;
}

export interface EntitlementReward {
    ItemTypeID: string;
    ItemID: string;
    Amount: number;
}

export interface RewardGrant {
    [key: string]: {
        EntitlementRewards: EntitlementReward[];
        WalletRewards: unknown[] | null;
        CounterRewards: unknown | null;
    };
}

export interface MissionDelta {
    [key: string]: {
        ID: string;
        Objectives: Record<string, number>;
        ObjectiveDeltas: {
            [key: string]: {
                ID: string;
                ProgressBefore: null;
                ProgressAfter: null;
            };
        };
    };
}

export interface ContractDelta {
    [key: string]: {
        ID: string;
        TotalXPBefore: number;
        TotalXPAfter: number;
    };
}

export interface ProcessedMatch {
    ID: string;
    StartTime: number;
    XPGrants: XPGrants | null;
    RewardGrants: RewardGrant | null;
    MissionDeltas: MissionDelta | null;
    ContractDeltas: ContractDelta | null;
    CouldProgressMissions: boolean;
}

export interface Mission {
    ID: string;
    Objectives: Record<string, number>;
    Complete: boolean;
    ExpirationTime: string;
}

export interface ContractsAll {
    Version: number;
    Subject: string;
    Contracts: Contract[];
    ProcessedMatches: ProcessedMatch[];
    ActiveSpecialContract: string;
    Missions: Mission[];
    MissionMetadata: {
        NPECompleted: boolean;
        WeeklyCheckpoint: string;
        WeeklyRefillTime: string;
    };
}
