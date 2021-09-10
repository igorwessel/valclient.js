import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { promises as fs, readFileSync } from "fs";
import YAML from "yaml";
import https from "https";
import Auth from "auth";

/** Utils */
import { getConfigurationPath } from "@utils";

/** Resources */
import { customGameModeMapped, customMappedMaps, regions, regionShardOverride, shardRegionOverride } from "@resources";

/** Errors */
import { ValorantNotRunning } from "@errors/ValorantNotRunning";

/** Interfaces */
import {
    EntitlementsTokenLocal,
    PresenceResponse,
    Presence,
    FriendPrivate,
    RNETFetchChatSession,
    ValorantProcessResponse,
    CurrentPlayerResponse,
    FriendsResponse,
    Friend,
    ClientSettingsResponse,
    PendingFriendsResponse,
    PendingFriendRequest,
} from "@interfaces/localEndpointResponses";
import {
    CurrentGameSessionResponse,
    CurrentGroupIdResponse,
    CustomGameSettings,
    CustomGameSettingsInput,
    GroupDetails,
    ReconnectGameSessionResponse,
} from "@interfaces/glzEndpointResponses";
import { ClientConfig, EndpointType, Headers, LocalHeaders, LockFileType } from "@interfaces/client";
import { Queues, Regions } from "@interfaces/resources";
import { State } from "@interfaces/helpers";

class Client {
    private _axios: AxiosInstance = axios;
    private _puuid: string;
    private _player_name: string;
    private _player_tag: string;
    private _lockfile_path: string = getConfigurationPath("lockfile");
    private _lockfile: LockFileType;
    private _headers: Partial<Headers>;
    private _local_headers: LocalHeaders;
    private _region: Regions;
    private _shard: Regions;
    private _auth: Auth | null = null;
    private _client_platform =
        "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9";
    private _client_version: string;
    private _base_endpoints = {
        pd: "",
        glz: "",
        shared: "",
        local: "",
    };
    private _valorant_api: AxiosInstance = axios.create({ baseURL: "https://valorant-api.com/v1" });

    constructor({ region, auth }: Partial<ClientConfig> = {}) {
        this._region = region || this._getRegionValorant();
        this._shard = this._region;

        if (regionShardOverride[this._region.toLowerCase()]) {
            this._shard = regionShardOverride[this._region.toLowerCase()];
        }
        if (shardRegionOverride[this._shard]) {
            this._region = shardRegionOverride[this._shard];
        }

        this._configureAxios();
        this._buildEndpoints();

        if (auth) {
            this._auth = new Auth(auth);
        }
    }

    /**
     * Return Axios Instance for Valorant API (https://valorant-api.com)
     * baseUrl for endpoints is https://valorant-api.com/v1
     */
    get valorant_api(): AxiosInstance {
        return this._valorant_api;
    }

    /**
     * Actual Region
     */
    get region(): string {
        return this._region;
    }

    /**
     * Activate the client and get authorization
     */
    async activate(): Promise<void> {
        try {
            if (!this._auth) {
                this._getLockfile();
                await this._getHeaders();
                const { game_name, game_tag } = await this.getChatSession();

                this._player_name = game_name;
                this._player_tag = game_tag;
            } else {
                const { puuid, headers } = await this._auth.authenticate();

                this._puuid = puuid;
                this._headers = headers;
            }
        } catch (e) {
            console.group("ACTIVATE");
            console.log(e);
            console.log(e.data);
            console.groupEnd();
        }
    }

    /**
     * Fetch a request based in Endpoint Type
     * @param endpoint
     * @param endpointType Default value: "pd"
     * @returns Response
     */
    private async _fetch<T>(endpoint = "/", endpointType: EndpointType = "pd", config?: AxiosRequestConfig) {
        endpoint = `${this._base_endpoints[endpointType]}${endpoint}`;

        const { data } = await this._axios.get<T>(endpoint, config);

        return data;
    }

