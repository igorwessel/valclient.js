import { Delete, Fetch, Post } from "@interfaces/http";

import {
    CurrentAvailableGameModeResponse,
    CurrentGroupIdResponse,
    CustomGameSettings,
    CustomGameSettingsInput,
    GLZEndpointTokenResponse,
    GroupDetails,
} from "@interfaces/glzEndpointResponses";
import { State } from "@interfaces/helpers";
import { Queues } from "@interfaces/resources";

import { customGameModeMapped, customMappedMaps } from "@resources";

class Group {
    private readonly _fetch: Fetch;
    private readonly _post: Post;
    private readonly _delete: Delete;
    private readonly _puuid: string;

    constructor(fetch: Fetch, post: Post, deleteFunction: Delete, puuid: string) {
        this._fetch = fetch;
        this._post = post;
        this._delete = deleteFunction;
        this._puuid = puuid;
    }

    /**
     *  Party_FetchPlayer
     *
     *  Get the Group ID that a given player belongs to
     */
    async current(): Promise<CurrentGroupIdResponse> {
        const data = await this._fetch<CurrentGroupIdResponse>(`/parties/v1/players/${this._puuid}`, "glz");

        return data;
    }

    /**
     *  Party_RemovePlayer
     *
     *  Removes a player from the current group
     * @param puuid
     * @returns
     */
    async removePlayer(puuid?: string): Promise<boolean> {
        puuid = puuid || this._puuid;

        await this._delete(`/parties/v1/players/${puuid}`, "glz");

        return true;
    }

    /**
     *  Party_FetchParty
     *
     *  Get details about a group party id
     */
    async currentDetails(): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.current();

        const data = await this._fetch<GroupDetails>(`/parties/v1/parties/${CurrentPartyID}`, "glz");

