import ValClient from "@app/client";

import fs from "fs";
import axios from "axios";

import { mocked } from "ts-jest/utils";
import { SystemNotSupported } from "@errors/SystemNotSupported";
import { ValorantNotRunning } from "@errors/ValorantNotRunning";

import { regions, regionShardOverride, shardRegionOverride } from "@resources";

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

const mockedFS = mocked(fs, true);
const mockedAxios = mocked(axios, true);

let valClient: ValClient;

describe("Client", () => {
    describe("Without iniciate client", () => {
        beforeAll(() => {
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
            mockedAxios.create.mockReturnThis();

            expect(mockedAxios.create).toHaveBeenCalledWith({ baseURL: "https://valorant-api.com/v1" });
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

    xdescribe("Iniciate client without auth", () => {
        const realPlatform = Object.getOwnPropertyDescriptor(process, "platform");

        beforeAll(() => {
            valClient = new ValClient();
        });

        afterEach(() => {
            Object.defineProperty(process, "platform", realPlatform);

            mockedAxios.get.mockClear();
            mockedFS.readFileSync.mockClear();
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
            mockedAxios.get.mockResolvedValueOnce(mockedClientVersion);

            mockedFS.readFileSync.mockImplementationOnce(() => {
                throw { code: "ENOENT", syscall: "open" };
            });

            expect(valClient.init({ region: "br" })).rejects.toThrowError(ValorantNotRunning);
        });

        test("valorant is running, get authorization to made request", async () => {
            mockedFS.readFileSync.mockReturnValueOnce("name:pid:port:password:protocol");

            /**
             * First request to client version
             * Second request to get local token
             */
            mockedAxios.get.mockResolvedValueOnce(mockedClientVersion).mockResolvedValueOnce(mockedLocalRequestToken);

            await valClient.init({ region: "br" });

            expect(mockedAxios.get).toHaveBeenCalledTimes(2);
            expect(mockedAxios.get).toHaveBeenNthCalledWith(1, "/version");
            expect(mockedAxios.get).toHaveBeenNthCalledWith(2, "https://127.0.0.1:port/entitlements/v1/token");
        });

        test("client now need to have player and valorant instances, only works in local endpoint", async () => {
            mockedFS.readFileSync.mockReturnValueOnce("name:pid:port:password:protocol");

            /**
             * First request to client version
             * Second request to get local token
             */
            mockedAxios.get.mockResolvedValueOnce(mockedClientVersion).mockResolvedValueOnce(mockedLocalRequestToken);

            await valClient.init({ region: "br" });

            expect(mockedAxios.get).toHaveBeenCalledTimes(2);
            expect(valClient.player).not.toBe(null);
            expect(valClient.valorant).not.toBe(null);
        });
    });

    describe("Iniciate client with auth", () => {
        beforeAll(() => {
            valClient = new ValClient();
        });

        test("we can authenticate", async () => {
            mockedAxios.get.mockResolvedValueOnce(mockedClientVersion);

            mockedAxios.post
                .mockResolvedValueOnce(mockedRequestToken)
                .mockResolvedValueOnce(mockedEntitlementsToken)
                .mockResolvedValueOnce(mockedUserInfo);

            mockedAxios.put.mockResolvedValueOnce(mockedPutAccessToken);

            await valClient.init({ region: "br", auth: { username: "teste", password: "teste" } });

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

            expect(valClient.auth).toMatchObject({ username: "teste", password: "teste" });
        });
    });
});
