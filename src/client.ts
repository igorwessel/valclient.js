import axios, { AxiosInstance, AxiosRequestConfig, AxiosStatic } from "axios";
import { readFileSync } from "fs";
import https from "https";

import { HttpService } from "@app/http";
import Auth from "@app/auth";

/** Utils */
import { getConfigurationPath } from "@utils";

/** Resources */
import { regions, regionShardOverride, shardRegionOverride } from "@resources";

/** Errors */
import { ValorantNotRunning } from "@errors/valorantNotRunning";
import { SystemNotSupported } from "@errors/systemNotSupported";

/** Interfaces */
import { EntitlementsTokenLocal, IPlayer } from "@interfaces/player";
import { BaseEndpoints, ClientConfig, Headers, IValClient, LockFileType } from "@interfaces/client";
import { Regions } from "@interfaces/resources";
import { IAuth } from "@interfaces/auth";

import { IValorant } from "@interfaces/valorant";
import { IGroup } from "@interfaces/group";
import { ILiveGame } from "@interfaces/liveGame";
import { IPreGame } from "@interfaces/preGame";
import { ISession } from "@interfaces/session";
import { IPvp } from "@interfaces/pvp";
import { IStore } from "@interfaces/store";
import { IContracts } from "@interfaces/contracts";
import { ILoadout } from "@interfaces/loadout";

import { Player } from "@app/player";
import { Valorant } from "@app/valorant";
import { Group } from "@app/group";
import { LiveGame } from "@app/liveGame";
import { PreGame } from "@app/preGame";
import { Session } from "@app/session";
import { Pvp } from "@app/pvp";
import { Store } from "@app/store";
import { Contracts } from "@app/contracts";
import { Loadout } from "@app/loadout";

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

class ValClient implements IValClient {
    private _axios: AxiosStatic = axios;
    private _puuid: string;
    private _lockfile: LockFileType;
    private _headers: Partial<Headers>;
    private _region: Regions | null = null;
    private _shard: Regions;
    private _auth: IAuth | null = null;
    private _client_platform =
        "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9";
    private _client_version: string;
    private _local_username_auth = "riot";

    private _valorant_api: AxiosInstance;

    public _http_service: HttpService;

    public player: IPlayer | null = null;
    public valorant: IValorant | null = null;
    public group: IGroup | null = null;
    public live_game: ILiveGame | null = null;
    public pre_game: IPreGame | null = null;
    public session: ISession | null = null;
    public pvp: IPvp | null = null;
    public store: IStore | null = null;
    public loadout: ILoadout | null = null;
    public contracts: IContracts | null = null;

    constructor() {
        this._http_service = new HttpService(this._axios);
        this._valorant_api = axios.create({ baseURL: "https://valorant-api.com/v1" });
    }

    /**
     * Start client
     */
    public async init({ region, auth }: ClientConfig): Promise<void> {
        this._region = region;
        this._shard = this._region;

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

            this.player = new Player(this._http_service, this._puuid);
            this.valorant = new Valorant(this._http_service);
        } else {
            await this._getAuthHeaders();
        }

        this._configureAxios();

        this.group = new Group(this._http_service, this._puuid);
        this.live_game = new LiveGame(this._http_service, this._puuid);
        this.pre_game = new PreGame(this._http_service, this._puuid);
        this.session = new Session(this._http_service, this._puuid);
        this.pvp = new Pvp(this._http_service, this._puuid, this._region);
        this.store = new Store(this._http_service, this._puuid);
        this.contracts = new Contracts(this._http_service, this._puuid);
        this.loadout = new Loadout(this._http_service, this._puuid, this.valorant_api, this.store);
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
     * Actual endpoints
     */
    get endpoints(): BaseEndpoints {
        return this._http_service.endpoints;
    }

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
        this._http_service.baseEndpoint = {
            pd: `https://pd.${this._shard}.a.pvp.net`,
            glz: `https://glz-${this._region}-1.${this._shard}.a.pvp.net`,
            shared: `https://shared.${this._shard}.a.pvp.net`,
        };
    }

    /**
     * Create Base endpoint local for use in Axios
     */
    private _buildLocalEndpoint(): void {
        this._http_service.baseEndpoint = { local: `https://127.0.0.1:${this._lockfile.port}` };
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
        } = await this._http_service.fetch<EntitlementsTokenLocal>("/entitlements/v1/token", "local", {
            auth: { username: this._local_username_auth, password: this._lockfile.password },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
        });

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
        } = await this.valorant_api.get("/version");

        this._client_version = `${branch}-shipping-${buildVersion}-${version.split(".")[3]}`;
    }

    /**
     * Get a lockfile when valorant is running, if dont find lockfile valorant is not running
     */
    private _getLockfile(): void {
        try {
            const lockfilePath = getConfigurationPath("lockfile");

            const lockfile = readFileSync(lockfilePath, { encoding: "utf-8" });
            const [name, PID, port, password, protocol] = lockfile.split(":");

            this._lockfile = {
                name,
                PID,
                port,
                password,
                protocol,
            };
        } catch (e) {
            throw new ValorantNotRunning();
        }
    }
}

export { ValClient };
