import { Valorant } from "@app/valorant";

import { mock } from "jest-mock-extended";
import { ClientSettingsResponse, ValorantProcessResponse } from "@interfaces/valorant";
import { IHttp } from "@interfaces/http";

const mockedHttpService = mock<IHttp>();

const mockedValorantProcessResponse: ValorantProcessResponse = {
    process_generate_when_open_valorant: {
        exitCode: 123,
        exitReason: null,
        isInternal: null,
        launchConfiguration: {
            arguments: ["teste"],
            executable: "valorant_executable",
            locale: "pt-BR",
            voiceLocale: "BR",
            workingDirectory: "working_directory",
        },
        patchlineFullName: "pathline_fullname",
        patchlineId: "pathline_id",
        phase: "phase",
        productId: "productId",
        version: "version",
    },
};

const mockedClientSettings: ClientSettingsResponse = {
    data: {
        actionMappings: [
            {
                alt: true,
                bindIndex: 0,
                characterName: "k",
                cmd: false,
                ctrl: false,
                key: "K",
                name: "test",
                shift: true,
            },
        ],
        settingsProfiles: [],
        axisMapping: [],
        floatSettings: [{ settingEnum: "EAresFloatSettingName::MouseSensitivity", value: 5 }],
        intSettings: [{ settingEnum: "EAresIntSettingName::VoiceVolume", value: 1 }],
        roamingSetttingsVersion: 0,
        boolSettings: [
            {
                settingEnum: "EAresBoolSettingName::CollectionShowOwnedOnly",
                value: true,
            },
        ],
        stringSettings: [
            {
                settingEnum: "EAresStringSettingName::SavedCrosshairProfileData",
                value: '{"currentProfile":2,"profiles":[{"primary":{"color":{"b":0,"g":255,"r":0,"a":255},"bHasOutline":false,"outlineThickness":1,"outlineColor":{"b":0,"g":0,"r":0,"a":255},"outlineOpacity":1,"centerDotSize":1,"centerDotOpacity":1,"bDisplayCenterDot":false,"bFixMinErrorAcrossWeapons":false,"innerLines":{"lineThickness":1,"lineLength":4,"lineOffset":1,"bShowMovementError":false,"bShowShootingError":false,"bShowMinError":true,"opacity":0.80000001192092896,"bShowLines":true,"firingErrorScale":1,"movementErrorScale":1},"outerLines":{"lineThickness":2,"lineLength":2,"lineOffset":10,"bShowMovementError":false,"bShowShootingError":false,"bShowMinError":true,"opacity":0,"bShowLines":false,"firingErrorScale":1,"movementErrorScale":1}},"aDS":{"color":{"b":255,"g":255,"r":255,"a":255},"bHasOutline":true,"outlineThickness":1,"outlineColor":{"b":0,"g":0,"r":0,"a":255},"outlineOpacity":0.5,"centerDotSize":2,"centerDotOpacity":1,"bDisplayCenterDot":false,"bFixMinErrorAcrossWeapons":false,"innerLines":{"lineThickness":2,"lineLength":6,"lineOffset":3,"bShowMovementError":false,"bShowShootingError":true,"bShowMinError":true,"opacity":0.80000001192092896,"bShowLines":true,"firingErrorScale":1,"movementErrorScale":1},"outerLines":{"lineThickness":2,"lineLength":2,"lineOffset":10,"bShowMovementError":true,"bShowShootingError":true,"bShowMinError":true,"opacity":0.34999999403953552,"bShowLines":true,"firingErrorScale":1,"movementErrorScale":1}},"sniper":{"centerDotColor":{"b":0,"g":0,"r":255,"a":255},"centerDotSize":1,"centerDotOpacity":0.75,"bDisplayCenterDot":true},"bUsePrimaryCrosshairForADS":true,"bUseCustomCrosshairOnAllPrimary":false,"bUseAdvancedOptions":false,"profileName":"iws"},{"primary":{"color":{"b":0,"g":255,"r":0,"a":255},"bHasOutline":false,"outlineThickness":1,"outlineColor":{"b":0,"g":0,"r":0,"a":255},"outlineOpacity":1,"centerDotSize":2,"centerDotOpacity":1,"bDisplayCenterDot":false,"bFixMinErrorAcrossWeapons":false,"innerLines":{"lineThickness":1,"lineLength":5,"lineOffset":0,"bShowMovementError":false,"bShowShootingError":true,"bShowMinError":true,"opacity":1,"bShowLines":true,"firingErrorScale":1,"movementErrorScale":1},"outerLines":{"lineThickness":2,"lineLength":2,"lineOffset":10,"bShowMovementError":true,"bShowShootingError":true,"bShowMinError":true,"opacity":0.34999999403953552,"bShowLines":false,"firingErrorScale":1,"movementErrorScale":1}},"aDS":{"color":{"b":255,"g":255,"r":255,"a":255},"bHasOutline":true,"outlineThickness":1,"outlineColor":{"b":0,"g":0,"r":0,"a":255},"outlineOpacity":0.5,"centerDotSize":2,"centerDotOpacity":1,"bDisplayCenterDot":false,"bFixMinErrorAcrossWeapons":false,"innerLines":{"lineThickness":2,"lineLength":6,"lineOffset":3,"bShowMovementError":false,"bShowShootingError":true,"bShowMinError":true,"opacity":0.80000001192092896,"bShowLines":true,"firingErrorScale":1,"movementErrorScale":1},"outerLines":{"lineThickness":2,"lineLength":2,"lineOffset":10,"bShowMovementError":true,"bShowShootingError":true,"bShowMinError":true,"opacity":0.34999999403953552,"bShowLines":true,"firingErrorScale":1,"movementErrorScale":1}},"sniper":{"centerDotColor":{"b":0,"g":0,"r":255,"a":255},"centerDotSize":1,"centerDotOpacity":0.75,"bDisplayCenterDot":true},"bUsePrimaryCrosshairForADS":true,"bUseCustomCrosshairOnAllPrimary":false,"bUseAdvancedOptions":false,"profileName":"mirinha"},{"primary":{"color":{"b":255,"g":255,"r":255,"a":255},"bHasOutline":true,"outlineThickness":1,"outlineColor":{"b":0,"g":0,"r":0,"a":255},"outlineOpacity":0.5,"centerDotSize":2,"centerDotOpacity":1,"bDisplayCenterDot":false,"bFixMinErrorAcrossWeapons":false,"innerLines":{"lineThickness":2,"lineLength":6,"lineOffset":3,"bShowMovementError":false,"bShowShootingError":true,"bShowMinError":true,"opacity":0.80000001192092896,"bShowLines":true,"firingErrorScale":1,"movementErrorScale":1},"outerLines":{"lineThickness":2,"lineLength":2,"lineOffset":10,"bShowMovementError":true,"bShowShootingError":true,"bShowMinError":true,"opacity":0.34999999403953552,"bShowLines":true,"firingErrorScale":1,"movementErrorScale":1}},"aDS":{"color":{"b":255,"g":255,"r":255,"a":255},"bHasOutline":true,"outlineThickness":1,"outlineColor":{"b":0,"g":0,"r":0,"a":255},"outlineOpacity":0.5,"centerDotSize":2,"centerDotOpacity":1,"bDisplayCenterDot":false,"bFixMinErrorAcrossWeapons":false,"innerLines":{"lineThickness":2,"lineLength":6,"lineOffset":3,"bShowMovementError":false,"bShowShootingError":true,"bShowMinError":true,"opacity":0.80000001192092896,"bShowLines":true,"firingErrorScale":1,"movementErrorScale":1},"outerLines":{"lineThickness":2,"lineLength":2,"lineOffset":10,"bShowMovementError":true,"bShowShootingError":true,"bShowMinError":true,"opacity":0.34999999403953552,"bShowLines":true,"firingErrorScale":1,"movementErrorScale":1}},"sniper":{"centerDotColor":{"b":0,"g":0,"r":255,"a":255},"centerDotSize":1,"centerDotOpacity":0.75,"bDisplayCenterDot":true},"bUsePrimaryCrosshairForADS":true,"bUseCustomCrosshairOnAllPrimary":false,"bUseAdvancedOptions":false,"profileName":""}]}',
            },
        ],
    },
    modified: 0,
    type: "Ares.Settings",
};

