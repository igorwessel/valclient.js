enum Queues {
    competitive,
    custom,
    deathmatch,
    ggteam,
    snowball,
    spikerush,
    unrated,
    onefa,
    null,
}

export type QueuesString = keyof typeof Queues;

export const queues: Array<QueuesString> = [
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

export enum Regions {
    na,
    eu,
    latam,
    br,
    ap,
    kr,
    pbe,
}

export type RegionsString = keyof typeof Regions;

export const regions: Array<RegionsString> = ["na", "eu", "latam", "br", "ap", "kr", "pbe"];

interface RegionShardOverride {
    latam: string;
    br: string;
}

export const regionShardOverride: RegionShardOverride = {
    latam: "na",
    br: "na",
};

interface ShardRegionOverride {
    pbe: string;
}

export const shardRegionOverride: ShardRegionOverride = {
    pbe: "na",
};