    /**
     * Do Post Request based in Endpoint Type
     * @param endpoint
     * @param endpointType Default value "pd"
     * @param data
     * @returns
     */
    private async _post<T>(endpoint = "/", endpointType: EndpointType = "pd", data = {}) {
        endpoint = `${this._base_endpoints[endpointType]}${endpoint}`;

        const response = await this._axios.post<T>(endpoint, data);

        return response.data;
    }
    /**
     * Do Put Request based in Endpoint Type
     * @param endpoint
     * @param endpointType Default value "pd"
     * @param data
     * @returns
     */
    private async _put<T>(endpoint = "/", endpointType: EndpointType = "pd", data = {}) {
        endpoint = `${this._base_endpoints[endpointType]}${endpoint}`;

        const response = await this._axios.put<T>(endpoint, data);

        return response.data;
    }
    /**
     * Do delete request based in Endpoint Type
     * @param endpoint
     * @param endpointType Default value "pd"
     * @returns
     */
    private async _delete<T>(endpoint = "/", endpointType: EndpointType = "pd") {
        endpoint = `${this._base_endpoints[endpointType]}${endpoint}`;

        const { data } = await this._axios.delete<T>(endpoint);

        return data;
    }

    /**
     *  Party_FetchPlayer
     *
     *  Get the Party ID that a given player belongs to
     */
    async getCurrentGroupId(): Promise<CurrentGroupIdResponse> {
        const data = await this._fetch<CurrentGroupIdResponse>(`/parties/v1/players/${this._puuid}`, "glz");

        return data;
    }

    /**
     *  Party_RemovePlayer
     *
     *  Removes a player from the current party
     * @param puuid
     * @returns
     */
    async removePlayerParty(puuid?: string): Promise<null> {
        puuid = puuid || this._puuid;

        const data: null = await this._delete(`/parties/v1/players/${puuid}`, "glz");

        return data;
    }

    /**
     *  Party_FetchParty
     *
     *  Get details about a given party id
     */
    async getCurrentDetailsGroup(): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.getCurrentGroupId();

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
    async setMemberReadyGroup(ready?: boolean): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.getCurrentGroupId();

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
        const { CurrentPartyID } = await this.getCurrentGroupId();

        await this._post(`/parties/v1/parties/${CurrentPartyID}/members/${this._puuid}/refreshCompetitiveTier`, "glz");