const mockedCrossHairProfiles = {
    iws: {
        bDisplayCenterDot: false,
        bFixMinErrorAcrossWeapons: false,
        bHasOutline: false,
        centerDotOpacity: 1,
        centerDotSize: 1,
        color: {
            a: 255,
            b: 0,
            g: 255,
            r: 0,
        },
        innerLines: {
            bShowLines: true,
            bShowMinError: true,
            bShowMovementError: false,
            bShowShootingError: false,
            firingErrorScale: 1,
            lineLength: 4,
            lineOffset: 1,
            lineThickness: 1,
            movementErrorScale: 1,
            opacity: 0.800000011920929,
        },
        outerLines: {
            bShowLines: false,
            bShowMinError: true,
            bShowMovementError: false,
            bShowShootingError: false,
            firingErrorScale: 1,
            lineLength: 2,
            lineOffset: 10,
            lineThickness: 2,
            movementErrorScale: 1,
            opacity: 0,
        },
        outlineColor: {
            a: 255,
            b: 0,
            g: 0,
            r: 0,
        },
        outlineOpacity: 1,
        outlineThickness: 1,
    },
    "": {
        bDisplayCenterDot: false,
        bFixMinErrorAcrossWeapons: false,
        bHasOutline: true,
        centerDotOpacity: 1,
        centerDotSize: 2,
        color: {
            a: 255,
            b: 255,
            g: 255,
            r: 255,
        },
        innerLines: {
            bShowLines: true,
            bShowMinError: true,
            bShowMovementError: false,
            bShowShootingError: true,
            firingErrorScale: 1,
            lineLength: 6,
            lineOffset: 3,
            lineThickness: 2,
            movementErrorScale: 1,
            opacity: 0.800000011920929,
        },
        outerLines: {
            bShowLines: true,
            bShowMinError: true,
            bShowMovementError: true,
            bShowShootingError: true,
            firingErrorScale: 1,
            lineLength: 2,
            lineOffset: 10,
            lineThickness: 2,
            movementErrorScale: 1,
            opacity: 0.3499999940395355,
        },
        outlineColor: {
            a: 255,
            b: 0,
            g: 0,
            r: 0,
        },
        outlineOpacity: 0.5,
        outlineThickness: 1,
    },
    mirinha: {
        bDisplayCenterDot: false,
        bFixMinErrorAcrossWeapons: false,
        bHasOutline: false,
        centerDotOpacity: 1,
        centerDotSize: 2,
        color: {
            a: 255,
            b: 0,
            g: 255,
            r: 0,
        },
        innerLines: {
            bShowLines: true,
            bShowMinError: true,
            bShowMovementError: false,
            bShowShootingError: true,
            firingErrorScale: 1,
            lineLength: 5,
            lineOffset: 0,
            lineThickness: 1,
            movementErrorScale: 1,
            opacity: 1,
        },
        outerLines: {
            bShowLines: false,
            bShowMinError: true,
            bShowMovementError: true,
            bShowShootingError: true,
            firingErrorScale: 1,
            lineLength: 2,
            lineOffset: 10,
            lineThickness: 2,
            movementErrorScale: 1,
            opacity: 0.3499999940395355,
        },
        outlineColor: {
            a: 255,
            b: 0,
            g: 0,
            r: 0,
        },
        outlineOpacity: 1,
        outlineThickness: 1,
    },
};

