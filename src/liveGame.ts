import { IHttp } from "@interfaces/http";

import { CoreGameDetailsResponse, CoreGameLoadoutResponse, CoreGameResponse, ILiveGame } from "@interfaces/liveGame";

class LiveGame implements ILiveGame {
    private readonly _http: IHttp;
    private readonly _puuid: string;

    constructor(http: IHttp, puuid: string) {
        this._http = http;
        this._puuid = puuid;
    }

    /**
     * CoreGame_FetchPlayer
     *
     * Get the game ID for an ongoing game the player is in
     */
    async current(): Promise<CoreGameResponse> {
        const data = await this._http.fetch<CoreGameResponse>(`/core-game/v1/players/${this._puuid}`, "glz");

        return data;
    }

    /**
     * CoreGame_FetchMatch
     *
     * Get information about an ongoing game
     */
    async details(): Promise<CoreGameDetailsResponse> {
        const { MatchID } = await this.current();

        const data = await this._http.fetch<CoreGameDetailsResponse>(`/core-game/v1/matches/${MatchID}`, "glz");

        return data;
    }

    /**
     * CoreGame_FetchMatchLoadouts
     *
     * Get player skins and sprays for an ongoing game
     * @returns
     */
    async loadout(): Promise<CoreGameLoadoutResponse> {
        const { MatchID } = await this.current();

        const data = await this._http.fetch<CoreGameLoadoutResponse>(
            `/core-game/v1/matches/${MatchID}/loadouts`,
            "glz",
        );

        return data;
    }

    /**
     * CoreGame_DisassociatePlayer
     *
     * Leave an in-progress game
     * @param match_id
     */
    async disconnect(): Promise<boolean> {
        const { MatchID } = await this.current();

        await this._http.post(`/core-game/v1/players/${this._puuid}/disassociate/${MatchID}`, "glz");

        return true;
    }

    /**
     * CoreGame_FetchTeamChatMUCToken
     *
     * Get a token for team chat
     * @param match_id
     * 
    RETURNING: 500 ERROR, I WILL CHECK ENDPOINTS

    async teamChatToken(): Promise<GLZEndpointTokenResponse> {
        const { MatchID } = await this.current();

        const data = await this._http.fetch<GLZEndpointTokenResponse>(
            `/core-game/v1/matches/${MatchID}/teamchatmuctoken`,
            "glz",
        ); //TODO: not sure about this return type, i will change later when in unrated match to test return type

        return data;
    }
     */

    /**
     * CoreGame_FetchAllChatMUCToken
     *
     * Get a token for all chat
     * @param match_id
     * 
    RETURNING: 500 ERROR, I WILL CHECK ENDPOINTS

    async allChatMucToken(): Promise<GLZEndpointTokenResponse> {
        const { MatchID } = await this.current();

        const data = await this._http.fetch<GLZEndpointTokenResponse>(
            `/core-game/v1/matches/${MatchID}/allchatmuctoken`,
            "glz",
        ); //TODO: not sure about this return type, i will change later when in unrated match to test return type

        return data;
    }
     */
}

export { LiveGame };
