import { Group } from "@app/group";
import { mock } from "jest-mock-extended";
import { CurrentAvailableGameModeResponse, CurrentGroupIdResponse, GroupDetails } from "@interfaces/group";

import { Queues } from "@interfaces/resources";
import { IHttp } from "@interfaces/http";

const mockedHttpService = mock<IHttp>();

const currentUserId = "current_user";
const currentGroupID = "test";
const anotherUserId = "another_user";

const group = new Group(mockedHttpService, currentUserId);

const mockedCurrentGroupUser: CurrentGroupIdResponse = {
    CurrentPartyID: currentGroupID,
    Invites: null,
    PlatformInfo: {
        platformChipset: "test",
        platformOS: "test",
        platformOSVersion: "test",
        platformType: "test",
    },
    Requests: [
        {
            CreatedAt: "test",
            ExpiresIn: 15,
            ID: "test",
            PartyID: "test",
            RequestedBySubject: "test",
            Subjects: ["test"],
        },
    ],
    Subject: "test",
    Version: 2,
};

const mockedCurrentGroupDetails: GroupDetails = {
    ID: currentGroupID,
    MUCName: "test",
    VoiceRoomID: "test",
    Version: 1,
    ClientVersion: "test",
    Members: [],
    State: "test",
    PreviousState: "test",
    StateTransitionReason: "test",
    Accessibility: "test",
    CustomGameData: {
        Settings: {
            GamePod: "aresriot.aws-rclusterprod-sae1-1.br-gp-saopaulo-1",
            GameRules: {
                AllowGameModifiers: "true",
                PlayOutAllRounds: "true",
                SkipMatchHistory: "true",
                TournamentMode: "true",
            },
            Map: "/Game/Maps/Ascent/Ascent",
            Mode: "/Game/GameModes/Bomb/BombGameMode.BombGameMode_C",
            UseBots: false,
        },
        Membership: {
            teamOne: null,
            teamTwo: null,
            teamSpectate: null,
            teamOneCoaches: null,
            teamTwoCoaches: null,
        },
        MaxPartySize: 1,
        AutobalanceEnabled: true,
        AutobalanceMinPlayers: 1,
    },
    MatchmakingData: { QueueID: "competitive", PreferredGamePods: [] },
    Invites: null,
    Requests: [],
    QueueEntryTime: "test",
    ErrorNotification: { ErrorType: "test", ErroredPlayers: null },
    RestrictedSeconds: 1,
    EligibleQueues: [],
    PlatformType: "test",
    QueueIneligibilities: [],
    CheatData: { GamePodOverride: "test", ForcePostGameProcessing: true },
    XPBonuses: [],
};

const mockedCurrentAvailableGameModes: CurrentAvailableGameModeResponse = {
    Enabled: true,
    EnabledMaps: ["Ascent", "Bind", "Breeze", "Fracture", "Heaven", "Icebox", "Split"],
    EnabledModes: ["test"],
    GamePodPingServiceInfo: {
        ping: {
            ObfuscatedIP: 1,
            PingProxyAddress: "test",
            SecurityHash: 1,
        },
    },
    Queues: [
        {
            Enabled: true,
            GameRules: {
                AllowDropOut: "false",
                AllowLenientSurrender: "false",
                AssignRandomAgents: "false",
                IsOvertimeWinByTwo: "false",
                SkipPregame: "false",
            },
            Mode: "test",
            QueueID: "deathmatch",
            DisabledContent: [],
            FullPartyMaxCompetitiveTierRange: 1,
            HighSkillTier: 5,
            IsRanked: true,
            IsTournament: true,
            MaxPartySize: 1,
            MaxPartySizeHighSkill: 5,
            MinPartySize: 1,
            MinimumGamesRequired: 3,
            MinimumWinsRequired: 5,
            NextScheduleChangeSeconds: 6,
            NumTeams: 2,
            PartyMaxCompetitiveTierRange: 3,
            PartyMaxCompetitiveTierRangePlacementBuffer: 4,
            PartySkillDisparityCompetitiveTiersCeilings: [{ s: 1 }],
            Priority: 1,
            QueuesForMinimumGamesEligibility: ["test"],
            QueuesForMinimumWinsEligibility: ["test"],
            SupportedPlatformTypes: [],
            TeamSize: 2,
            TimeUntilNextScheduleChangeSeconds: 15,
            queueFieldA: [],
        },
    ],
};

beforeEach(() => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedCurrentGroupUser);
});

