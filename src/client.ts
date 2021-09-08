import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { promises as fs, readFileSync } from "fs";
import YAML from "yaml";
import https from "https";

import { regions, regionShardOverride, shardRegionOverride } from "@resources";
import { getConfigurationPath } from "@utils";
import { ValorantNotRunning } from "@errors/ValorantNotRunning";

/** Interfaces */
import { EntitlementsTokenLocal, FetchPresence, PresencePrivate, RNETFetchChatSession } from "@interfaces/responses";
import { ClientConfig, EndpointType, Headers, LocalHeaders, LockFileType } from "@interfaces/client";
import { Regions } from "@interfaces/resources";

import Auth from "auth";

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
        if (!this._auth) {
            this._getLockfile();
            await this._getHeaders();
            const { game_name, game_tag } = await this.rnetFetchChatSession();

            this._player_name = game_name;
            this._player_tag = game_tag;
        } else {
            const { puuid, headers } = await this._auth.authenticate();

            this._puuid = puuid;
            this._headers = headers;
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
     * TEXT_CHAT_RNet_FetchSession
     *
     * Get the current session including player name and PUUID
     */
    async rnetFetchChatSession(): Promise<RNETFetchChatSession> {
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
    async fetchPresence(puuid?: string): Promise<PresencePrivate | null> {
        puuid = puuid || this._puuid;

        const { presences } = await this._fetch<FetchPresence>("/chat/v4/presences", "local");

        const player = presences.find((presence) => presence.puuid === puuid);

        if (player) {
            return player.private;
        }

        return null;
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
