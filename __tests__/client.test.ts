import ValClient, { addAuthHeaders, addLocalHeaders } from "@app/client";

import fs from "fs";
import axios from "axios";

import { mocked } from "ts-jest/utils";
import { SystemNotSupported } from "@errors/SystemNotSupported";
import { ValorantNotRunning } from "@errors/ValorantNotRunning";

import { regions, regionShardOverride, shardRegionOverride } from "@resources";

import { Group } from "@app/group";
import { LiveGame } from "@app/liveGame";
import { PreGame } from "@app/preGame";
import { Session } from "@app/session";
import { Pvp } from "@app/pvp";
import { Store } from "@app/store";
import { Contracts } from "@app/contracts";
import { Player } from "@app/player";
import { Valorant } from "@app/valorant";

jest.mock("fs");
jest.mock("axios");
jest.mock("axios-cookiejar-support");

const mockedClientVersion = {
    data: { data: { branch: "blabla", buildVersion: "blabla", version: "3.0.0.3" } },
};

const mockedLocalRequestToken = { data: { accessToken: "test", subject: "test", token: "test" } };

const mockedRequestToken = {
    headers: {
        "set-cookie": ["test", "test", "bla", "bla", "bla"],
    },
};

const mockedPutAccessToken = {
    data: {
        response: {
            parameters: {
                uri: "https://playvalorant.com/opt_in#access_token=teste&scope=openid&iss=https%3A%2F%2Fauth.riotgames.com&id_token=teste&token_type=Bearer&session_state=teste&expires_in=3600",
            },
        },
    },
};

const mockedEntitlementsToken = {
    data: {
        entitlements_token: "token",
    },
};

const mockedUserInfo = {
    data: {
        sub: "id_of_user",
    },
};

const mockedLockFile = "name:pid:port:password:protocol";

const mockedFS = mocked(fs, true);
const mockedAxios = mocked(axios, true);

let valClient: ValClient;

describe("Without iniciate client", () => {
    beforeAll(() => {
        mockedAxios.create.mockReturnThis();

        valClient = new ValClient();
    });

    afterAll(() => {
        mockedAxios.create.mockClear();
    });

    test("we can get all regions accepted for client", () => {
        const regionsClient = valClient.allRegions;

        expect(regionsClient).toEqual(expect.arrayContaining(regions));
    });

    test("we can get a instance for valorant api", async () => {
        expect(mockedAxios.create).toHaveBeenCalledWith({ baseURL: "https://valorant-api.com/v1" });

        expect(valClient.valorant_api).not.toBe(undefined);
    });

    test("we can get endpoints of client uses", () => {
        expect(valClient.endpoints).toEqual({ pd: null, glz: null, shared: null, local: null });
    });

    test("auth must be null", () => {
        const auth = valClient.auth;

        expect(auth).toEqual(null);
    });

    test("current region must be null", () => {
        const region = valClient.region;

        expect(region).toEqual(null);
    });

    test("all endpoints must be null", () => {
        const player = valClient.player;
        const valorant = valClient.valorant;
        const group = valClient.group;
        const live_game = valClient.live_game;
        const pre_game = valClient.pre_game;
        const session = valClient.session;
        const pvp = valClient.pvp;
        const store = valClient.store;
        const contracts = valClient.contracts;

        expect(player).toEqual(null);
        expect(valorant).toEqual(null);
        expect(group).toEqual(null);
        expect(live_game).toEqual(null);
        expect(pre_game).toEqual(null);
        expect(session).toEqual(null);
        expect(pvp).toEqual(null);
        expect(store).toEqual(null);
        expect(contracts).toEqual(null);
    });
});

