import { PreGame } from "@app/preGame";

import { CoreGameResponse } from "@interfaces/liveGame";
import { PreGameDetailsResponse, PreGameLoadout } from "@interfaces/preGame";

import { Fetch, Post } from "@interfaces/http";
import { agentsMappedById } from "@resources";
import { Agents } from "@interfaces/resources";

jest.mock("axios");

const fetch = jest.fn();
const post = jest.fn();

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

const preGame = new PreGame(fetch as Fetch, post as Post, currentUserId);

beforeEach(() => {
    fetch.mockResolvedValueOnce(mockedPreGame);
});

afterEach(() => {
    fetch.mockReset();
    post.mockReset();
});

test("should return current pregame game (selecting character)", async () => {
    const data = await preGame.current();

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(fetch).toHaveBeenCalledWith(endpointToGetCurrentMatch, "glz");

    expect(data).toEqual(mockedPreGame);
});

test("should return details from current pregame (selecting character)", async () => {
    fetch.mockResolvedValueOnce(mockedDetailsPreGame);

    const data = await preGame.details();

    expect(fetch).toHaveBeenCalledTimes(2);

    expect(fetch).toHaveBeenNthCalledWith(1, endpointToGetCurrentMatch, "glz");

    expect(fetch).toHaveBeenNthCalledWith(2, `/pregame/v1/matches/${matchId}`, "glz");

    expect(data).toBe(mockedDetailsPreGame);
});

test("should disconnect from current pregame (selecting character)", async () => {
    fetch.mockResolvedValueOnce(mockedDetailsPreGame);

    const data = await preGame.quitMatch();

    expect(fetch).toBeCalledTimes(1);

    expect(fetch).toBeCalledWith(endpointToGetCurrentMatch, "glz");

    expect(post).toBeCalledTimes(1);

    expect(post).toBeCalledWith(`/pregame/v1/matches/${matchId}/quit`, "glz");

    expect(data).toBe(true);
});

test("should return loadout all player from current ongoing game", async () => {
    fetch.mockResolvedValueOnce(mockedLoadout);

    const data = await preGame.loadout();

    expect(fetch).toBeCalledTimes(2);

    expect(fetch).toHaveBeenNthCalledWith(1, endpointToGetCurrentMatch, "glz");

    expect(fetch).toHaveBeenNthCalledWith(2, `/pregame/v1/matches/${matchId}/loadouts`, "glz");

    expect(data).toEqual(mockedLoadout);
});

test("should select a character in pregame (selecting character), without pass match_id", async () => {
    post.mockResolvedValueOnce(mockedDetailsPreGame);

    const agent: Agents = "Astra";
    const idAgent = agentsMappedById[agent];

    const data = await preGame.selectCharacter(agent);

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(fetch).toHaveBeenCalledWith(endpointToGetCurrentMatch, "glz");

    expect(post).toHaveBeenCalledTimes(1);

    expect(post).toHaveBeenCalledWith(`/pregame/v1/matches/${matchId}/select/${idAgent}`, "glz");

    expect(data).toEqual(mockedDetailsPreGame);
});

test("should lock a character in pregame (selecting character), without pass match_id", async () => {
    post.mockResolvedValueOnce(mockedDetailsPreGame);

    const agent: Agents = "Astra";
    const idAgent = agentsMappedById[agent];

    const data = await preGame.lockCharacter(agent);

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(fetch).toHaveBeenCalledWith(endpointToGetCurrentMatch, "glz");

    expect(post).toHaveBeenCalledTimes(1);

    expect(post).toHaveBeenCalledWith(`/pregame/v1/matches/${matchId}/lock/${idAgent}`, "glz");

    expect(data).toEqual(mockedDetailsPreGame);
});
