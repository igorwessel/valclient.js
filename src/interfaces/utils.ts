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
export interface ValorantSkinsResponse {
    status: number;
    data: ValorantSkin[];
}
