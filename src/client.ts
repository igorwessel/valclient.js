import axios, { AxiosInstance, AxiosRequestConfig, AxiosStatic } from "axios";
import { readFileSync } from "fs";
import YAML from "yaml";
import https from "https";
import Auth from "./auth";

/** Utils */
import { getConfigurationPath } from "@utils";

/** Resources */
import { regions, regionShardOverride, shardRegionOverride } from "@resources";

/** Errors */
import { ValorantNotRunning } from "@errors/ValorantNotRunning";
import { SystemNotSupported } from "@errors/SystemNotSupported";

/** Interfaces */
import { EntitlementsTokenLocal } from "@interfaces/player";
import { BaseEndpoints, ClientConfig, EndpointType, Headers, LockFileType } from "@interfaces/client";
import { Regions } from "@interfaces/resources";

import { Player } from "@app/player";
import { Valorant } from "@app/valorant";
import { Group } from "@app/group";
import { LiveGame } from "@app/liveGame";
import { PreGame } from "@app/preGame";
import { Session } from "@app/session";
import { Pvp } from "@app/pvp";
import { Store } from "@app/store";
import { Contracts } from "@app/contracts";

export const addAuthHeaders =
    (headers: Partial<Headers>) =>
    (config: AxiosRequestConfig): AxiosRequestConfig => {
        config.headers = headers;
        return config;
    };

export const addLocalHeaders =
    (username: string, password: string) =>
    (config: AxiosRequestConfig): AxiosRequestConfig => {
        if (config.url.includes("127.0.0.1")) {
            config.httpsAgent = new https.Agent({
                rejectUnauthorized: false,
            });

            config.auth = {
                username,
                password,
            };

            config.withCredentials = true;

            return config;
        }

        return config;
    };

class Client {
    private _axios: AxiosStatic = axios;
    private _puuid: string;
    private _lockfile_path: string | null = null;
    private _lockfile: LockFileType;
    private _headers: Partial<Headers>;
    private _region: Regions | null = null;
    private _shard: Regions;
    private _auth: Auth | null = null;
    private _client_platform =
        "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9";
    private _client_version: string;
    private _base_endpoints: BaseEndpoints = {
        pd: null,
        glz: null,
        shared: null,
        local: null,
    };
    private _local_username_auth = "riot";
    private _valorant_api: AxiosInstance;

    public player: Player | null = null;
    public valorant: Valorant | null = null;
    public group: Group | null = null;
    public live_game: LiveGame | null = null;
    public pre_game: PreGame | null = null;
    public session: Session | null = null;
    public pvp: Pvp | null = null;
    public store: Store | null = null;
    public contracts: Contracts | null = null;

    constructor() {
        this._valorant_api = axios.create({ baseURL: "https://valorant-api.com/v1" });
    }

    /**
     * Start client
     */
    public async init({ region, auth }: ClientConfig): Promise<void> {
        this._region = region;
        this._shard = this._region;
        this._valorant_api = axios.create({ baseURL: "https://valorant-api.com/v1" });

        if (regionShardOverride[this._region.toLowerCase()]) {
            this._shard = regionShardOverride[this._region.toLowerCase()];
        }
        if (shardRegionOverride[this._shard]) {
            this._region = shardRegionOverride[this._shard];
        }

        if (auth) {
            this._auth = new Auth(auth);
        } else if (process.platform !== "win32") {
            throw new SystemNotSupported();
        }

        await this._getClientVersion();
        this._buildEndpoints();

        if (!this._auth) {
            this._getLockfile();
            this._buildLocalEndpoint();
            await this._getLocalHeaders();

            this.player = new Player(this._fetch, this._puuid);
            this.valorant = new Valorant(this._fetch, this._put);
        } else {
            await this._getAuthHeaders();
        }

        this.group = new Group(this._fetch, this._post, this._delete, this._puuid);
        this.live_game = new LiveGame(this._fetch, this._post, this._puuid);
        this.pre_game = new PreGame(this._fetch, this._post, this._puuid);
        this.session = new Session(this._fetch, this._puuid);
        this.pvp = new Pvp(this._fetch, this._put, this._puuid, this._region);
        this.store = new Store(this._fetch, this._puuid);
        this.contracts = new Contracts(this._fetch, this._post, this._puuid);

        this._configureAxios();
    }

    /**
     * Return Axios Instance for Valorant API (https://valorant-api.com)
     * baseUrl for endpoints is https://valorant-api.com/v1
     */
    get valorant_api(): AxiosInstance {
        return this._valorant_api;
    }