        return true;
    }

    /**
     *  Party_RefreshPlayerIdentity
     *
     *  Refreshes the identity for a player
     */
    async refreshPlayerIdentity(): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.getCurrentGroupId();

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
        const { CurrentPartyID } = await this.getCurrentGroupId();

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
    async changeGroupQueue(queueID: Queues): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.getCurrentGroupId();

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
    async startGroupCustomGame(): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.getCurrentGroupId();

        const data = await this._post<GroupDetails>(`/parties/v1/parties/${CurrentPartyID}/startcustomgame`, "glz");

        return data;
    }

    /**
     *  Party_EnterMatchmakingQueue
     *
     *  Enters the matchmaking queue
     */
    async enterMatchmakingQueue(): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.getCurrentGroupId();

        const data = await this._post<GroupDetails>(`/parties/v1/parties/${CurrentPartyID}/matchmaking/join`, "glz");

        return data;
    }

    /**
     *  Party_LeaveMatchmakingQueue
     *
     *  Leaves the matchmaking queue
     */
    async leaveMatchmakingQueue(): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.getCurrentGroupId();

        const data = await this._post<GroupDetails>(`/parties/v1/parties/${CurrentPartyID}/matchmaking/leave`, "glz");

        return data;
    }

    /**
     *  Party_SetAccessibility
     *
     *  Changes the group state to be open or closed
     */
    async changeGroupState(open?: State): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.getCurrentGroupId();

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
    async setGroupCustomGameSettings({
        Map,
        Mode,
        GamePod,
        GameRules,
    }: CustomGameSettingsInput): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.getCurrentGroupId();

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
    async inviteGroupByDisplayName(name: string, tag: string): Promise<GroupDetails> {
        const { CurrentPartyID } = await this.getCurrentGroupId();

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
        const { CurrentPartyID } = await this.getCurrentGroupId();

        const data = await this._post<GroupDetails>(
            `/parties/v1/parties/${CurrentPartyID}/request/${request_id}/decline`,
            "glz",
        ); //TODO: not sure about this return for data, need to test when have requests group to accept

        return data;
    }
    /**
     *  Session_Get
     *
     *  Get information about the current game session
     * @returns
     */
    async getCurrentGameSession(): Promise<CurrentGameSessionResponse> {
        const data = await this._fetch<CurrentGameSessionResponse>(`/session/v1/sessions/${this._puuid}`, "glz");

        return data;
    }

    /**
     * Session_ReConnect
     *
     * Try reconnect current game session
     * @returns
     */
    async reconnectGameSession(): Promise<ReconnectGameSessionResponse> {
        const data = await this._fetch<ReconnectGameSessionResponse>(
            `/session/v1/sessions/${this._puuid}/reconnect`,
            "glz",
        );

        return data;
    }

    /**
     * TEXT_CHAT_RNet_FetchSession
     *
     * Get the current session including player name and PUUID
     */
    async getChatSession(): Promise<RNETFetchChatSession> {
        const data = await this._fetch<RNETFetchChatSession>("/chat/v1/session", "local");

        return data;
    }

    /**
     * PRESENCE_RNet_GET
     *
     *  NOTE: Only works on self or active user's friends
     * @param puuid Use puuid passed in parameter or self puuid
     * @returns
     */
    async getOnlineFriend(puuid?: string): Promise<FriendPrivate | null> {
        puuid = puuid || this._puuid;

        const { presences } = await this._fetch<PresenceResponse>("/chat/v4/presences", "local");

        const player = presences.find((presence) => presence.puuid === puuid);

        if (player) {
            const playerPrivate = JSON.parse(Buffer.from(player.private, "base64").toString("utf-8"));

            return playerPrivate;
        }

        return null;
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
    async getAllFriendsOnline(): Promise<Presence[]> {
        const { presences } = await this._fetch<PresenceResponse>("/chat/v4/presences", "local");

        return presences;
    }

    /**
     * RiotClientSession_FetchSessions
     *
     * Gets info about the running Valorant process including start arguments
     * @returns
     */
    async getInfoValorantProcess(): Promise<ValorantProcessResponse | Record<string, never>> {
        const data = await this._fetch<ValorantProcessResponse>("/product-session/v1/external-sessions", "local");

        return data;
    }

    /**
     *  PlayerAlias_RNet_GetActiveAlias
     *
     *  Gets current player session authenticated
     * @returns
     */
    async getCurrentPlayer(): Promise<CurrentPlayerResponse> {
        const data = await this._fetch<CurrentPlayerResponse>("/player-account/aliases/v1/active", "local");

        return data;
    }

    /**
     *  RSO_RNet_GetEntitlementsToken
     *
     *  Gets both the token and entitlement for API usage
     *  accessToken is used as the token and token is used as the entitlement.
     *  PBE access can be checked through here
     */

    /* TODO: get right endpoint
    async getTokenAndEntitlement(): Promise<CurrentPlayerResponse> {
        const data = await this._fetch<CurrentPlayerResponse>("/player-account/aliases/v1/active", "local");

        return data;
    }
    */

    /**
     * CHATFRIENDS_RNet_GET_ALL
     *
     * Get a list of friends
     * @returns
     */
    async getAllFriends(): Promise<Friend[]> {
        const { friends } = await this._fetch<FriendsResponse>("/chat/v4/friends", "local");

        return friends;
    }

    /**
     *  RiotKV_RNet_GetSettings
     *
     *  Get client settings
     */
    async getClientSettings(): Promise<ClientSettingsResponse> {
        const data = await this._fetch<ClientSettingsResponse>(
            "/player-preferences/v1/data-json/Ares.PlayerSettings",
            "local",
        );

        return data;
    }

    /**
     *  FRIENDS_RNet_FetchFriendRequests
     *
     *  Get pending friend requests
     * @returns
     */
    async getPendingFriendsRequests(): Promise<PendingFriendRequest[]> {
        const { requests } = await this._fetch<PendingFriendsResponse>("/chat/v4/friendrequests", "local");

        return requests;
    }

    /**
     * All regions we can use in Client
     * @returns All regions
     */
    static getRegions(): Regions[] {
        return regions;
    }
    /**
     * Get Region in RiotClient Settings
     * @returns Region
     */
    private _getRegionValorant(): Regions {
        const yamlPath = getConfigurationPath("RiotClientSettings.yaml");
        const yamlData = readFileSync(yamlPath, { encoding: "utf8" });
        const {
            install: {
                globals: { region },
            },
        }: { install: { globals: { region: Regions } } } = YAML.parse(yamlData);

        return region;
    }

    /**
     * Configure Axios to add Headers in each request
     */
    private _configureAxios(): void {
        this._axios.interceptors.request.use((config) => {
            config.headers = this._headers;
            return config;
        });

        this._axios.interceptors.request.use(
            (config) => {
                config.httpsAgent = new https.Agent({
                    rejectUnauthorized: false,
                });
                config.auth = {
                    username: "riot",
                    password: this._lockfile.password,
                };
                config.withCredentials = true;
                return config;
            },
            null,
            {
                runWhen(config: AxiosRequestConfig) {
                    return config.url.includes("127.0.0.1");
                },
            },
        );
    }

    /**
     * Create Bases Endpoints for use in Axios
     */
    private _buildEndpoints(): void {
        if (!this._lockfile) {
            this._lockfile = this._getLockfile();
        }

        this._base_endpoints = {
            pd: `https://pd.${this._shard}.a.pvp.net`,
            glz: `https://glz-${this._region}-1.${this._shard}.a.pvp.net`,
            shared: `https://shared.${this._shard}.a.pvp.net`,
            local: `https://127.0.0.1:${this._lockfile.port}`,
        };
    }

    /**
     * Get Headers to make Requests
     */
    private async _getHeaders(): Promise<void> {
        if (!this._client_version) {
            await this._getClientVersion();
        }

        if (!this._auth) {
            return this._getAuthHeaders();
        }

        const { puuid, headers } = await this._auth.authenticate();
        headers["X-Riot-ClientPlatform"] = this._client_platform;
        headers["X-Riot-ClientVersion"] = this._client_version;

        this._puuid = puuid;
        this._headers = headers;
    }

    /**
     * Get Auth Headers when not have Auth
     */
    private async _getAuthHeaders(): Promise<void> {
        try {
            const {
                accessToken,
                subject: puuid,
                token,
            } = await this._fetch<EntitlementsTokenLocal>("/entitlements/v1/token", "local");

            this._headers = {
                Authorization: `Bearer ${accessToken}`,
                "X-Riot-Entitlements-JWT": token,
                "X-Riot-ClientPlatform": this._client_platform,
                "X-Riot-ClientVersion": this._client_version,
            };

            this._puuid = puuid;
        } catch (e) {}
    }

    /**
     * Get a client version in Valorant API (https://valorant-api.com)
     */
    private async _getClientVersion(): Promise<string> {
        const {
            data: {
                data: { branch, buildVersion, version },
            },
        } = await this._valorant_api.get("/version");

        this._client_version = `${branch}-shipping-${buildVersion}-${version.split(".")[3]}`;

        return `${branch}-shipping-${buildVersion}-${version.split(".")[3]}`;
    }

    /**
     * Get a lockfile when valorant is running, if dont find lockfile valorant is not running
     */
    private _getLockfile(): LockFileType {
        try {
            const lockfile = readFileSync(this._lockfile_path, { encoding: "utf-8" });
            const [name, PID, port, password, protocol] = lockfile.split(":");

            this._lockfile = {
                name,
                PID,
                port,
                password,
                protocol,
            };

            return { name, PID, port, password, protocol };
        } catch (e) {
            throw new ValorantNotRunning();
        }
    }
}

export default Client;
