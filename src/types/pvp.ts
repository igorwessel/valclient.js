import { PvpItemProgressDefinitionsItem, PvpSeasonsItem } from "@interfaces/pvp";

export type PvpCompetitiveSeason = Pick<PvpSeasonsItem, "ID" | "StartTime" | "EndTime" | "DevelopmentOnly"> & {
    SeasonID: string;
};

export type PvpEventItem = Pick<
    PvpSeasonsItem,
    "ID" | "Name" | "StartTime" | "EndTime" | "IsEnabled" | "IsActive" | "DevelopmentOnly"
>;

export type PvpItemProgressDefinitionsRewards = PvpItemProgressDefinitionsItem & { Amount: number };