    /**
     * All regions we can use in Client
     * @returns All regions
     */
    get allRegions(): Regions[] {
        return regions;
    }

    /**
     * Current authenticate person
     */
    get auth(): { username: string; password: string } | null {
        if (this._auth) {
            return this._auth.auth;
        }
        return null;
    }

    /**
     * Actual Region
     */
    get region(): string {
        return this._region;
    }

    /**
     * Actual shard
     */
    get shard(): string {
        return this._shard;
    }

    /**
     * Fetch a request based in Endpoint Type
     * @param endpoint
     * @param endpointType Default value: "pd"
     * @returns Response
     */
    private _fetch = async <T>(endpoint = "/", endpointType: EndpointType = "pd"): Promise<T> => {
        endpoint = `${this._base_endpoints[endpointType]}${endpoint}`;

        const { data } = await this._axios.get<T>(endpoint);

        return data;
    };

    /**
     * Do Post Request based in Endpoint Type
     * @param endpoint
     * @param endpointType Default value "pd"
     * @param data
     * @returns
     */
    private _post = async <T>(endpoint = "/", endpointType: EndpointType = "pd", data = {}) => {
        endpoint = `${this._base_endpoints[endpointType]}${endpoint}`;

        const response = await this._axios.post<T>(endpoint, data);

        return response.data;
    };
    /**
     * Do Put Request based in Endpoint Type
     * @param endpoint
     * @param endpointType Default value "pd"
     * @param data
     * @returns
     */
    private _put = async <T>(endpoint = "/", endpointType: EndpointType = "pd", data = {}) => {
        endpoint = `${this._base_endpoints[endpointType]}${endpoint}`;

        const response = await this._axios.put<T>(endpoint, data);

        return response.data;
    };
    /**
     * Do delete request based in Endpoint Type
     * @param endpoint
     * @param endpointType Default value "pd"
     * @returns
     */
    private _delete = async <T>(endpoint = "/", endpointType: EndpointType = "pd") => {
        endpoint = `${this._base_endpoints[endpointType]}${endpoint}`;

        const { data } = await this._axios.delete<T>(endpoint);

        return data;
    };

    /**
     * Configure Axios to add Headers in each request
     */
    private _configureAxios(): void {
        const authInterceptor = addAuthHeaders(this._headers);
        const localInterceptor = addLocalHeaders(this._local_username_auth, this._lockfile?.password);

        this._axios.interceptors.request.use(authInterceptor);

        this._axios.interceptors.request.use(localInterceptor);
    }

    /**
     * Create Bases Endpoints without Localendpoint for use in Axios
     */
    private _buildEndpoints(): void {
        this._base_endpoints = {
            pd: `https://pd.${this._shard}.a.pvp.net`,
            glz: `https://glz-${this._region}-1.${this._shard}.a.pvp.net`,
            shared: `https://shared.${this._shard}.a.pvp.net`,
            local: null,
        };
    }

    /**
     * Create Base endpoint local for use in Axios
     */
    private _buildLocalEndpoint(): void {
        this._base_endpoints["local"] = `https://127.0.0.1:${this._lockfile.port}`;
    }

    /**
     * Get Headers to make Requests
     */
    private async _getAuthHeaders(): Promise<void> {
        const { puuid, headers } = await this._auth.authenticate();
        headers["X-Riot-ClientPlatform"] = this._client_platform;
        headers["X-Riot-ClientVersion"] = this._client_version;

        this._puuid = puuid;
        this._headers = headers;
    }

    /**
     * Get Auth Headers when not have Auth
     */
    private async _getLocalHeaders(): Promise<void> {
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
    private async _getClientVersion(): Promise<void> {
        const {
            data: {
                data: { branch, buildVersion, version },
            },
        } = await this._valorant_api.get("/version");

        this._client_version = `${branch}-shipping-${buildVersion}-${version.split(".")[3]}`;
    }

    /**
     * Get a lockfile when valorant is running, if dont find lockfile valorant is not running
     */
    private _getLockfile(): void {
        try {
            const lockfile = readFileSync(getConfigurationPath("lockfile"), { encoding: "utf-8" });
            const [name, PID, port, password, protocol] = lockfile.split(":");

            this._lockfile = {
                name,
                PID,
                port,
                password,
                protocol,
            };
        } catch (e) {
            if (e.code === "ENOENT" && e.syscall === "open") {
                throw new ValorantNotRunning();
            }
        }
    }
}

export default Client;
