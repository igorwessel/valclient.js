import { IHttp } from "@interfaces/http";

import { Regions } from "@interfaces/resources";

import {
    IPvp,
    PvpAccountXp,
    PvpCompetitiveUpdates,
    PvpContents,
    PvpInternalConfig,
    PvpItemProgressDefinitions,
    PvpItemProgressDefinitionsResponse,
    PvpLeaderboard,
    PvpLeaderboardParams,
    PvpMatchDetails,
    PvpMatchHistory,
    PvpMatchHistoryInput,
    PvpMMR,
    PvpPlayerRestrictions,
} from "@interfaces/pvp";

class Pvp implements IPvp {
    private readonly _http: IHttp;
    private readonly _puuid: string;
    private readonly _region: Regions;

    constructor(http: IHttp, puuid: string, region: Regions) {
        this._http = http;
        this._puuid = puuid;
        this._region = region;
    }

    /**
     * Content_FetchContent
     *
     * Get names and ids for game content such as agents, maps, guns, etc.
     */
    async contents(): Promise<PvpContents> {
        const data = await this._http.fetch<PvpContents>("/content-service/v2/content", "shared");

        return data;
    }

    /**
     * AccountXP_GetPlayer
     *
     * Get the account level, XP, and XP history for the active player
     */
    async accountXp(): Promise<PvpAccountXp> {
        const data = await this._http.fetch<PvpAccountXp>(`/account-xp/v1/players/${this._puuid}`, "pd");

        return data;
    }

    /**
     * MMR_FetchPlayer
     *
     * Get the match making rating for a player
     */
    async mmr(puuid?: string): Promise<PvpMMR> {
        puuid = puuid || this._puuid;

        const data = await this._http.fetch<PvpMMR>(`/mmr/v1/players/${puuid}`, "pd");

        return data;
    }

    /**
     *  MatchHistory_FetchMatchHistory
     *
     *  Get recent matches for a player
     *  There are 3 optional query parameters: start_index, end_index, and queue_id.
     * @param params
     */
    async matchHistory(params?: PvpMatchHistoryInput): Promise<PvpMatchHistory> {
        const puuid = params?.puuid || this._puuid;
        const start = params?.start || 0;
        const end = params?.end || 15;
        const queue_id = params?.queue_id || "null";

        const data = await this._http.fetch<PvpMatchHistory>(
            `/match-history/v1/history/${puuid}?startIndex=${start}&endIndex=${end}${
                queue_id !== "null" ? "&" + "queue=" + queue_id : ""
            }`,
            "pd",
        );

        return data;
    }

    /**
     * Get the full info for a previous match
     *
     * Includes everything that the in-game match details screen shows including damage and kill positions, same as the official API w/ a production key
     * @param match_id
     */
    async matchDetails(match_id: string): Promise<PvpMatchDetails> {
        const data = await this._http.fetch<PvpMatchDetails>(`/match-details/v1/matches/${match_id}`, "pd");

        return data;
    }

    /**
     *   Get recent games and how they changed ranking
     *
     *  There are 3 optional query parameters: start_index, end_index, and queue_id. queue can be one of null, competitive, custom, deathmatch, ggteam, newmap, onefa, snowball, spikerush, or unrated.
     * @param params
     */
    async competitiveUpdates(params?: PvpMatchHistoryInput): Promise<PvpCompetitiveUpdates> {
        const puuid = params?.puuid || this._puuid;
        const start = params?.start || 0;
        const end = params?.end || 15;
        const queue_id = params?.queue_id || "null";

        const data = await this._http.fetch<PvpCompetitiveUpdates>(
            `/mmr/v1/players/${puuid}/competitiveupdates?startIndex=${start}&endIndex=${end}${
                queue_id !== "null" ? "&" + "queue=" + queue_id : ""
            }`,
            "pd",
        );

        return data;
    }

    /**
     * MMR_FetchLeaderboard
     *
     * Get the competitive leaderboard for a given season
     * The query parameter query can be added to search for a username.
     * @param params
     */
    async leadersboards(params?: PvpLeaderboardParams): Promise<PvpLeaderboard> {
        const region = params?.region || this._region;
        const season = params?.season_id || (await this._getLiveSeason());
        const start = params?.start || 0;
        const size = params?.size || 25;

        const data = await this._http.fetch<PvpLeaderboard>(
            `/mmr/v1/leaderboards/affinity/${region}/queue/competitive/season/${season}?startIndex=${start}&size=${size}`,
            "pd",
        );

        return data;
    }

    /**
     * Restrictions_FetchPlayerRestrictionsV2
     *
     * Checks for any gameplay penalties on the account
     */
    async playerRestrictions(): Promise<PvpPlayerRestrictions> {
        const data = await this._http.fetch<PvpPlayerRestrictions>("/restrictions/v2/penalties", "pd");

        return data;
    }

    /**
     * ItemProgressionDefinitionsV2_Fetch
     *
     * Get details for item upgrades
     */
    async itemProgressDefinitions(): Promise<PvpItemProgressDefinitions[]> {
        const { Definitions } = await this._http.fetch<PvpItemProgressDefinitionsResponse>(
            "/contract-definitions/v3/item-upgrades",
            "pd",
        );

        return Definitions;
    }

    /**
     * Get a current live season
     * @returns
     */
    private async _getLiveSeason(): Promise<string> {
        const data = await this.mmr();

        return data.LatestCompetitiveUpdate.SeasonID;
    }

    /**
     * Config_FetchConfig
     *
     * Get various internal game configuration settings set by Riot
     */
    async internalConfig(): Promise<PvpInternalConfig> {
        const data = await this._http.fetch<PvpInternalConfig>(`/v1/config/${this._region}`, "shared");

        return data;
    }
}

export { Pvp };
