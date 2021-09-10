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
    | "OneForAll/OneForAll_GameMode.OneForAll_GameMode_C"
    | "QuickBomb/QuickBombGameMode.QuickBombGameMode_C";

export type Maps = "Breeze" | "Icebox" | "Heaven" | "Ascent" | "Bind" | "Fracture" | "Split";

export type GameModes = "Bomb" | "Deathmatch" | "OneForAll" | "QuickBomb";

export type RiotServers = "aresriot.aws-rclusterprod-sae1-1.br-gp-saopaulo-1"; //TODO: need to include more servers

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
