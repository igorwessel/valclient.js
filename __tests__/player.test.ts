import { Player } from "@app/player";
import { mock } from "jest-mock-extended";

import {
    CurrentPlayerResponse,
    FriendsResponse,
    PresenceResponse,
    PresencePrivate,
    RNETFetchChatSession,
    PendingFriendsResponse,
} from "@interfaces/player";
import { Base64 } from "@interfaces/helpers";
import { IHttp } from "@interfaces/http";

import { PrivateInformationJSON64 } from "@errors/privateInformationJSON64";

const mockedHttpService = mock<IHttp>();

const currentUserId = "current_user";
const anotherUserId = "another_user";

const mockedFriends: FriendsResponse = {
    friends: [
        {
            game_name: "user_name",
            game_tag: "tag",
            puuid: "user_id",
            region: "br",
            pid: "pid_socket",
            note: "note_when_add_in_client",
            name: "name",
            group: "group",
            displayGroup: "displaygroup",
            last_online_ts: 12,
        },
    ],
};

const mockedFriendsOnline: PresenceResponse = {
    presences: [
        {
            actor: currentUserId,
            basic: currentUserId,
            details: currentUserId,
            game_name: currentUserId,
            game_tag: currentUserId,
            location: currentUserId,
            msg: currentUserId,
            name: currentUserId,
            patchline: null,
            pid: currentUserId,
            platform: null,
            private:
                "eyJjaGFtcGlvbklkIjogImN1cnJlbnRfdXNlciIsICJjb21wYW5pb25JZCI6ICJjdXJyZW50X3VzZXIiLCAiZ2FtZUlkIjogImN1cnJlbnRfdXNlciIsICJnYW1lTW9kZSI6ICJjdXJyZW50X3VzZXIiLCAiZ2FtZVF1ZXVlVHlwZSI6ICJjdXJyZW50X3VzZXIiLCAiZ2FtZVN0YXR1cyI6ICJjdXJyZW50X3VzZXIiLCAiaWNvbk92ZXJyaWRlIjogImN1cnJlbnRfdXNlciIsICJpc09ic2VydmFibGUiOiAiY3VycmVudF91c2VyIiwgImxldmVsIjogImN1cnJlbnRfdXNlciIsICJtYXBJZCI6ICJjdXJyZW50X3VzZXIiLCAibWFzdGVyeVNjb3JlIjogImN1cnJlbnRfdXNlciIsICJwcm9maWxlSWNvbiI6ICJjdXJyZW50X3VzZXIiLCAicHR5IjogeyJwYXJ0eUlkIjogInRlc3QiLCAicXVldWVJZCI6IDEsICJzdW1tb25lcnMiOiBbMF19LCAicHV1aWQiOiAiY3VycmVudF91c2VyIiwgInF1ZXVlSWQiOiAiY3VycmVudF91c2VyIiwgInJhbmtlZExlYWd1ZURpdmlzaW9uIjogImN1cnJlbnRfdXNlciIsICJyYW5rZWRMZWFndWVRdWV1ZSI6ICJjdXJyZW50X3VzZXIiLCAicmFua2VkTGVhZ3VlVGllciI6ICJjdXJyZW50X3VzZXIiLCAicmFua2VkTG9zc2VzIjogImN1cnJlbnRfdXNlciIsICJyYW5rZWRTcGxpdFJld2FyZExldmVsIjogImN1cnJlbnRfdXNlciIsICJyYW5rZWRXaW5zIjogImN1cnJlbnRfdXNlciIsICJyZWdhbGlhIjogeyJiYW5uZXJUeXBlIjogMiwgImNyZXN0VHlwZSI6IDF9LCAic2tpblZhcmlhbnQiOiAiY3VycmVudF91c2VyIiwgInNraW5uYW1lIjogImN1cnJlbnRfdXNlciIsICJ0aW1lU3RhbXAiOiAiY3VycmVudF91c2VyIn0=" as Base64,
            privateJwt: null,
            product: currentUserId,
            puuid: currentUserId,
            region: currentUserId,
            resource: currentUserId,
            state: currentUserId,
            summary: currentUserId,
            time: 1,
        },
        {
            actor: anotherUserId + "_with_invalid_private",
            basic: anotherUserId + "_with_invalid_private",
            details: anotherUserId + "_with_invalid_private",
            game_name: anotherUserId + "_with_invalid_private",
            game_tag: anotherUserId + "_with_invalid_private",
            location: anotherUserId + "_with_invalid_private",
            msg: anotherUserId + "_with_invalid_private",
            name: anotherUserId + "_with_invalid_private",
            patchline: null,
            pid: anotherUserId + "_with_invalid_private",
            platform: null,
            private: "base64-json-string" as Base64,
            privateJwt: null,
            product: anotherUserId + "_with_invalid_private",
            puuid: anotherUserId + "_with_invalid_private",
            region: anotherUserId + "_with_invalid_private",
            resource: anotherUserId + "_with_invalid_private",
            state: anotherUserId + "_with_invalid_private",
            summary: anotherUserId + "_with_invalid_private",
            time: 1,
        },
        {
            actor: anotherUserId,
            basic: anotherUserId,
            details: anotherUserId,
            game_name: anotherUserId,
            game_tag: anotherUserId,
            location: anotherUserId,
            msg: anotherUserId,
            name: anotherUserId,
            patchline: null,
            pid: anotherUserId,
            platform: null,
            private:
                "eyJjaGFtcGlvbklkIjogImFub3RoZXJfdXNlciIsICJjb21wYW5pb25JZCI6ICJhbm90aGVyX3VzZXIiLCAiZ2FtZUlkIjogImFub3RoZXJfdXNlciIsICJnYW1lTW9kZSI6ICJhbm90aGVyX3VzZXIiLCAiZ2FtZVF1ZXVlVHlwZSI6ICJhbm90aGVyX3VzZXIiLCAiZ2FtZVN0YXR1cyI6ICJhbm90aGVyX3VzZXIiLCAiaWNvbk92ZXJyaWRlIjogImFub3RoZXJfdXNlciIsICJpc09ic2VydmFibGUiOiAiYW5vdGhlcl91c2VyIiwgImxldmVsIjogImFub3RoZXJfdXNlciIsICJtYXBJZCI6ICJhbm90aGVyX3VzZXIiLCAibWFzdGVyeVNjb3JlIjogImFub3RoZXJfdXNlciIsICJwcm9maWxlSWNvbiI6ICJhbm90aGVyX3VzZXIiLCAicHR5IjogeyJwYXJ0eUlkIjogInNraXAiLCAicXVldWVJZCI6IDEsICJzdW1tb25lcnMiOiBbMF19LCAicHV1aWQiOiAiYW5vdGhlcl91c2VyIiwgInF1ZXVlSWQiOiAiYW5vdGhlcl91c2VyIiwgInJhbmtlZExlYWd1ZURpdmlzaW9uIjogImFub3RoZXJfdXNlciIsICJyYW5rZWRMZWFndWVRdWV1ZSI6ICJhbm90aGVyX3VzZXIiLCAicmFua2VkTGVhZ3VlVGllciI6ICJhbm90aGVyX3VzZXIiLCAicmFua2VkTG9zc2VzIjogImFub3RoZXJfdXNlciIsICJyYW5rZWRTcGxpdFJld2FyZExldmVsIjogImFub3RoZXJfdXNlciIsICJyYW5rZWRXaW5zIjogImFub3RoZXJfdXNlciIsICJyZWdhbGlhIjogeyJiYW5uZXJUeXBlIjogMiwgImNyZXN0VHlwZSI6IDF9LCAic2tpblZhcmlhbnQiOiAiYW5vdGhlcl91c2VyIiwgInNraW5uYW1lIjogImFub3RoZXJfdXNlciIsICJ0aW1lU3RhbXAiOiAiYW5vdGhlcl91c2VyIn0=" as Base64,
            privateJwt: null,
            product: anotherUserId,
            puuid: anotherUserId,
            region: anotherUserId,
            resource: anotherUserId,
            state: anotherUserId,
            summary: anotherUserId,
            time: 1,
        },
    ],
};

