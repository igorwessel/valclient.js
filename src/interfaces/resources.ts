export interface ShardRegionOverride {
    pbe: string;
}

export interface RegionShardOverride {
    latam: string;
    br: string;
}

export type Regions = "na" | "eu" | "latam" | "br" | "ap" | "kr" | "pbe";

export type Queues =
    | "competitive"
    | "custom"
    | "deathmatch"
    | "ggteam"
    | "snowball"
    | "spikerush"
    | "unrated"
    | "onefa"
    | "null";