const valorant = new Valorant(mockedHttpService);

afterEach(() => {
    mockedHttpService.fetch.mockClear();
});

test("should return info about valorant process running", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedValorantProcessResponse);

    const data = await valorant.process();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith("/product-session/v1/external-sessions", "local");

    expect(data).toEqual(mockedValorantProcessResponse);
});

test("should return client settings", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedClientSettings);

    const data = await valorant.clientSettings();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(
        "/player-preferences/v1/data-json/Ares.PlayerSettings",
        "local",
    );

    expect(data).toEqual(mockedClientSettings);
});

test("should return crosshair profiles", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedClientSettings);

    const data = await valorant.crossHair();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(
        "/player-preferences/v1/data-json/Ares.PlayerSettings",
        "local",
    );

    expect(data).toEqual(mockedCrossHairProfiles);
});

test("should update client settings", async () => {
    const resolvedValue = {
        data: "format",
        type: "Ares.PlayerSettings",
        modified: 1642758359892,
    };

    mockedHttpService.fetch.mockResolvedValueOnce(mockedClientSettings);
    mockedHttpService.put.mockResolvedValueOnce(resolvedValue);

    const { data: actualSettings } = await valorant.clientSettings();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(
        "/player-preferences/v1/data-json/Ares.PlayerSettings",
        "local",
    );

    const newSettings = {
        ...actualSettings,
        floatSettings: actualSettings.floatSettings.map((setting) =>
            setting.settingEnum.includes("MouseSensitivity") ? { ...setting, value: 0.5 } : setting,
        ),
    };

    const data = await valorant.changeSettings(newSettings);

    expect(mockedHttpService.put).toHaveBeenCalledTimes(1);
    expect(mockedHttpService.put).toHaveBeenCalledWith(
        "/player-preferences/v1/data-json/Ares.PlayerSettings",
        "local",
        newSettings,
    );

    expect(data).toEqual(resolvedValue);
});
