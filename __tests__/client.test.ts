import ValClient from "@app/client";
import { ValorantNotRunning } from "@errors/ValorantNotRunning";
import { regions } from "@resources";

let valClient: ValClient;

beforeEach(() => {
    valClient = new ValClient();
});

describe("Client", () => {
    describe("without iniatiate client", () => {
        test("we can get all regions accepted for client", () => {
            const regionsClient = valClient.allRegions;

            expect(regionsClient).toEqual(expect.arrayContaining(regions));
        });

        test("we can get a instance for valorant api", () => {
            const valorantApi = valClient.valorant_api;

            expect(valorantApi.defaults.baseURL).toEqual("https://valorant-api.com/v1");
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

    describe("init client without pass auth", () => {
        //TODO: I need to figure out how to test this part so that it doesn't break when I open valorant
        test("if valorant is not running throw a error ValorantNotRunnig ", () => {
            expect.assertions(1);
            return expect(valClient.init()).rejects.toThrow(ValorantNotRunning);
        });

        test("if valorant is running we can init client without auth", async () => {
            expect.assertions(1);
            await valClient.init();

            expect(valClient.allRegions).toEqual(expect.arrayContaining([valClient.region.toLowerCase()]));
        });
    });
});
