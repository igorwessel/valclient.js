import { PreGame } from "@app/preGame";

import { CoreGameResponse } from "@interfaces/liveGame";
import { PreGameDetailsResponse, PreGameLoadout } from "@interfaces/preGame";

import { agentsMappedById } from "@resources";
import { Agents } from "@interfaces/resources";

const httpService = {
    fetch: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    del: jest.fn(),
};

const currentUserId = "current_user";
const matchId = "pregame_test";

const endpointToGetCurrentMatch = `/pregame/v1/players/${currentUserId}`;

const mockedPreGame: CoreGameResponse = {
    MatchID: matchId,
    Subject: currentUserId,
    Version: 1,
};

const mockedDetailsPreGame: PreGameDetailsResponse = {
    ID: matchId,
    Version: 1,
    Teams: [
        {
            TeamID: "blue",
            Players: [
                {
                    CharacterID: "test",
                    CharacterSelectionState: "test",
                    CompetitiveTier: 1,
                    PlayerIdentity: {
                        AccountLevel: 1,
                        HideAccountLevel: true,
                        Incognito: true,
                        PlayerCardID: "test",
                        PlayerTitleID: "test",
                        PreferredLevelBorderID: "test",
                        Subject: "test",
                    },
                    PregamePlayerState: "test",
                    SeasonalBadgeInfo: {
                        LeaderboardRank: 1,
                        NumberOfWins: 5,
                        Rank: 10,
                        SeasonID: "test",
                        WinsByTier: null,
                    },
                    Subject: currentUserId,
                },
            ],
        },
    ],
    AllyTeam: {
        TeamID: "blue",
        Players: [
            {
                CharacterID: "test",
                CharacterSelectionState: "test",
                CompetitiveTier: 1,
                PlayerIdentity: {
                    AccountLevel: 1,
                    HideAccountLevel: true,
                    Incognito: true,
                    PlayerCardID: "test",
                    PlayerTitleID: "test",
                    PreferredLevelBorderID: "test",
                    Subject: "test",
                },
                PregamePlayerState: "test",
                SeasonalBadgeInfo: {
                    LeaderboardRank: 1,
                    NumberOfWins: 5,
                    Rank: 10,
                    SeasonID: "test",
                    WinsByTier: null,
                },
                Subject: currentUserId,
            },
        ],
    },
    EnemyTeam: {
        TeamID: "red",
        Players: [
            {
                CharacterID: "test",
                CharacterSelectionState: "test",
                CompetitiveTier: 1,
                PlayerIdentity: {
                    AccountLevel: 1,
                    HideAccountLevel: true,
                    Incognito: true,
                    PlayerCardID: "test",
                    PlayerTitleID: "test",
                    PreferredLevelBorderID: "test",
                    Subject: "test",
                },
                PregamePlayerState: "test",
                SeasonalBadgeInfo: {
                    LeaderboardRank: 1,
                    NumberOfWins: 5,
                    Rank: 10,
                    SeasonID: "test",
                    WinsByTier: null,
                },
                Subject: currentUserId,
            },
        ],
    },
    ObserverSubjects: ["test"],
    MatchCoaches: null,
    EnemyTeamSize: 1,
    EnemyTeamLockCount: 1,
    PregameState: "test",
    LastUpdated: "test",
    MapID: "test",
    GamePodID: "test",
    Mode: "test",
    VoiceSessionID: "test",
    MUCName: "test",
    QueueID: "test",
    ProvisioningFlowID: "test",
    IsRanked: true,
    PhaseTimeRemainingNS: 1,
    altModesFlagADA: true,
};

const mockedLoadout: PreGameLoadout = {
    Sprays: {
        SpraySelections: [
            {
                LevelID: "test",
                SocketID: "test",
                SprayID: "test",
            },
        ],
    },
    Items: [
        {
            item_id: {
                ID: "id",
                TypeID: "type_id",
                Sockets: {
                    socket: {
                        ID: "id",
                        Item: {
                            ID: "id",
                            TypeID: "type",
                        },
                    },
                },
            },
        },
    ],
};

