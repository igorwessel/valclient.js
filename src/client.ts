import axios, { AxiosInstance } from "axios";
import { promises as fs, readFileSync } from "fs";
import YAML from "yaml";
import https from "https";

import { regions, RegionsString, regionShardOverride, shardRegionOverride } from "@resources";
import { getConfigurationPath } from "@utils";
import { ValorantNotRunning } from "@errors/ValorantNotRunning";

import Auth, { AuthInput } from "auth";

interface LockFileType {
    name: string;
    PID: string;
    port: string;
    password: string;
    protocol: string;
}

interface ClientConfig {
    region: RegionsString;
    auth: AuthInput;
}

interface LocalHeaders {
    Authorization: string;
}

export interface Headers {
    Authorization: string;
    "X-Riot-Entitlements-JWT": string;
    "X-Riot-ClientPlatform": string;
    "X-Riot-ClientVersion": string;
}

enum EndpointTypes {
    pd,
    glz,
    shared,
    local,
}

type EndpointType = keyof typeof EndpointTypes;

class Client {
    private _axios: AxiosInstance = axios;
    private _puuid: string;
    private _player_name: string;
    private _player_tag: string;
    private _lockfile_path: string = getConfigurationPath("lockfile");
    private _lockfile: LockFileType;
    private _headers: Partial<Headers>;
    private _local_headers: LocalHeaders;
    private _region: RegionsString;
    private _shard: RegionsString;
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

        if (auth) {
            this._auth = new Auth(auth);
        }
    }

    get region(): string {
        return this._region;
    }

    /**
     * Fetch a request based in Endpoint Type
     * @param endpoint
     * @param endpointType Default value: "pd"
     * @returns Response
     */
    private async _fetch(endpoint = "/", endpointType: EndpointType = "pd") {
        endpoint = `${this._base_endpoints[endpointType]}${endpoint}`;

        const { data } = await this._axios.get(endpoint);

        return data;
    }

    /**
     * Do Post Request based in Endpoint Type
     * @param endpoint
     * @param endpointType Default value "pd"
     * @param data
     * @returns
     */
    private async _post(endpoint = "/", endpointType: EndpointType = "pd", data = {}) {
        endpoint = `${this._base_endpoints[endpointType]}${endpoint}`;

        const response = await this._axios.post(endpoint, data);

        return response.data;
    }
    /**
     * Do Put Request based in Endpoint Type
     * @param endpoint
     * @param endpointType Default value "pd"
     * @param data
     * @returns
     */
    private async _put(endpoint = "/", endpointType: EndpointType = "pd", data = {}) {
        endpoint = `${this._base_endpoints[endpointType]}${endpoint}`;

        const response = await this._axios.put(endpoint, data);

        return response.data;
    }
    /**
     * Do delete request based in Endpoint Type
     * @param endpoint
     * @param endpointType Default value "pd"
     * @returns
     */
    private async _delete(endpoint = "/", endpointType: EndpointType = "pd") {
        endpoint = `${this._base_endpoints[endpointType]}${endpoint}`;

        const { data } = await this._axios.delete(endpoint);

        return data;
    }

    /**
     * All regions we can use in Client
     * @returns All regions
     */
    static getRegions(): RegionsString[] {
        return regions;
    }

    /**
     * Get Region in RiotClient Settings
     * @returns Region
     */
    private _getRegionValorant(): RegionsString {
        const yamlPath = getConfigurationPath("RiotClientSettings.yaml");
        const yamlData = readFileSync(yamlPath, { encoding: "utf8" });
        const {
            install: {
                globals: { region },
            },
        }: { install: { globals: { region: RegionsString } } } = YAML.parse(yamlData);

        return region;
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

        this._axios.interceptors.request.use((config) => {
            if (config.url.includes("127.0.0.1")) {
                config.httpsAgent = new https.Agent({
                    rejectUnauthorized: false,
                });
                config.headers = this._local_headers;
                return config;
            }

            config.headers = this._headers;
            return config;
        });
    }

    /**
     * Get Headers to make Requests
     */
    private async _getHeaders(): Promise<void> {
        if (!this._auth) {
            return this._getAuthHeaders();
        }

        const { puuid, headers } = await this._auth.authenticate();
        headers["X-Riot-ClientPlatform"] = this._client_platform;
        headers["X-Riot-ClientVersion"] = await this._getClientVersion();

        this._puuid = puuid;
        this._headers = headers;
    }

    /**
     * Get Auth Headers when not have Auth
     */
    private async _getAuthHeaders(): Promise<void> {
        this._local_headers = {
            Authorization: `Basic ${Buffer.from(`riot:${this._lockfile.password}`).toString("base64")}`,
        };

        const {
            data: { accessToken, subject: puuid, token },
        } = await this._fetch("/entitlements/v1/token", "local");

        this._headers = {
            Authorization: `Bearer ${accessToken}`,
            "X-Riot-Entitlements-JWT": token,
            "X-Riot-ClientPlatform": this._client_platform,
            "X-Riot-ClientVersion": await this._getClientVersion(),
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

        return `${branch}-shipping-${buildVersion}-${version.split(".")[3]}`;
    }

    /**
     * Get a lockfile when valorant is running, if dont find lockfile valorant is not running
     */
    private _getLockfile(): LockFileType {
        try {
            const lockfile = readFileSync(this._lockfile_path, { encoding: "utf8" });

            const [name, PID, port, password, protocol] = lockfile.split(":");

            return { name, PID, port, password, protocol };
        } catch (e) {
            throw new ValorantNotRunning();
        }
    }
}

export default Client;
