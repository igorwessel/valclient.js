export interface EntitlementsTokenLocal {
    accessToken: string;
    entitlements: string[];
    issuer: string;
    subject: string;
    token: string;
}

export interface RNETFetchChatSession {
    federated: boolean;
    game_name: string;
    game_tag: string;
    loaded: boolean;
    name: string;
    pid: string;
    puuid: string;
    region: string;
    resource: string;
    state: string;
}

export interface Presence {
    actor: string | null;
    basic: string | null;
    details: string | null;
    game_name: string | null;
    game_tag: string | null;
    location: string | null;
    msg: string | null;
    name: string | null;
    patchline: null;
    pid: string | null;
    platform: null;
    private: PresencePrivate;
    privateJwt: null;
    product: string | null;
    puuid: string | null;
    region: string | null;
    resource: string | null;
    state: string | null;
    summary: string | null;
    time: number | null;
}

export interface PresencePrivate {
    championId: string | null;
    companionId: string | null;
    gameId: string | null;
    gameMode: string | null;
    gameQueueType: string | null;
    gameStatus: string | null;
    iconOverride: string | null;
    isObservable: string | null;
    level: string | null;
    mapId: string | null;
    masteryScore: string | null;
    profileIcon: string | null;
    pty: PresencePrivateParty;
    puuid: string | null;
    queueId: string | null;
    rankedLeagueDivision: string | null;
    rankedLeagueQueue: string | null;
    rankedLeagueTier: string | null;
    rankedLosses: string | null;
    rankedSplitRewardLevel: string | null;
    rankedWins: string | null;
    regalia: PresencePrivateRegalia;
    skinVariant: string | null;
    skinname: string | null;
    timeStamp: string | null;
}

export interface PresencePrivateParty {
    partyId: string | null;
    queueId: number | null;
    summoners: number[];
}
export interface PresencePrivateRegalia {
    bannerType: number;
    crestType: number;
}
export interface FetchPresence {
    presences: Presence[];
}
