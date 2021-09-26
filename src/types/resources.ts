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

export type Agents =
    | "Breach"
    | "Raze"
    | "KAY/O"
    | "Skye"
    | "Cypher"
    | "Sova"
    | "Killjoy"
    | "Viper"
    | "Phoenix"
    | "Astra"
    | "Brimstone"
    | "Yoru"
    | "Sage"
    | "Reyna"
    | "Omen"
    | "Jett";

export type AgentMappedByDisplayName = {
    [K in Agents]: string;
};

export type Locale =
    | "ar-AE"
    | "de-DE"
    | "en-US"
    | "es-ES"
    | "es-MX"
    | "fr-FR"
    | "id-ID"
    | "it-IT"
    | "ja-JP"
    | "ko-KR"
    | "pl-PL"
    | "pt-BR"
    | "ru-RU"
    | "th-TH"
    | "tr-TR"
    | "vi-VN"
    | "zh-CN"
    | "zh-TW";

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
