import { GunsType, Levels, SkinsType, SprayRounds } from "@type/loadout";
import { VariantSkin } from "@type/chroma";
import { BuddyType } from "@type/buddies";
import { SprayType } from "@type/sprays";

export interface ILoadout {
    current(): Promise<LoadoutResponse>;
    changeGunSkin<T extends GunsType, K extends SkinsType<T>, V extends VariantSkin<K>>(
        weapon: T,
        skins: K,
        level: Levels,
        variant: V,
    ): Promise<LoadoutResponse>;
    addSkinBuddy(gun: Exclude<GunsType, "Knife">, buddy: BuddyType): Promise<LoadoutResponse>;
    changeSpray(spray: SprayType, slot: SprayRounds): Promise<LoadoutResponse>;
}

export interface LoadoutGun {
    ID: string;
    SkinID: string;
    SkinLevelID: string;
    ChromaID: string;
    CharmInstanceID?: string;
    CharmID?: string;
    CharmLevelID?: string;
    Attachments: unknown[];
}

export interface LoadoutSpray {
    EquipSlotID: string;
    SprayID: string;
    SprayLevelID: unknown | null;
}

export interface LoadoutIdentity {
    PlayerCardID: string;
    PlayerTitleID: string;
    AccountLevel: number;
    PreferredLevelBorderID: string;
    HideAccountLevel: boolean;
}

export interface LoadoutResponse {
    Subject: string;
    Version: number;
    Guns: LoadoutGun[];
    Sprays: LoadoutSpray[];
    Identity: LoadoutIdentity;
    Incognito: boolean;
}