afterEach(() => {
    mockedHttpService.fetch.mockClear();
    mockedHttpService.post.mockClear();
    mockedHttpService.del.mockClear();
});

test("should return current group from user authenticated", async () => {
    const data = await group.current();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/parties/v1/players/${currentUserId}`, "glz");

    expect(data).toEqual(mockedCurrentGroupUser);
});

test("should return details current group from user authenticated", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedCurrentGroupDetails);

    const data = await group.currentDetails();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(2);

    expect(mockedHttpService.fetch).toHaveBeenNthCalledWith(1, `/parties/v1/players/${currentUserId}`, "glz");

    expect(mockedHttpService.fetch).toHaveBeenNthCalledWith(2, `/parties/v1/parties/${currentGroupID}`, "glz");

    expect(data).toEqual(mockedCurrentGroupDetails);
});

test("should remove a player current group from user authenticated", async () => {
    mockedHttpService.del.mockResolvedValueOnce(true);

    const playerRemoved = "test";

    const data = await group.removePlayer(playerRemoved);

    expect(mockedHttpService.del).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.del).toHaveBeenCalledWith(`/parties/v1/players/${playerRemoved}`, "glz");

    expect(data).toBeTruthy();
});

test("should remove user authenticated from current group", async () => {
    mockedHttpService.del.mockResolvedValueOnce(true);

    const data = await group.removePlayer();

    expect(mockedHttpService.del).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.del).toHaveBeenCalledWith(`/parties/v1/players/${currentUserId}`, "glz");

    expect(data).toBeTruthy();
});

test("should sets whether a party member is ready for queueing", async () => {
    mockedHttpService.post.mockResolvedValueOnce(mockedCurrentGroupDetails);

    const data = await group.setMemberReady(true);

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.post).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/parties/v1/players/${currentUserId}`, "glz");

    expect(mockedHttpService.post).toHaveBeenCalledWith(
        `/parties/v1/parties/${currentGroupID}/members/${currentUserId}/setReady`,
        "glz",
        { ready: true },
    );

    expect(data).toEqual(mockedCurrentGroupDetails);
});

test("should refresh competitive tier from user authenticated", async () => {
    mockedHttpService.post.mockResolvedValueOnce(true);

    const data = await group.refreshCompetitiveTier();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/parties/v1/players/${currentUserId}`, "glz");

    expect(mockedHttpService.post).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.post).toHaveBeenCalledWith(
        `/parties/v1/parties/${currentGroupID}/members/${currentUserId}/refreshCompetitiveTier`,
        "glz",
    );

    expect(data).toBeTruthy();
});

test("should refresh player identity from user authenticated", async () => {
    mockedHttpService.post.mockResolvedValueOnce(mockedCurrentGroupDetails);

    const data = await group.refreshPlayerIdentity();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/parties/v1/players/${currentUserId}`, "glz");

    expect(mockedHttpService.post).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.post).toHaveBeenCalledWith(
        `/parties/v1/parties/${currentGroupID}/members/${currentUserId}/refreshPlayerIdentity`,
        "glz",
    );

    expect(data).toEqual(mockedCurrentGroupDetails);
});

test("should refresh pings from user authenticated", async () => {
    mockedHttpService.post.mockResolvedValueOnce(mockedCurrentGroupDetails);

    const data = await group.refreshPlayerPings();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/parties/v1/players/${currentUserId}`, "glz");

    expect(mockedHttpService.post).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.post).toHaveBeenCalledWith(
        `/parties/v1/parties/${currentGroupID}/members/${currentUserId}/refreshPings`,
        "glz",
    );

    expect(data).toEqual(mockedCurrentGroupDetails);
});

test("should change queue in current group from user authenticated", async () => {
    const queue: Queues = "deathmatch";

    const groupChanged: GroupDetails = {
        ...mockedCurrentGroupDetails,
        MatchmakingData: {
            PreferredGamePods: [],
            QueueID: queue,
        },
    };

    mockedHttpService.post.mockResolvedValueOnce(groupChanged);

    const data = await group.changeQueue("deathmatch");

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/parties/v1/players/${currentUserId}`, "glz");

    expect(mockedHttpService.post).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.post).toHaveBeenCalledWith(`/parties/v1/parties/${currentGroupID}/queue`, "glz", {
        queueID: queue,
    });

    expect(data).toEqual(groupChanged);
});

