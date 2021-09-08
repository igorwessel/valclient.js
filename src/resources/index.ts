import { Queues, Regions, RegionShardOverride, ShardRegionOverride } from "@interfaces/resources";

export const queues: Array<Queues> = [
    "competitive",
    "custom",
    "deathmatch",
    "ggteam",
    "snowball",
    "spikerush",
    "unrated",
    "onefa",
    "null",
];

export const regions: Array<Regions> = ["na", "eu", "latam", "br", "ap", "kr", "pbe"];

export const regionShardOverride: RegionShardOverride = {
    latam: "na",
    br: "na",
};

export const shardRegionOverride: ShardRegionOverride = {
    pbe: "na",
};
