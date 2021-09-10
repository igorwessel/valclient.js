import { Base64, Locale } from "@interfaces/helpers";
import { CrossHairProfileData } from "@interfaces/crosshair";
import { Queues } from "@interfaces/resources";

export interface EntitlementsTokenLocal {
    accessToken: string;
    entitlements: string[];
    issuer: string;
    subject: string;
    token: string;
}

export interface RNETFetchChatSession {
    federated: boolean;
    game_name: string;
    game_tag: string;
    loaded: boolean;
    name: string;
    pid: string;
    puuid: string;
    region: string;
    resource: string;
    state: string;
}

export interface Presence {
    actor: string | null;
    basic: string | null;
    details: string | null;
    game_name: string | null;
    game_tag: string | null;
    location: string | null;
    msg: string | null;
    name: string | null;
    patchline: null;
    pid: string | null;
    platform: null;
    private: Base64;
    privateJwt: null;
    product: string | null;
    puuid: string | null;
    region: string | null;
    resource: string | null;
    state: string | null;
    summary: string | null;
    time: number | null;
}

export interface PresencePrivate {
    championId: string | null;
    companionId: string | null;
    gameId: string | null;
    gameMode: string | null;
    gameQueueType: string | null;
    gameStatus: string | null;
    iconOverride: string | null;
    isObservable: string | null;
    level: string | null;
    mapId: string | null;
    masteryScore: string | null;
    profileIcon: string | null;
    pty: PresencePrivateParty;
    puuid: string | null;
    queueId: string | null;
    rankedLeagueDivision: string | null;
    rankedLeagueQueue: string | null;
    rankedLeagueTier: string | null;
    rankedLosses: string | null;
    rankedSplitRewardLevel: string | null;
    rankedWins: string | null;
    regalia: PresencePrivateRegalia;
    skinVariant: string | null;
    skinname: string | null;
    timeStamp: string | null;
}

export interface FriendPrivate {
    isValid: boolean;
    sessionLoopState: string;
    partyOwnerSessionLoopState: string;
    customGameName: string;
    customGameTeam: string;
    partyOwnerMatchMap: string;
    partyOwnerMatchCurrentTeam: string;
    partyOwnerMatchScoreAllyTeam: number;
    partyOwnerMatchScoreEnemyTeam: number;
    partyOwnerProvisioningFlow: string;
    provisioningFlow: string;
    matchMap: string;
    partyId: string;
    isPartyOwner: boolean;
    partyState: string;
    partyAccessibility: string;
    maxPartySize: number;
    queueId: Queues;
    partyLFM: boolean;
    partyClientVersion: string;
    partySize: number;
    tournamentId: string;
    rosterId: string;
    partyVersion: number;
    queueEntryTime: string;
    playerCardId: string;
    playerTitleId: string;
    preferredLevelBorderId: string;
    accountLevel: number;
    competitiveTier: number;
    leaderboardPosition: number;
    isIdle: boolean;
}

export interface PresencePrivateParty {
    partyId: string | null;
    queueId: number | null;
    summoners: number[];
}
export interface PresencePrivateRegalia {
    bannerType: number;
    crestType: number;
}
export interface PresenceResponse {
    presences: Presence[];
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

export interface CurrentPlayerResponse {
    active: boolean;
    created_datetime: number;
    game_name: string;
    summoner: boolean;
    tag_line: string;
}

export interface Friend {
    displayGroup: string;
    game_name: string;
    game_tag: string;
    group: string;
    last_online_ts: number | null;
    name: string;
    note: string;
    pid: string;
    puuid: string;
    region: string;
}
export interface FriendsResponse {
    friends: Friend[];
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
    settingsEnum: string;
    value: number;
}

export interface SettingsString {
    settingsEnum: SettingsEnumString;
    value: string | CrossHairProfileData;
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

export interface PendingFriendRequest {
    game_name: string;
    game_tag: string;
    name: string;
    note: string;
    pid: string;
    puuid: string;
    region: string;
    subscription: string;
}

export interface PendingFriendsResponse {
    requests: PendingFriendRequest[];
}