const mockSession: RNETFetchChatSession = {
    federated: true,
    game_name: currentUserId,
    game_tag: currentUserId,
    loaded: true,
    name: currentUserId,
    pid: currentUserId,
    puuid: currentUserId,
    region: currentUserId,
    resource: currentUserId,
    state: currentUserId,
};

const mockCurrentUserPrivate: PresencePrivate = {
    championId: currentUserId,
    companionId: currentUserId,
    gameId: currentUserId,
    gameMode: currentUserId,
    gameQueueType: currentUserId,
    gameStatus: currentUserId,
    iconOverride: currentUserId,
    isObservable: currentUserId,
    level: currentUserId,
    mapId: currentUserId,
    masteryScore: currentUserId,
    profileIcon: currentUserId,
    pty: {
        partyId: "test",
        queueId: 1,
        summoners: [0],
    },
    puuid: currentUserId,
    queueId: currentUserId,
    rankedLeagueDivision: currentUserId,
    rankedLeagueQueue: currentUserId,
    rankedLeagueTier: currentUserId,
    rankedLosses: currentUserId,
    rankedSplitRewardLevel: currentUserId,
    rankedWins: currentUserId,
    regalia: {
        bannerType: 2,
        crestType: 1,
    },
    skinVariant: currentUserId,
    skinname: currentUserId,
    timeStamp: currentUserId,
};

