export interface ShardRegionOverride {
    pbe: string;
}

export interface RegionShardOverride {
    latam: string;
    br: string;
}

export type Regions = "na" | "eu" | "latam" | "br" | "ap" | "kr" | "pbe";

export type CustomGameMapsName =
    | "Foxtrot/Foxtrot"
    | "Port/Port"
    | "Triad/Triad"
    | "Ascent/Ascent"
    | "Bonsai/Bonsai"
    | "Canyon/Canyon"
    | "Duality/Duality";

export type CustomGameModes =
    | "Bomb/BombGameMode.BombGameMode_C"
    | "Deathmatch/DeathmatchGameMode.DeathmatchGameMode_C"
    | "OneForAll/OneForAllGameMode.OneForAllGameMode_C"
    | "QuickBomb/QuickBombGameMode.QuickBombGameMode_C";

export type Maps = "Breeze" | "Icebox" | "Heaven" | "Ascent" | "Bind" | "Fracture" | "Split";

export type GameModes = "Bomb" | "Deathmatch" | "OneForAll" | "QuickBomb";

export type CustomMappedMaps = {
    Breeze: "Foxtrot/Foxtrot";
    Icebox: "Port/Port";
    Heaven: "Triad/Triad";
    Ascent: "Ascent/Ascent";
    Bind: "Bonsai/Bonsai";
    Fracture: "Canyon/Canyon";
    Split: "Duality/Duality";
};

export type CustomGameModeMapped = {
    Bomb: "Bomb/BombGameMode.BombGameMode_C";
    Deathmatch: "Deathmatch/DeathmatchGameMode.DeathmatchGameMode_C";
    OneForAll: "OneForAll/OneForAllGameMode.OneForAllGameMode_C";
    QuickBomb: "QuickBomb/QuickBombGameMode.QuickBombGameMode_C";
};

export type Queues =
    | "competitive"
    | "deathmatch"
    | "ggteam"
    | "snowball"
    | "spikerush"
    | "unrated"
    | "onefa"
    | "newmap"
    | "null";