        return data;
    }

    /**
     *  Party_SetMemberReady
     *
     *  Sets whether a party member is ready for queueing or not
     * @param ready
     * @returns
     */
    async setMemberReady(ready?: boolean): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.current();

        const data = await this._post<GroupDetails>(
            `/parties/v1/parties/${CurrentPartyID}/members/${this._puuid}/setReady`,
            "glz",
            {
                ready,
            },
        );

        return data;
    }

    /**
     *  Party_RefreshCompetitiveTier
     *
     *  Refreshes the competitive tier for a player
     */
    async refreshCompetitiveTier(): Promise<boolean> {
        const { CurrentPartyID } = await this.current();

        await this._post(`/parties/v1/parties/${CurrentPartyID}/members/${this._puuid}/refreshCompetitiveTier`, "glz");

        return true;
    }

    /**
     *  Party_RefreshPlayerIdentity
     *
     *  Refreshes the identity for a player
     */
    async refreshPlayerIdentity(): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.current();

        const data = await this._post<GroupDetails>(
            `/parties/v1/parties/${CurrentPartyID}/members/${this._puuid}/refreshPlayerIdentity`,
            "glz",
        );

        return data;
    }

    /**
     *  Party_RefreshPings
     *
     *  Refreshes the pings for a player
     */
    async refreshPlayerPings(): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.current();

        const data = await this._post<GroupDetails>(
            `/parties/v1/parties/${CurrentPartyID}/members/${this._puuid}/refreshPings`,
            "glz",
        );

        return data;
    }

    /**
     *  Party_ChangeQueue
     *
     *  Sets the matchmaking queue for the party
     * @param queueID
     * @returns
     */
    async changeQueue(queueID: Queues): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.current();

        const data = await this._post<GroupDetails>(`/parties/v1/parties/${CurrentPartyID}/queue`, "glz", {
            queueID,
        });

        return data;
    }

    /**
     *  Party_StartCustomGame
     *
     *  Starts a custom game
     */
    async startCustomGame(): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.current();

        const data = await this._post<GroupDetails>(`/parties/v1/parties/${CurrentPartyID}/startcustomgame`, "glz");

        return data;
    }

    /**
     *  Party_EnterMatchmakingQueue
     *
     *  Enters the matchmaking queue
     */
    async enterMatchmakingQueue(): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.current();

        const data = await this._post<GroupDetails>(`/parties/v1/parties/${CurrentPartyID}/matchmaking/join`, "glz");

        return data;
    }

    /**
     *  Party_LeaveMatchmakingQueue
     *
     *  Leaves the matchmaking queue
     */
    async leaveMatchmakingQueue(): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.current();

        const data = await this._post<GroupDetails>(`/parties/v1/parties/${CurrentPartyID}/matchmaking/leave`, "glz");

        return data;
    }

    /**
     *  Party_SetAccessibility
     *
     *  Changes the group state to be open or closed
     */
    async changeState(open?: State): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.current();

        const data = await this._post<GroupDetails>(`/parties/v1/parties/${CurrentPartyID}/accessibility`, "glz", {
            accessibility: open,
        });

        return data;
    }

    /**
     *  Party_SetCustomGameSettings
     *
     *  Changes the settings for a custom game
     * @param settings
     */
    async setCustomGameSettings({ Map, Mode, GamePod, GameRules }: CustomGameSettingsInput): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.current();

        const body: Partial<CustomGameSettings> = {
            Map: `/Game/Maps/${customMappedMaps[Map]}`,
            Mode: `/Game/GameModes/${customGameModeMapped[Mode]}`,
            GamePod: GamePod || "aresriot.aws-rclusterprod-sae1-1.br-gp-saopaulo-1",
            GameRules: GameRules || null,
        };

        const data = await this._post<GroupDetails>(
            `/parties/v1/parties/${CurrentPartyID}/customgamesettings`,
            "glz",
            body,
        );

        return data;
    }

    /**
     *
     *  Party_InviteToPartyByDisplayName
     *
     *  Invites a player to the party with their display name
     *  omit the "#" in tag
     * @param name
     * @param tag
     */
    async inviteByDisplayName(name: string, tag: string): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.current();

        const data = await this._post<GroupDetails>(
            `/parties/v1/parties/${CurrentPartyID}/invites/name/${name}/tag/${tag}`,
            "glz",
            {
                name,
                tag,
            },
        );

        return data;
    }

    /**
     *  Party_RequestToJoinParty
     *
     *  Requests to join a party
     * @param party_id
     * @param puuid
     */
    async requestJoinToGroup(party_id: string, puuid: string): Promise<GroupDetails> {
        const body: { Subjects: string[] } = {
            Subjects: [puuid],
        };

        const data = await this._post<GroupDetails>(`/parties/v1/parties/${party_id}/request`, "glz", body);

        return data;
    }

    /**
     * Party_DeclineRequest
     *
     * Declines a party request
     * @param request_id The ID of the party request. Can be found from the Requests array on the getCurrentDetailsGroup.
     */
    async declineRequestGroup(request_id: string): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.current();

        const data = await this._post<GroupDetails>(
            `/parties/v1/parties/${CurrentPartyID}/request/${request_id}/decline`,
            "glz",
        ); //TODO: not sure about this return for data, need to test when have requests group to accept

        return data;
    }

    /**
     * Party_PlayerJoin
     *
     * Join a group
     * @param party_id
     */
    async joinGroup(party_id: string): Promise<GroupDetails> {
        const data = await this._post<GroupDetails>(`/parties/v1/players/${this._puuid}/joinparty/${party_id}`, "glz"); //TODO: not sure about this return for data, need to test when have requests group to accept

        return data;
    }

    /**
     * Party_PlayerLeave
     *
     * Leave a party
     * @param party_id
     */
    async leaveGroup(party_id: string): Promise<GroupDetails> {
        const data = await this._post<GroupDetails>(`/parties/v1/players/${this._puuid}/leaveparty/${party_id}`, "glz"); //TODO: not sure about this return for data, need to test when have requests group to accept

        return data;
    }

    /**
     * Party_FetchCustomGameConfigs
     *
     * Get information about the available gamemodes
     */
    async currentAvailableGameModes(): Promise<CurrentAvailableGameModeResponse> {
        const data = await this._fetch<CurrentAvailableGameModeResponse>(
            "/parties/v1/parties/customgameconfigs",
            "glz",
        );

        return data;
    }

    /**
     * Party_FetchMUCToken
     *
     * Get a token for party chat
     */
    async getGroupMUCToken(): Promise<GLZEndpointTokenResponse> {
        const { CurrentPartyID } = await this.current();

        const data = await this._fetch<GLZEndpointTokenResponse>(
            `/parties/v1/parties/${CurrentPartyID}/muctoken`,
            "glz",
        );

        return data;
    }

    /**
     * Party_FetchVoiceToken
     *
     * Get a token for party voice
     */
    async getGroupVoiceToken(): Promise<GLZEndpointTokenResponse> {
        const { CurrentPartyID } = await this.current();

        const data = await this._fetch<GLZEndpointTokenResponse>(
            `/parties/v1/parties/${CurrentPartyID}/voicetoken`,
            "glz",
        );

        return data;
    }
}

export { Group };
