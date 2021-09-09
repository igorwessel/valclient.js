import {
    CustomGameModeMapped,
    CustomMappedMaps,
    Queues,
    Regions,
    RegionShardOverride,
    ShardRegionOverride,
} from "@interfaces/resources";

export const queues: Array<Queues> = [
    "competitive",
    "deathmatch",
    "ggteam",
    "snowball",
    "spikerush",
    "unrated",
    "onefa",
    "null",
];

export const customValorantMaps: CustomMappedMaps = {
    Breeze: "Foxtrot/Foxtrot",
    Icebox: "Port/Port",
    Heaven: "Triad/Triad",
    Ascent: "Ascent/Ascent",
    Bind: "Bonsai/Bonsai",
    Fracture: "Canyon/Canyon",
    Split: "Duality/Duality",
};

export const customGameModes: CustomGameModeMapped = {
    Bomb: "Bomb/BombGameMode.BombGameMode_C",
    Deathmatch: "Deathmatch/DeathmatchGameMode.DeathmatchGameMode_C",
    OneForAll: "OneForAll/OneForAllGameMode.OneForAllGameMode_C",
    QuickBomb: "QuickBomb/QuickBombGameMode.QuickBombGameMode_C",
};

export const regions: Array<Regions> = ["na", "eu", "latam", "br", "ap", "kr", "pbe"];

export const regionShardOverride: RegionShardOverride = {
    latam: "na",
    br: "na",
};

export const shardRegionOverride: ShardRegionOverride = {
    pbe: "na",
};