test("should start a custom game from user authenticated", async () => {
    mockedHttpService.post.mockResolvedValueOnce(mockedCurrentGroupDetails);

    const data = await group.startCustomGame();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/parties/v1/players/${currentUserId}`, "glz");

    expect(mockedHttpService.post).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.post).toHaveBeenCalledWith(`/parties/v1/parties/${currentGroupID}/startcustomgame`, "glz");

    expect(data).toEqual(mockedCurrentGroupDetails);
});

test("should enter in matchmaking queue from user authenticated", async () => {
    mockedHttpService.post.mockResolvedValueOnce(mockedCurrentGroupDetails);

    const data = await group.enterMatchmakingQueue();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/parties/v1/players/${currentUserId}`, "glz");

    expect(mockedHttpService.post).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.post).toHaveBeenCalledWith(
        `/parties/v1/parties/${currentGroupID}/matchmaking/join`,
        "glz",
    );

    expect(data).toEqual(mockedCurrentGroupDetails);
});

test("should leave in matchmaking queue from user authenticated", async () => {
    mockedHttpService.post.mockResolvedValueOnce(mockedCurrentGroupDetails);

    const data = await group.leaveMatchmakingQueue();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/parties/v1/players/${currentUserId}`, "glz");

    expect(mockedHttpService.post).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.post).toHaveBeenCalledWith(
        `/parties/v1/parties/${currentGroupID}/matchmaking/leave`,
        "glz",
    );

    expect(data).toEqual(mockedCurrentGroupDetails);
});

test("should change to close acessibility state current group from user authenticated", async () => {
    const groupState: GroupDetails = {
        ...mockedCurrentGroupDetails,
        Accessibility: "CLOSED",
    };

    mockedHttpService.post.mockResolvedValueOnce(groupState);

    const data = await group.changeState("CLOSED");

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/parties/v1/players/${currentUserId}`, "glz");

    expect(mockedHttpService.post).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.post).toHaveBeenCalledWith(`/parties/v1/parties/${currentGroupID}/accessibility`, "glz", {
        accessibility: "CLOSED",
    });

    expect(data).toEqual(groupState);
});

test("should change to open acessibility state current group from user authenticated", async () => {
    const groupState: GroupDetails = {
        ...mockedCurrentGroupDetails,
        Accessibility: "OPEN",
    };

    mockedHttpService.post.mockResolvedValueOnce(groupState);

    const data = await group.changeState("OPEN");

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/parties/v1/players/${currentUserId}`, "glz");

    expect(mockedHttpService.post).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.post).toHaveBeenCalledWith(`/parties/v1/parties/${currentGroupID}/accessibility`, "glz", {
        accessibility: "OPEN",
    });

    expect(data).toEqual(groupState);
});

test("should set custom game settings from user autenticated", async () => {
    const customGame: GroupDetails = {
        ...mockedCurrentGroupDetails,
        CustomGameData: {
            ...mockedCurrentGroupDetails.CustomGameData,
            Settings: {
                Map: "/Game/Maps/Ascent/Ascent",
                Mode: "/Game/GameModes/Bomb/BombGameMode.BombGameMode_C",
                GamePod: "aresriot.aws-rclusterprod-sae1-1.br-gp-saopaulo-1",
                UseBots: true,
                GameRules: {
                    AllowGameModifiers: "true",
                    PlayOutAllRounds: "true",
                    SkipMatchHistory: "true",
                    TournamentMode: "true",
                },
            },
        },
    };

    mockedHttpService.post.mockResolvedValueOnce(customGame);

    const data = await group.setCustomGameSettings({
        Map: "Ascent",
        Mode: "Bomb",
        GamePod: "aresriot.aws-rclusterprod-sae1-1.br-gp-saopaulo-1",
        GameRules: {
            AllowGameModifiers: "true",
            PlayOutAllRounds: "true",
            SkipMatchHistory: "true",
            TournamentMode: "true",
        },
    });

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/parties/v1/players/${currentUserId}`, "glz");

    expect(mockedHttpService.post).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.post).toHaveBeenCalledWith(
        `/parties/v1/parties/${currentGroupID}/customgamesettings`,
        "glz",
        {
            Map: "/Game/Maps/Ascent/Ascent",
            Mode: "/Game/GameModes/Bomb/BombGameMode.BombGameMode_C",
            GamePod: "aresriot.aws-rclusterprod-sae1-1.br-gp-saopaulo-1",
            GameRules: {
                AllowGameModifiers: "true",
                PlayOutAllRounds: "true",
                SkipMatchHistory: "true",
                TournamentMode: "true",
            },
        },
    );

    expect(data).toEqual(customGame);
});

