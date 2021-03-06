import { PrivateInformationJSON64 } from "@errors/privateInformationJSON64";

import {
    CurrentPlayerResponse,
    Friend,
    FriendsResponse,
    IPlayer,
    PendingFriendRequest,
    PendingFriendsResponse,
    Presence,
    PresencePrivate,
    PresenceResponse,
    RNETFetchChatSession,
} from "@interfaces/player";

import { IHttp } from "@interfaces/http";

class Player implements IPlayer {
    private readonly _puuid: string;
    private readonly _http: IHttp;

    constructor(httpService: IHttp, puuid: string) {
        this._http = httpService;
        this._puuid = puuid;
    }

    /**
     *  PlayerAlias_RNet_GetActiveAlias
     *
     *  Gets current player session authenticated
     * @returns
     */
    async current(): Promise<CurrentPlayerResponse> {
        const data = await this._http.fetch<CurrentPlayerResponse>("/player-account/aliases/v1/active", "local");

        return data;
    }

    /**
     * CHATFRIENDS_RNet_GET_ALL
     *
     * Get a list of friends
     * @returns
     */
    async allFriends(): Promise<Friend[]> {
        const { friends } = await this._http.fetch<FriendsResponse>("/chat/v4/friends", "local");

        return friends;
    }

    /**
     * TEXT_CHAT_RNet_FetchSession
     *
     * Get the current session including player name and PUUID
     */
    async session(): Promise<RNETFetchChatSession> {
        const data = await this._http.fetch<RNETFetchChatSession>("/chat/v1/session", "local");

        return data;
    }

    /**
     * PRESENCE_RNet_GET
     *
     *  NOTE: Only works on self or active user's friends
     * @param puuid Use puuid passed in parameter or self puuid
     * @returns
     */
    async onlineFriend(puuid?: string): Promise<PresencePrivate | null> {
        try {
            const { presences } = await this._http.fetch<PresenceResponse>("/chat/v4/presences", "local");

            puuid = puuid || this._puuid;

            const player = presences.find((presence) => presence.puuid === puuid);

            if (player) {
                const playerPrivate = JSON.parse(Buffer.from(player.private, "base64").toString("utf-8"));

                return playerPrivate;
            }

            return null;
        } catch (e) {
            throw new PrivateInformationJSON64();
        }
    }

    /**
     * PRESENCE_RNet_GET_ALL
     *
     * Get a list of online friends and their activity
     * private is a base64-encoded JSON string that contains useful information such as party and in-progress game score.
     * If decode base64-encoded JSON, we have type FriendPrivate for JSON Object
     *
     * @type {FriendPrivate}
     * @returns
     */
    async allFriendsOnline(): Promise<Presence[]> {
        const { presences } = await this._http.fetch<PresenceResponse>("/chat/v4/presences", "local");

        return presences;
    }

    /**
     *  FRIENDS_RNet_FetchFriendRequests
     *
     *  Get pending friend requests
     * @returns
     */
    async pendingFriendsRequests(): Promise<PendingFriendRequest[]> {
        const { requests } = await this._http.fetch<PendingFriendsResponse>("/chat/v4/friendrequests", "local");

        return requests;
    }
}

export { Player };
