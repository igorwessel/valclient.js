import { Session } from "@app/session";

import { CurrentGameSessionResponse, ReconnectGameSessionResponse } from "@interfaces/session";

const httpService = {
    fetch: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    del: jest.fn(),
};

const currentUserId = "current_user";

const mockedCurrentSession: CurrentGameSessionResponse = {
    subject: "current_session",
    cxnState: "current_session",
    clientID: "current_session",
    clientVersion: "current_session",
    loopState: "current_session",
    loopStateMetadata: "current_session",
    version: 1,
    lastHeartbeatTime: "current_session",
    expiredTime: "current_session",
    heartbeatIntervalMillis: 1,
    playtimeNotification: "current_session",
    playtimeMinutes: 1,
    isRestricted: false,
    userinfoValidTime: "current_session",
    restrictionType: "current_session",
    clientPlatformInfo: {
        platformType: "current_session",
        platformOS: "current_session",
        platformOSVersion: "current_session",
        platformChipset: "current_session",
    },
};

const mockedReconnect: ReconnectGameSessionResponse = {
    reconnect: true,
};

const session = new Session(httpService, currentUserId);

afterEach(() => {
    httpService.fetch.mockClear();
});

test("should return all friends", async () => {
    httpService.fetch.mockResolvedValueOnce(mockedCurrentSession);

    const data = await session.current();

    expect(httpService.fetch).toHaveBeenCalledTimes(1);

    expect(httpService.fetch).toHaveBeenCalledWith(`/session/v1/sessions/${currentUserId}`, "glz");

    expect(data).toEqual(mockedCurrentSession);
});

test("should reconnect a game session", async () => {
    httpService.fetch.mockResolvedValueOnce(mockedReconnect);

    const data = await session.reconnect();

    expect(httpService.fetch).toHaveBeenCalledTimes(1);

    expect(httpService.fetch).toHaveBeenCalledWith(`/session/v1/sessions/${currentUserId}/reconnect`, "glz");

    expect(data).toEqual(mockedReconnect);
});
