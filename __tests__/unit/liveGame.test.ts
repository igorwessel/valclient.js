import { LiveGame } from "@app/liveGame";
import { mock } from "jest-mock-extended";

import { CoreGameDetailsResponse, CoreGameLoadoutResponse, CoreGameResponse } from "@interfaces/liveGame";
import { IHttp } from "@interfaces/http";

const mockedHttpService = mock<IHttp>();

const currentUserId = "current_user";
const matchId = "test";

const endpointToGetCurrentMatch = `/core-game/v1/players/${currentUserId}`;

const mockedLiveGame: CoreGameResponse = {
    MatchID: matchId,
    Subject: currentUserId,
    Version: 1,
};

const mockedDetailsLiveGame: CoreGameDetailsResponse = {
    MatchID: matchId,
    Version: 1,
    State: "test",
    MapID: "test",
    ModeID: "test",
    ProvisioningFlow: "test",
    GamePodID: "test",
    AllMUCName: "test",
    TeamMUCName: "test",
    TeamVoiceID: "test",
    IsReconnectable: true,
    ConnectionDetails: {
        GameClientHash: 2,
        GameServerHost: "test",
        GameServerObfuscatedIP: 3,
        GameServerPort: 5555,
        PlayerKey: "test",
        TempMap: "test",
        TempTeam: "test",
    },
    PostGameDetails: null,
    Players: [
        {
            CharacterID: "test",
            IsCoach: false,
            PlayerIdentity: {
                AccountLevel: 15,
                HideAccountLevel: false,
                Incognito: false,
                PlayerCardID: "test",
                PlayerTitleID: "test",
                PreferredLevelBorderID: "test",
                Subject: "test",
            },
            SeasonalBadgeInfo: {
                LeaderboardRank: 4,
                NumberOfWins: 10,
                Rank: 10,
                SeasonID: "s",
                WinsByTier: {
                    "0": 10,
                },
            },
            Subject: "test",
            TeamID: "test",
        },
    ],
    MatchmakingData: null,
};

const mockedLoadout: CoreGameLoadoutResponse = {
    Loadouts: [
        {
            CharacterID: currentUserId,
            Loadout: {
                Items: [
                    {
                        item_id: {
                            ID: "teste",
                            TypeID: "teste",
                            Sockets: {
                                socket: {
                                    ID: "teste",
                                    Item: {
                                        ID: "teste",
                                        TypeID: "teste",
                                    },
                                },
                            },
                        },
                    },
                ],
                Sprays: {
                    SpraySelections: [
                        {
                            LevelID: "spray_1",
                            SocketID: "socket",
                            SprayID: "spray_id",
                        },
                    ],
                },
            },
        },
    ],
};

const liveGame = new LiveGame(mockedHttpService, currentUserId);

beforeEach(() => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedLiveGame);
});

afterEach(() => {
    mockedHttpService.fetch.mockReset();
    mockedHttpService.post.mockReset();
});

test("should return current ongoing game", async () => {
    const data = await liveGame.current();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(endpointToGetCurrentMatch, "glz");

    expect(data).toEqual(mockedLiveGame);
});

test("should return details from current ongoing game", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedDetailsLiveGame);

    const data = await liveGame.details();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(2);

    expect(mockedHttpService.fetch).toHaveBeenNthCalledWith(1, endpointToGetCurrentMatch, "glz");

    expect(mockedHttpService.fetch).toHaveBeenNthCalledWith(2, `/core-game/v1/matches/${matchId}`, "glz");

    expect(data).toBe(mockedDetailsLiveGame);
});

test("should disconnect from current ongoing game", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedDetailsLiveGame);

    const data = await liveGame.disconnect();

    expect(mockedHttpService.fetch).toBeCalledTimes(1);

    expect(mockedHttpService.fetch).toBeCalledWith(endpointToGetCurrentMatch, "glz");

    expect(mockedHttpService.post).toBeCalledTimes(1);

    expect(mockedHttpService.post).toBeCalledWith(
        `/core-game/v1/players/${currentUserId}/disassociate/${matchId}`,
        "glz",
    );

    expect(data).toBe(true);
});

test("should return loadout all player from current ongoing game", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedLoadout);

    const data = await liveGame.loadout();

    expect(mockedHttpService.fetch).toBeCalledTimes(2);

    expect(mockedHttpService.fetch).toHaveBeenNthCalledWith(1, endpointToGetCurrentMatch, "glz");

    expect(mockedHttpService.fetch).toHaveBeenNthCalledWith(2, `/core-game/v1/matches/${matchId}/loadouts`, "glz");

    expect(data).toEqual(mockedLoadout);
});