test("should set custom game settings without rule and gamepod from user autenticated", async () => {
    const customGame: GroupDetails = {
        ...mockedCurrentGroupDetails,
        CustomGameData: {
            ...mockedCurrentGroupDetails.CustomGameData,
            Settings: {
                Map: "/Game/Maps/Ascent/Ascent",
                Mode: "/Game/GameModes/Bomb/BombGameMode.BombGameMode_C",
                GamePod: "aresriot.aws-rclusterprod-sae1-1.br-gp-saopaulo-1",
                UseBots: true,
                GameRules: null,
            },
        },
    };

    mockedHttpService.post.mockResolvedValueOnce(customGame);

    const data = await group.setCustomGameSettings({
        Map: "Ascent",
        Mode: "Bomb",
    });

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/parties/v1/players/${currentUserId}`, "glz");

    expect(mockedHttpService.post).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.post).toHaveBeenCalledWith(
        `/parties/v1/parties/${currentGroupID}/customgamesettings`,
        "glz",
        {
            Map: "/Game/Maps/Ascent/Ascent",
            Mode: "/Game/GameModes/Bomb/BombGameMode.BombGameMode_C",
            GamePod: "aresriot.aws-rclusterprod-sae1-1.br-gp-saopaulo-1",
            GameRules: null,
        },
    );

    expect(data).toEqual(customGame);
});

test("should invite someone by display name", async () => {
    const groupInvite: GroupDetails = {
        ...mockedCurrentGroupDetails,
        Invites: [
            {
                Subject: "iws",
                PartyID: "test",
                ID: "test",
                ExpiresIn: 15,
                CreatedAt: "test",
                InvitedBySubject: currentUserId,
            },
        ],
    };

    mockedHttpService.post.mockResolvedValueOnce(groupInvite);

    const name = "iws";
    const tag = "777";

    const data = await group.inviteByDisplayName(name, tag);

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/parties/v1/players/${currentUserId}`, "glz");

    expect(mockedHttpService.post).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.post).toHaveBeenCalledWith(
        `/parties/v1/parties/${currentGroupID}/invites/name/${name}/tag/${tag}`,
        "glz",
        {
            name: "iws",
            tag: "777",
        },
    );

    expect(data).toEqual(groupInvite);
});

test("should request to join a some group", async () => {
    //TODO: need to discover return type

    mockedHttpService.post.mockResolvedValueOnce(mockedCurrentGroupDetails);

    const data = await group.requestJoinToGroup("test", anotherUserId);

    expect(mockedHttpService.post).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.post).toHaveBeenCalledWith(`/parties/v1/parties/${currentGroupID}/request`, "glz", {
        Subjects: [anotherUserId],
    });

    expect(data).toEqual(mockedCurrentGroupDetails);
});

test("should decline a request to join a some group", async () => {
    //TODO: need to discover return type

    mockedHttpService.post.mockResolvedValueOnce(mockedCurrentGroupDetails);

    const data = await group.declineRequestGroup("party_id");

    expect(mockedHttpService.post).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.post).toHaveBeenCalledWith(
        `/parties/v1/parties/${currentGroupID}/request/party_id/decline`,
        "glz",
    );

    expect(data).toEqual(mockedCurrentGroupDetails);
});

test("should join a group", async () => {
    //TODO: need to discover return type

    mockedHttpService.post.mockResolvedValueOnce(mockedCurrentGroupDetails);

    const anotherIdGroup = "another_id";

    const data = await group.joinGroup(anotherIdGroup);

    expect(mockedHttpService.post).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.post).toHaveBeenCalledWith(
        `/parties/v1/players/${currentUserId}/joinparty/${anotherIdGroup}`,
        "glz",
    );

    expect(data).toEqual(mockedCurrentGroupDetails);
});

test("should leave a group", async () => {
    //TODO: need to discover return type

    mockedHttpService.post.mockResolvedValueOnce(mockedCurrentGroupDetails);

    const anotherIdGroup = "another_id";

    const data = await group.leaveGroup(anotherIdGroup);

    expect(mockedHttpService.post).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.post).toHaveBeenCalledWith(
        `/parties/v1/players/${currentUserId}/leaveparty/${anotherIdGroup}`,
        "glz",
    );

    expect(data).toEqual(mockedCurrentGroupDetails);
});

test("should return all available game modes", async () => {
    mockedHttpService.fetch.mockReset();
    mockedHttpService.fetch.mockResolvedValueOnce(mockedCurrentAvailableGameModes);

    const data = await group.currentAvailableGameModes();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/parties/v1/parties/customgameconfigs`, "glz");

    expect(data).toEqual(mockedCurrentAvailableGameModes);
});
