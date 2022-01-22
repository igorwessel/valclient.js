import { client } from "@tests/__setup__/integration";

describe("Process", () => {
    test("when valorant is not open, launcher is open and logged should return empty object", async () => {
        const spy = jest.spyOn(client.valorant, "process");
        const data = await client.valorant.process();
        expect(spy).toHaveBeenCalled();
        expect(data).toMatchObject({});

        spy.mockRestore();
    });

    test("should return info about valorant process running", async () => {
        const data = await client.valorant.process();

        const process = Object.keys(data)[0];

        expect(data[process]).toContainAllKeys([
            "exitCode",
            "exitReason",
            "isInternal",
            "launchConfiguration",
            "patchlineFullName",
            "patchlineId",
            "phase",
            "productId",
            "version",
        ]);

        expect(data[process]["launchConfiguration"]).toContainAllKeys([
            "arguments",
            "executable",
            "locale",
            "voiceLocale",
            "workingDirectory",
        ]);
    });
});

test("should return client settings", async () => {
    const settings = await client.valorant.clientSettings();

    expect(settings).toContainAllKeys(["data", "modified", "type"]);

    expect(settings.type).toEqual("Ares.PlayerSettings");

    expect(settings.data).toContainAllKeys([
        "actionMappings",
        "axisMappings",
        "boolSettings",
        "floatSettings",
        "intSettings",
        "roamingSetttingsVersion",
        "stringSettings",
        "settingsProfiles",
    ]);
});