describe("Headers config in interceptor", () => {
    test("add autheticated headers", () => {
        const interceptor = addAuthHeaders({
            Authorization: "Bearer token",
            "X-Riot-ClientPlatform": "client-platform",
            "X-Riot-ClientVersion": mockedClientVersion.data.data.version,
            "X-Riot-Entitlements-JWT": "entitlement-token",
        });

        const config = interceptor({});

        expect(config.headers.Authorization).toBe("Bearer token");
        expect(config.headers["X-Riot-ClientPlatform"]).toBe("client-platform");
        expect(config.headers["X-Riot-ClientVersion"]).toBe(mockedClientVersion.data.data.version);
        expect(config.headers["X-Riot-Entitlements-JWT"]).toBe("entitlement-token");
    });

    test("add local headers", () => {
        const interceptor = addLocalHeaders("test", "test");

        const config = interceptor({ url: "https://127.0.0.1:port" });

        expect(config.auth.username).toBe("test");
        expect(config.auth.password).toBe("test");
    });

    test("if endpoint url is not local, return original config", () => {
        const interceptor = addLocalHeaders("test", "test");

        const config = interceptor({ url: "http://someone-endpoint.com" });

        expect(config.auth).toBeUndefined();
        expect(config.url).toBe("http://someone-endpoint.com");
    });
});

describe("Try to iniciate client", () => {
    const realPlatform = Object.getOwnPropertyDescriptor(process, "platform");

    beforeAll(() => {
        valClient = new ValClient();

        mockedAxios.get.mockResolvedValueOnce(mockedClientVersion);

        mockedFS.readFileSync.mockImplementationOnce(() => {
            throw { code: "ENOENT", syscall: "open" };
        });
    });

    afterEach(() => {
        Object.defineProperty(process, "platform", realPlatform);
    });

    afterAll(() => {
        mockedAxios.get.mockClear();
        mockedFS.readFileSync.mockReset();
    });

    test("is not in windows throw a SystemNotSupported", async () => {
        Object.defineProperty(process, "platform", {
            ...Object.getOwnPropertyDescriptor(process, "property"),
            value: "linux",
        });

        expect(valClient.init({ region: "br" })).rejects.toThrowError(SystemNotSupported);
    });

    test("valorant is not running (launcher is logged), throw a ValorantNotRunning", async () => {
        Object.defineProperty(process, "platform", {
            ...Object.getOwnPropertyDescriptor(process, "property"),
            value: "win32",
        });

        expect(valClient.init({ region: "br" })).rejects.toThrowError(ValorantNotRunning);
    });
});

describe("Iniciate a client with diferents regions", () => {
    const realPlatform = Object.getOwnPropertyDescriptor(process, "platform");

    beforeEach(async () => {
        Object.defineProperty(process, "platform", {
            ...Object.getOwnPropertyDescriptor(process, "property"),
            value: "win32",
        });

        valClient = new ValClient();

        mockedAxios.get.mockResolvedValueOnce(mockedClientVersion).mockResolvedValueOnce(mockedLocalRequestToken);

        mockedFS.readFileSync.mockReturnValueOnce(mockedLockFile);
    });

    afterEach(() => {
        Object.defineProperty(process, "platform", realPlatform);

        mockedAxios.get.mockReset();
        mockedFS.readFileSync.mockReset();
    });

    test("add correct shard based in region passed in init", async () => {
        await valClient.init({ region: "br" });

        expect(valClient.shard).toBe(regionShardOverride[valClient.region]);
    });

    test("replace the region if no endpoint for it", async () => {
        await valClient.init({ region: "pbe" });

        expect(valClient.region).toBe(shardRegionOverride[valClient.shard]);
    });
});

