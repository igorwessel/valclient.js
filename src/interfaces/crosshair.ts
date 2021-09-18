export interface CrossHairColor {
    b: number;
    g: number;
    r: number;
    a: number;
}

export interface CrossHairLine {
    lineThickness: number;
    lineLength: number;
    lineOffset: number;
    bShowMovementError: boolean;
    bShowShootingError: boolean;
    bShowMinError: boolean;
    opacity: number;
    bShowLines: boolean;
    firingErrorScale: number;
    movementErrorScale: number;
}

export interface CrossHair {
    color: CrossHairColor;
    bHasOutline: boolean;
    outlineThickness: number;
    outlineColor: CrossHairColor;
    outlineOpacity: number;
    centerDotSize: number;
    centerDotOpacity: number;
    bDisplayCenterDot: boolean;
    bFixMinErrorAcrossWeapons: boolean;
    innerLines: CrossHairLine;
    outerLines: CrossHairLine;
}

export interface CrossHairSniper {
    centerDotColor: CrossHairColor;
    centerDotSize: number;
    centerDotOpacity: number;
    bDisplayCenterDot: boolean;
}

export interface CrossHairProfile {
    primary: CrossHair;
    aDS: CrossHair;
    sniper: CrossHairSniper;
    bUsePrimaryCrosshairForADS: boolean;
    bUseCustomCrosshairOnAllPrimary: boolean;
    bUseAdvancedOptions: boolean;
    profileName: string;
}

export interface CrossHairProfileData {
    currentProfile: number;
    profiles: CrossHairProfile[];
}