const mockAnotherUserPrivate: PresencePrivate = {
    championId: anotherUserId,
    companionId: anotherUserId,
    gameId: anotherUserId,
    gameMode: anotherUserId,
    gameQueueType: anotherUserId,
    gameStatus: anotherUserId,
    iconOverride: anotherUserId,
    isObservable: anotherUserId,
    level: anotherUserId,
    mapId: anotherUserId,
    masteryScore: anotherUserId,
    profileIcon: anotherUserId,
    pty: {
        partyId: "skip",
        queueId: 1,
        summoners: [0],
    },
    puuid: anotherUserId,
    queueId: anotherUserId,
    rankedLeagueDivision: anotherUserId,
    rankedLeagueQueue: anotherUserId,
    rankedLeagueTier: anotherUserId,
    rankedLosses: anotherUserId,
    rankedSplitRewardLevel: anotherUserId,
    rankedWins: anotherUserId,
    regalia: {
        bannerType: 2,
        crestType: 1,
    },
    skinVariant: anotherUserId,
    skinname: anotherUserId,
    timeStamp: anotherUserId,
};

const mockCurrentPlayer: CurrentPlayerResponse = {
    active: true,
    created_datetime: 203,
    game_name: "iws",
    tag_line: "777",
    summoner: false,
};

const mockPendingFriendRequests: PendingFriendsResponse = {
    requests: [
        {
            game_name: anotherUserId,
            game_tag: anotherUserId,
            name: anotherUserId,
            note: anotherUserId,
            pid: anotherUserId,
            puuid: anotherUserId,
            region: anotherUserId,
            subscription: anotherUserId,
        },
    ],
};

const player = new Player(mockedHttpService, currentUserId);

afterEach(() => {
    mockedHttpService.fetch.mockClear();
});

test("should return all friends", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedFriends);

    const data = await player.allFriends();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith("/chat/v4/friends", "local");

    expect(data).toEqual(mockedFriends.friends);
});

test("should return all online friends", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedFriendsOnline);

    const data = await player.allFriendsOnline();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith("/chat/v4/presences", "local");

    expect(data).toEqual(mockedFriendsOnline.presences);
});

test("should return friend", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockCurrentPlayer);

    const data = await player.current();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith("/player-account/aliases/v1/active", "local");

    expect(data).toEqual(mockCurrentPlayer);
});

test("if pass puuid to onlineFriend and information don't is base64 encoded JSON string, throw a error", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedFriendsOnline);

    expect(player.onlineFriend(`${anotherUserId}_with_invalid_private`)).rejects.toThrow(PrivateInformationJSON64);
});

test("if pass puuid to onlineFriend and this friend is not online", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedFriendsOnline);

    const data = await player.onlineFriend("is_not_online");

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith("/chat/v4/presences", "local");

    expect(data).toBe(null);
});

test("if dont pass puuid to onlineFriend should return information from current user", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedFriendsOnline);

    const data = await player.onlineFriend();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith("/chat/v4/presences", "local");

    expect(data).toEqual(mockCurrentUserPrivate);
});

test("if pass puuid to onlineFriend should return information from this user", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedFriendsOnline);

    const data = await player.onlineFriend(anotherUserId);

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith("/chat/v4/presences", "local");

    expect(data).toEqual(mockAnotherUserPrivate);
});

test("should return current session", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockSession);

    const data = await player.session();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith("/chat/v1/session", "local");

    expect(data).toEqual(mockSession);
});

test("should return all pending friend requests", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockPendingFriendRequests);

    const data = await player.pendingFriendsRequests();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith("/chat/v4/friendrequests", "local");

    expect(data).toEqual(mockPendingFriendRequests.requests);
});
