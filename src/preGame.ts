import {
    CoreGameResponse,
    GLZEndpointTokenResponse,
    PreGameDetailsResponse,
    PreGameLoadout,
} from "@interfaces/glzEndpointResponses";

import { Fetch, Post } from "@interfaces/http";

import { Agents } from "@interfaces/resources";

import { agentsMappedById } from "@resources";

class PreGame {
    private readonly _fetch: Fetch;
    private readonly _post: Post;
    private readonly _puuid: string;

    constructor(fetch: Fetch, post: Post, puuid: string) {
        this._fetch = fetch;
        this._post = post;
        this._puuid = puuid;
    }

    /**
     * Pregame_GetPlayer
     *
     * Get the ID of a game in the pre-game stage
     */
    async current(): Promise<CoreGameResponse> {
        const data = await this._fetch<CoreGameResponse>(`/pregame/v1/players/${this._puuid}`, "glz");

        return data;
    }

    /**
     * Pregame_GetMatch
     *
     * Get info for a game in the pre-game stage
     * @param match_id
     * @returns
     */
    async details(match_id?: string): Promise<PreGameDetailsResponse> {
        const { MatchID } = await this.current();

        match_id = match_id || MatchID;

        const data = await this._fetch<PreGameDetailsResponse>(`/pregame/v1/matches/${match_id}`, "glz");

        return data;
    }

    /**
     * Pregame_GetMatchLoadouts
     *
     * Get player skins and sprays for a game in the pre-game stage
     * @param match_id
     */
    async loadout(match_id?: string): Promise<PreGameLoadout> {
        const { MatchID } = await this.current();

        match_id = match_id || MatchID;

        const data = await this._fetch<PreGameLoadout>(`/pregame/v1/matches/${match_id}/loadouts`, "glz");

        return data;
    }

    /**
     * Pregame_FetchChatToken
     *
     * Get a chat token
     * @param match_id
     */
    async teamChatMUCToken(match_id?: string): Promise<GLZEndpointTokenResponse> {
        const { MatchID } = await this.current();

        match_id = match_id || MatchID;

        const data = await this._fetch<GLZEndpointTokenResponse>(`/pregame/v1/matches/${match_id}/chattoken`, "glz");
        //TODO: not sure about this return type, i will change later when in unrated match to test return type

        return data;
    }

    /**
     * Pregame_FetchChatToken
     *
     * Get a chat token
     * @param match_id
     */
    async voiceChatToken(match_id?: string): Promise<GLZEndpointTokenResponse> {
        const { MatchID } = await this.current();

        match_id = match_id || MatchID;

        const data = await this._fetch<GLZEndpointTokenResponse>(`/pregame/v1/matches/${match_id}/voicetoken`, "glz");
        //TODO: not sure about this return type, i will change later when in unrated match to test return type

        return data;
    }

    /**
     * Pregame_SelectCharacter
     *
     * Select an agent
     * don't use this for instalocking :)
     * @param agent_id
     * @param match_id
     */
    async selectCharacter(agent_id: Agents, match_id?: string): Promise<PreGameDetailsResponse> {
        const { MatchID } = await this.current();

        match_id = match_id || MatchID;

        const agentId = agentsMappedById[agent_id];

        const data = await this._post<PreGameDetailsResponse>(
            `/pregame/v1/matches/${match_id}/select/${agentId}`,
            "glz",
        );

        return data;
    }

    /**
     * Pregame_SelectCharacter
     *
     * Lock an agent
     * don't use this for instalocking :)
     * @param agent_id
     * @param match_id
     */
    async lockCharacter(agent_id: Agents, match_id?: string): Promise<PreGameDetailsResponse> {
        const { MatchID } = await this.current();

        match_id = match_id || MatchID;

        const agentId = agentsMappedById[agent_id];

        const data = await this._post<PreGameDetailsResponse>(`/pregame/v1/matches/${match_id}/lock/${agentId}`, "glz");

        return data;
    }

    /**
     * Pregame_QuitMatch
     *
     * Quit a match in the pre-game stage
     * @param match_id
     */
    async quitMatch(match_id?: string): Promise<boolean> {
        const { MatchID } = await this.current();

        match_id = match_id || MatchID;

        await this._post(`/pregame/v1/matches/${match_id}/quit`, "glz");

        return true;
    }
}

export { PreGame };
