export interface ValorantSkinLevel {
    uuid: string;
    displayName: string;
    displayIcon: string;
    fullRender: string;
    swatch: string;
    streamedVideo: string | null;
    assetPath: string;
}
export interface ValorantSkin {
    uuid: string;
    displayName: string;
    themeUuid: string;
    contentTierUuid: string;
    displayIcon: string;
    wallpaper: string | null;
    assetPath: string;
    chromas: ValorantSkinLevel[];
    levels: ValorantSkinLevel[];
}

export interface ValorantSkinBuddyLevel {
    uuid: string;
    charmLevel: number;
    displayName: string;
    displayIcon: string;
    assetPath: string;
}

export interface ValorantSkinBuddy {
    uuid: string;
    displayName: string;
    isHiddenIfNotOwned: boolean;
    themeUuid: string;
    displayIcon: string;
    assetPath: string;
    levels: ValorantSkinBuddyLevel[];
}
export interface ValorantSkinsResponse {
    status: number;
    data: ValorantSkin[];
}

export interface ValorantSkinsBuddyResponse {
    status: number;
    data: ValorantSkinBuddy[];
}
