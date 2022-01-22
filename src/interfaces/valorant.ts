import { CrossHair } from "@interfaces/crosshair";
import { Locale } from "@type/resources";

export interface IValorant {
    process(): Promise<ValorantProcessResponse | Record<string, never>>;
    clientSettings(): Promise<ClientSettingsResponse>;
    changeSettings(data: ClientSettings): Promise<ClientSettingsResponse>;
    crossHair(): Promise<Record<string, CrossHair>>;
}

export interface ActionMap {
    alt: boolean;
    bindIndex: number;
    characterName: string;
    cmd: boolean;
    ctrl: boolean;
    key: string;
    name: string;
    shift: boolean;
}

export type SettingsEnumInt =
    | "EAresIntSettingName::VoiceVolume"
    | "EAresIntSettingName::ColorBlindMode"
    | "EAresIntSettingName::PlayerPerfShowFrameRate"
    | "EAresIntSettingName::PlayerPerfShowPacketLossPercentage";

export type SettingsEnumString =
    | "EAresStringSettingName::LastSeenSeasonalPopup"
    | "EAresStringSettingName::PushToTalkKey"
    | "EAresStringSettingName::TeamPushToTalkKey"
    | "EAresStringSettingName::CrosshairColor"
    | "EAresStringSettingName::CrosshairProfileName"
    | "EAresStringSettingName::SavedCrosshairProfileData";

export type SettingsEnumFloat =
    | "EAresFloatSettingName::MouseSensitivity"
    | "EAresFloatSettingName::MinimapSize"
    | "EAresFloatSettingName::OverallVolume"
    | "EAresFloatSettingName::MenuAndLobbyMusicVolume"
    | "EAresFloatSettingName::CharacterSelectMusicVolume"
    | "EAresFloatSettingName::CrosshairOutlineOpacity"
    | "EAresFloatSettingName::CrosshairCenterDotSize"
    | "EAresFloatSettingName::CrosshairCenterDotOpacity"
    | "EAresFloatSettingName::CrosshairInnerLinesLineThickness"
    | "EAresFloatSettingName::CrosshairInnerLinesLineLength"
    | "EAresFloatSettingName::CrosshairInnerLinesLineOffset"
    | "EAresFloatSettingName::CrosshairInnerLinesOpacity"
    | "EAresFloatSettingName::AimToolingRadialFrictionBaseSpeedMultiplierX";

export type SettingsEnumBool =
    | "EAresBoolSettingName::MinimapRotates"
    | "EAresBoolSettingName::MinimapTranslates"
    | "EAresBoolSettingName::PushToTalkEnabled"
    | "EAresBoolSettingName::FadeCrosshairWithFiringError"
    | "EAresBoolSettingName::ShowCorpses"
    | "EAresBoolSettingName::CrosshairHasOutline"
    | "EAresBoolSettingName::CrosshairInnerLinesShowShootingError"
    | "EAresBoolSettingName::CrosshairOuterLinesShowMovementError"
    | "EAresBoolSettingName::CrosshairOuterLinesShowShootingError"
    | "EAresBoolSettingName::CrosshairOuterLinesShowLines"
    | "EAresBoolSettingName::HasEverStartedAMatch"
    | "EAresBoolSettingName::HasAcceptedCodeOfConduct"
    | "EAresBoolSettingName::HasSeenNewPlayerSettings"
    | "EAresBoolSettingName::HasSeenSettingsTutorial"
    | "EAresBoolSettingName::HasSeenPhotoSensitivityWarning"
    | "EAresBoolSettingName::CollectionShowOwnedOnly"
    | "EAresBoolSettingName::PlayerBehavior_MuteEnemyTextChat"
    | "EAresBoolSettingName::HasEverAppliedRoamingSettings";

export type SettingsValue<SettingEnum, Value> = {
    settingEnum: SettingEnum;
    value: Value;
};
export interface ClientSettingsResponse {
    data: ClientSettings;
    modified: number;
    type: string;
}

export interface ClientSettings {
    actionMappings: ActionMap[];
    axisMapping: Record<string, unknown>[];
    floatSettings: SettingsValue<SettingsEnumFloat, number>[];
    intSettings: SettingsValue<SettingsEnumInt, number>[];
    boolSettings: SettingsValue<SettingsEnumBool, boolean>[];
    roamingSetttingsVersion: number;
    stringSettings: SettingsValue<SettingsEnumString, string>[];
    settingsProfiles: string[];
}

export interface ValorantProcessLaunchConfiguration {
    arguments: string[];
    executable: string;
    locale: Locale;
    voiceLocale: string | null;
    workingDirectory: string;
}
export interface ValorantProcessResponse {
    [key: string]: {
        exitCode: number;
        exitReason: string | null;
        isInternal: boolean | null;
        launchConfiguration: ValorantProcessLaunchConfiguration;
        patchlineFullName: string;
        patchlineId: string;
        phase: string;
        productId: string;
        version: string;
    };
}
