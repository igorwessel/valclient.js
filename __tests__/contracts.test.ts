import { Contracts } from "@app/contracts";

import { ContractsAll } from "@interfaces/contracts";
import { PvpItemProgressDefinitions } from "@interfaces/pvp";

jest.mock("axios");

const httpService = {
    fetch: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    del: jest.fn(),
};

const mockedContractsAll: ContractsAll = {
    Version: 0,
    Subject: "subject",
    Contracts: [
        {
            ContractDefinitionID: "s",
            ContractProgression: {
                HighestRewardedLevel: {
                    "2": 5,
                },
                TotalProgressionEarned: 2,
            },
            ProgressionLevelReached: 5,
            ProgressionTowardsNextLevel: 6,
        },
    ],
    ProcessedMatches: [
        {
            ContractDeltas: {},
            CouldProgressMissions: true,
            ID: "s",
            MissionDeltas: {},
            RewardGrants: {},
            StartTime: 5,
            XPGrants: {
                GamePlayed: 5,
                GameWon: 5,
                Missions: {
                    "5": 10,
                },
                Modifier: {
                    BaseMultiplierValue: 5,
                    Modifiers: [
                        {
                            BaseOnly: true,
                            Name: "test",
                            Value: 10,
                        },
                    ],
                    Value: 20,
                },
                NumAFKRounds: 5,
                RoundPlayed: 10,
                RoundWon: 2,
            },
        },
    ],
    ActiveSpecialContract: "subject",
    Missions: [
        {
            Complete: true,
            ExpirationTime: "s",
            ID: "5",
            Objectives: {
                test: 10,
            },
        },
    ],
    MissionMetadata: {
        NPECompleted: true,
        WeeklyCheckpoint: "subject",
        WeeklyRefillTime: "subject",
    },
};

const mockedPvpItemProgress: PvpItemProgressDefinitions = {
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
};

const currentUserId = "current_user";

const contracts = new Contracts(httpService, currentUserId);

afterEach(() => {
    httpService.fetch.mockClear();
    httpService.post.mockClear();
});

test("should return all contracts with completion status, including match history", async () => {
    httpService.fetch.mockResolvedValueOnce(mockedContractsAll);

    const data = await contracts.all();

    expect(httpService.fetch).toHaveBeenCalledTimes(1);

    expect(httpService.fetch).toHaveBeenCalledWith(`/contracts/v1/contracts/${currentUserId}`, "pd");

    expect(data).toEqual(mockedContractsAll);
});

test("should return item upgrades", async () => {
    httpService.fetch.mockResolvedValueOnce({ Definitions: mockedPvpItemProgress });

    const data = await contracts.itemUpgrades();

    expect(httpService.fetch).toHaveBeenCalledTimes(1);

    expect(httpService.fetch).toHaveBeenCalledWith("/contract-definitions/v3/item-upgrades", "pd");

    expect(data).toEqual(mockedPvpItemProgress);
});

test("should activate a contract", async () => {
    httpService.post.mockResolvedValueOnce(mockedContractsAll);

    const contractDefinition = "s";

    const data = await contracts.activate(contractDefinition);

    expect(httpService.post).toHaveBeenCalledTimes(1);

    expect(httpService.post).toHaveBeenCalledWith(
        `/contracts/v1/contracts/${currentUserId}/special/${contractDefinition}`,
        "pd",
    );

    expect(data).toEqual(mockedContractsAll);
});
