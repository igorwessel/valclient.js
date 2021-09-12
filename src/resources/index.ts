import {
    AgentMappedByDisplayName,
    Agents,
    CustomGameMapsName,
    CustomGameModes,
    GameModes,
    Locale,
    Maps,
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

// export const agentsMappedByRegion: Record<Locale, AgentMappedByDisplayName> = {
//     "pt-BR": {
//         Breach: "Breach",
//         Raze: "Raze",
//         "KAY/O": "KAY/O",
//         Skye: "Skye",
//         Cypher: "Cypher",
//         Sova: "Sova",
//         Killjoy: "Killjoy",
//         Viper: "Viper",
//         Phoenix: "Phoenix",
//         Astra: "Astra",
//         Brimstone: "Brimstone",
//         Yoru: "Yoru",
//         Sage: "Sage",
//         Reyna: "Reyna",
//         Omen: "Omen",
//         Jett: "Jett",
//     },
// };

export const agentsMappedById: Record<Agents, string> = {
    Breach: "5f8d3a7f-467b-97f3-062c-13acf203c006",
    Raze: "f94c3b30-42be-e959-889c-5aa313dba261",
    "KAY/O": "601dbbe7-43ce-be57-2a40-4abd24953621",
    Skye: "6f2a04ca-43e0-be17-7f36-b3908627744d",
    Cypher: "117ed9e3-49f3-6512-3ccf-0cada7e3823b",
    Sova: "ded3520f-4264-bfed-162d-b080e2abccf9",
    Killjoy: "1e58de9c-4950-5125-93e9-a0aee9f98746",
    Viper: "707eab51-4836-f488-046a-cda6bf494859",
    Phoenix: "eb93336a-449b-9c1b-0a54-a891f7921d69",
    Astra: "41fb69c1-4189-7b37-f117-bcaf1e96f1bf",
    Brimstone: "9f0d8ba9-4140-b941-57d3-a7ad57c6b417",
    Yoru: "7f94d92c-4234-0a36-9646-3a87eb8b5c89",
    Sage: "569fdd95-4d10-43ab-ca70-79becc718b46",
    Reyna: "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc",
    Omen: "8e253930-4c05-31dd-1b6c-968525494517",
    Jett: "add6443a-41bd-e414-f6ad-e58d267f4e95",
};

export type WalletCurrencies = "valorant_points" | "radianite_points" | "unknown";

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
