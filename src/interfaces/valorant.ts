import { CrossHairProfileData } from "@interfaces/crosshair";
import { Locale } from "@interfaces/resources";

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
    | "EAresFloatSettingName::CrosshairInnerLinesLineThickness"
    | "EAresFloatSettingName::CrosshairInnerLinesLineLength"
    | "EAresFloatSettingName::CrosshairInnerLinesLineOffset"
    | "EAresFloatSettingName::CrosshairOuterLinesOpacity";

export type SettingsEnumBool =
    | "EAresBoolSettingName::MinimapTranslates"
    | "EAresBoolSettingName::PushToTalkEnabled"
    | "EAresBoolSettingName::ShootingRangeBotArmorEnabled"
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

export interface SettingsNumber {
    settingEnum: string;
    value: number;
}

export interface SettingsString {
    settingEnum: SettingsEnumString;
    value: string;
}

export interface ClientSettingsResponse {
    data: {
        actionMappings: ActionMap[];
        axisMapping: Record<string, unknown>[];
        floatSettings: SettingsNumber[];
        intSettings: SettingsNumber[];
        roamingSetttingsVersion: number;
        stringSettings: SettingsString[];
    };
    modified: number;
    type: string;
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
