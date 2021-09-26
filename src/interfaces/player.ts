import { Base64 } from "@type/utils";
import { Queues } from "@type/resources";

export interface IPlayer {
    current: () => Promise<CurrentPlayerResponse>;
    allFriends(): Promise<Friend[]>;
    session(): Promise<RNETFetchChatSession>;
    onlineFriend(puuid?: string): Promise<PresencePrivate | null>;
    allFriendsOnline(): Promise<Presence[]>;
    pendingFriendsRequests(): Promise<PendingFriendRequest[]>;
}

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
    private: Base64;
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

export interface FriendPrivate {
    isValid: boolean;
    sessionLoopState: string;
    partyOwnerSessionLoopState: string;
    customGameName: string;
    customGameTeam: string;
    partyOwnerMatchMap: string;
    partyOwnerMatchCurrentTeam: string;
    partyOwnerMatchScoreAllyTeam: number;
    partyOwnerMatchScoreEnemyTeam: number;
    partyOwnerProvisioningFlow: string;
    provisioningFlow: string;
    matchMap: string;
    partyId: string;
    isPartyOwner: boolean;
    partyState: string;
    partyAccessibility: string;
    maxPartySize: number;
    queueId: Queues;
    partyLFM: boolean;
    partyClientVersion: string;
    partySize: number;
    tournamentId: string;
    rosterId: string;
    partyVersion: number;
    queueEntryTime: string;
    playerCardId: string;
    playerTitleId: string;
    preferredLevelBorderId: string;
    accountLevel: number;
    competitiveTier: number;
    leaderboardPosition: number;
    isIdle: boolean;
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
export interface PresenceResponse {
    presences: Presence[];
}

export interface CurrentPlayerResponse {
    active: boolean;
    created_datetime: number;
    game_name: string;
    summoner: boolean;
    tag_line: string;
}

export interface Friend {
    displayGroup: string;
    game_name: string;
    game_tag: string;
    group: string;
    last_online_ts: number | null;
    name: string;
    note: string;
    pid: string;
    puuid: string;
    region: string;
}
export interface FriendsResponse {
    friends: Friend[];
}

export interface PendingFriendRequest {
    game_name: string;
    game_tag: string;
    name: string;
    note: string;
    pid: string;
    puuid: string;
    region: string;
    subscription: string;
}

export interface PendingFriendsResponse {
    requests: PendingFriendRequest[];
}