const preGame = new PreGame(httpService, currentUserId);

beforeEach(() => {
    httpService.fetch.mockResolvedValueOnce(mockedPreGame);
});

afterEach(() => {
    httpService.fetch.mockReset();
    httpService.post.mockReset();
});

test("should return current pregame game (selecting character)", async () => {
    const data = await preGame.current();

    expect(httpService.fetch).toHaveBeenCalledTimes(1);

    expect(httpService.fetch).toHaveBeenCalledWith(endpointToGetCurrentMatch, "glz");

    expect(data).toEqual(mockedPreGame);
});

test("should return details from current pregame (selecting character)", async () => {
    httpService.fetch.mockResolvedValueOnce(mockedDetailsPreGame);

    const data = await preGame.details();

    expect(httpService.fetch).toHaveBeenCalledTimes(2);

    expect(httpService.fetch).toHaveBeenNthCalledWith(1, endpointToGetCurrentMatch, "glz");

    expect(httpService.fetch).toHaveBeenNthCalledWith(2, `/pregame/v1/matches/${matchId}`, "glz");

    expect(data).toBe(mockedDetailsPreGame);
});

test("should disconnect from current pregame (selecting character)", async () => {
    httpService.fetch.mockResolvedValueOnce(mockedDetailsPreGame);

    const data = await preGame.quitMatch();

    expect(httpService.fetch).toBeCalledTimes(1);

    expect(httpService.fetch).toBeCalledWith(endpointToGetCurrentMatch, "glz");

    expect(httpService.post).toBeCalledTimes(1);

    expect(httpService.post).toBeCalledWith(`/pregame/v1/matches/${matchId}/quit`, "glz");

    expect(data).toBe(true);
});

test("should return loadout all player from current ongoing game", async () => {
    httpService.fetch.mockResolvedValueOnce(mockedLoadout);

    const data = await preGame.loadout();

    expect(httpService.fetch).toBeCalledTimes(2);

    expect(httpService.fetch).toHaveBeenNthCalledWith(1, endpointToGetCurrentMatch, "glz");

    expect(httpService.fetch).toHaveBeenNthCalledWith(2, `/pregame/v1/matches/${matchId}/loadouts`, "glz");

    expect(data).toEqual(mockedLoadout);
});

test("should select a character in pregame (selecting character), without pass match_id", async () => {
    httpService.post.mockResolvedValueOnce(mockedDetailsPreGame);

    const agent: Agents = "Astra";
    const idAgent = agentsMappedById[agent];

    const data = await preGame.selectCharacter(agent);

    expect(httpService.fetch).toHaveBeenCalledTimes(1);

    expect(httpService.fetch).toHaveBeenCalledWith(endpointToGetCurrentMatch, "glz");

    expect(httpService.post).toHaveBeenCalledTimes(1);

    expect(httpService.post).toHaveBeenCalledWith(`/pregame/v1/matches/${matchId}/select/${idAgent}`, "glz");

    expect(data).toEqual(mockedDetailsPreGame);
});

test("should lock a character in pregame (selecting character), without pass match_id", async () => {
    httpService.post.mockResolvedValueOnce(mockedDetailsPreGame);

    const agent: Agents = "Astra";
    const idAgent = agentsMappedById[agent];

    const data = await preGame.lockCharacter(agent);

    expect(httpService.fetch).toHaveBeenCalledTimes(1);

    expect(httpService.fetch).toHaveBeenCalledWith(endpointToGetCurrentMatch, "glz");

    expect(httpService.post).toHaveBeenCalledTimes(1);

    expect(httpService.post).toHaveBeenCalledWith(`/pregame/v1/matches/${matchId}/lock/${idAgent}`, "glz");

    expect(data).toEqual(mockedDetailsPreGame);
});
