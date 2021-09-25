import { AxiosInstance } from "axios";

import { Regions } from "@type/resources";
import { AuthInput } from "@interfaces/auth";

import { IContracts } from "@interfaces/contracts";
import { IPvp } from "@interfaces/pvp";
import { IValorant } from "@interfaces/valorant";
import { IGroup } from "@interfaces/group";
import { IPlayer } from "@interfaces/player";
import { ILiveGame } from "@interfaces/liveGame";
import { IPreGame } from "@interfaces/preGame";
import { ISession } from "@interfaces/session";
import { IStore } from "@interfaces/store";

import { HttpService } from "@app/http";

export interface IValClient {
    _http_service: HttpService;
    valorant_api: AxiosInstance;
    allRegions: Regions[];
    auth: { username: string; password: string } | null;
    region: string;
    shard: string;
    endpoints: BaseEndpoints;
    init(config: ClientConfig): Promise<void>;
    player: IPlayer | null;
    valorant: IValorant | null;
    group: IGroup | null;
    live_game: ILiveGame | null;
    pre_game: IPreGame | null;
    session: ISession | null;
    pvp: IPvp | null;
    store: IStore | null;
    contracts: IContracts | null;
}

export interface LockFileType {
    name: string;
    PID: string;
    port: string;
    password: string;
    protocol: string;
}

export interface ClientConfig {
    region: Regions;
    auth?: AuthInput;
}

export interface BaseEndpoints {
    pd: string | null;
    glz: string | null;
    shared: string | null;
    local: string | null;
}

export interface LocalHeaders {
    Authorization: string;
}

export interface Headers {
    Authorization: string;
    "X-Riot-Entitlements-JWT": string;
    "X-Riot-ClientPlatform": string;
    "X-Riot-ClientVersion": string;
}