describe("Iniciate client without auth", () => {
    const realPlatform = Object.getOwnPropertyDescriptor(process, "platform");

    beforeAll(async () => {
        Object.defineProperty(process, "platform", {
            ...Object.getOwnPropertyDescriptor(process, "property"),
            value: "win32",
        });

        valClient = new ValClient();
        mockedAxios.get.mockResolvedValueOnce(mockedClientVersion).mockResolvedValueOnce(mockedLocalRequestToken);

        mockedFS.readFileSync.mockReturnValueOnce(mockedLockFile);

        await valClient.init({ region: "br" });
    });

    afterAll(() => {
        Object.defineProperty(process, "platform", realPlatform);

        mockedAxios.get.mockClear();
        mockedFS.readFileSync.mockClear();
        mockedFS.readFileSync.mockReset();
    });

    test("valorant is running, get authorization to made request", async () => {
        expect(mockedAxios.get).toHaveBeenCalledTimes(2);

        expect(mockedAxios.get).toHaveBeenNthCalledWith(1, "/version");
        expect(mockedAxios.get).toHaveBeenNthCalledWith(
            2,
            "https://127.0.0.1:port/entitlements/v1/token",
            expect.objectContaining({ auth: { username: expect.any(String), password: expect.any(String) } }),
        );
    });

    test("client authenticated with local, need to have player and valorant instances, only works in local endpoint", async () => {
        expect(valClient.player).toBeInstanceOf(Player);
        expect(valClient.valorant).toBeInstanceOf(Valorant);
    });

    test("client authenticated with local, must to have the other instances", async () => {
        expect(valClient.group).toBeInstanceOf(Group);
        expect(valClient.live_game).toBeInstanceOf(LiveGame);
        expect(valClient.pre_game).toBeInstanceOf(PreGame);
        expect(valClient.session).toBeInstanceOf(Session);
        expect(valClient.pvp).toBeInstanceOf(Pvp);
        expect(valClient.store).toBeInstanceOf(Store);
        expect(valClient.contracts).toBeInstanceOf(Contracts);
    });
});

describe("Iniciate client with auth", () => {
    beforeAll(async () => {
        valClient = new ValClient();

        mockedAxios.get.mockResolvedValueOnce(mockedClientVersion);

        mockedAxios.post
            .mockResolvedValueOnce(mockedRequestToken)
            .mockResolvedValueOnce(mockedEntitlementsToken)
            .mockResolvedValueOnce(mockedUserInfo);

        mockedAxios.put.mockResolvedValueOnce(mockedPutAccessToken);

        await valClient.init({ region: "br", auth: { username: "teste", password: "teste" } });
    });

    afterAll(() => {
        mockedAxios.get.mockClear();
        mockedAxios.post.mockClear();
        mockedAxios.put.mockClear();
    });

    test("we can authenticate", async () => {
        expect(mockedAxios.get).toHaveBeenCalledWith("/version");

        expect(mockedAxios.post).toHaveBeenNthCalledWith(
            1,
            "https://auth.riotgames.com/api/v1/authorization",
            {
                client_id: "play-valorant-web-prod",
                nonce: "1",
                redirect_uri: "https://playvalorant.com/opt_in",
                response_type: "token id_token",
            },
            expect.anything(),
        );

        expect(mockedAxios.post).toHaveBeenNthCalledWith(
            2,
            "https://entitlements.auth.riotgames.com/api/token/v1",
            {},
            expect.anything(),
        );

        expect(mockedAxios.post).toHaveBeenNthCalledWith(
            3,
            "https://auth.riotgames.com/userinfo",
            {},
            expect.anything(),
        );

        expect(mockedAxios.put).toHaveBeenCalledWith(
            "https://auth.riotgames.com/api/v1/authorization",
            {
                username: "teste",
                password: "teste",
                type: "auth",
            },
            expect.anything(),
        );
    });

    test("after authenticated, we can get current user", () => {
        expect(valClient.auth).toMatchObject({ username: "teste", password: "teste" });
    });

    test("after authenticated, endpoints must be available", () => {
        expect(valClient.player).toEqual(null);
        expect(valClient.valorant).toEqual(null);

        expect(valClient.group).toBeInstanceOf(Group);
        expect(valClient.live_game).toBeInstanceOf(LiveGame);
        expect(valClient.pre_game).toBeInstanceOf(PreGame);
        expect(valClient.session).toBeInstanceOf(Session);
        expect(valClient.pvp).toBeInstanceOf(Pvp);
        expect(valClient.store).toBeInstanceOf(Store);
        expect(valClient.contracts).toBeInstanceOf(Contracts);
    });
});
