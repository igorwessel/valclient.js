import { RegionShardOverride, ShardRegionOverride } from "@interfaces/resources";
import { SprayRounds } from "@type/loadout";

import { CustomGameMapsName, CustomGameModes, GameModes, Maps, Queues, Regions } from "@type/resources";

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

export const customMappedMaps: Record<Maps, CustomGameMapsName> = {
    Breeze: "Foxtrot/Foxtrot",
    Icebox: "Port/Port",
    Heaven: "Triad/Triad",
    Ascent: "Ascent/Ascent",
    Bind: "Bonsai/Bonsai",
    Fracture: "Canyon/Canyon",
    Split: "Duality/Duality",
};

export const customGameModeMapped: Record<GameModes, CustomGameModes> = {
    Bomb: "Bomb/BombGameMode.BombGameMode_C",
    Deathmatch: "Deathmatch/DeathmatchGameMode.DeathmatchGameMode_C",
    OneForAll: "OneForAll/OneForAll_GameMode.OneForAll_GameMode_C",
    QuickBomb: "QuickBomb/QuickBombGameMode.QuickBombGameMode_C",
};

export type WalletCurrencies = "valorant_points" | "radianite_points" | "unknown";

export type ItemsType =
    | "skin_level"
    | "skin_chroma"
    | "agent"
    | "contract_definition"
    | "buddy"
    | "spray"
    | "player_card"
    | "player_title";

export const itemsMappedByName: Record<ItemsType, string> = {
    skin_level: "e7c63390-eda7-46e0-bb7a-a6abdacd2433",
    skin_chroma: "3ad1b2b2-acdb-4524-852f-954a76ddae0a",
    agent: "01bb38e1-da47-4e6a-9b3d-945fe4655707",
    contract_definition: "f85cb6f7-33e5-4dc8-b609-ec7212301948",
    buddy: "dd3bf334-87f3-40bd-b043-682a57a8dc3a",
    spray: "d5f120f8-ff8c-4aac-92ea-f2b5acbe9475",
    player_card: "3f296c07-64c3-494c-923b-fe692a4fa1bd",
    player_title: "de7caa6b-adf7-4588-bbd1-143831e786c6",
};

export const sprayRoundsIdMappedByName: Record<SprayRounds, string> = {
    PreRound: "0814b2fe-4512-60a4-5288-1fbdcec6ca48",
    MiddleRound: "04af080a-4071-487b-61c0-5b9c0cfaac74",
    EndRound: "5863985e-43ac-b05d-cb2d-139e72970014",
};

export const walletMappedByID: Record<string, WalletCurrencies> = {
    "85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741": "valorant_points",
    "e59aa87c-4cbf-517a-5983-6e81511be9b7": "radianite_points",
    "f08d4ae3-939c-4576-ab26-09ce1f23bb37": "unknown",
};

export const regions: Array<Regions> = ["na", "eu", "latam", "br", "ap", "kr", "pbe"];

export const regionShardOverride: RegionShardOverride = {
    latam: "na",
    br: "na",
};

export const shardRegionOverride: ShardRegionOverride = {
    pbe: "na",
};
