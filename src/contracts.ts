import { ContractsAll, IContracts } from "@interfaces/contracts";
import { IHttp } from "@interfaces/http";
import { PvpItemProgressDefinitions, PvpItemProgressDefinitionsResponse } from "@interfaces/pvp";

class Contracts implements IContracts {
    private readonly _http: IHttp;
    private readonly _puuid: string;

    constructor(http: IHttp, puuid: string) {
        this._http = http;
        this._puuid = puuid;
    }

    /**
     *  Contracts_Fetch
     *
     *  Get a list of contracts and completion status including match history
     *  @returns
     */
    async all(): Promise<ContractsAll> {
        const data = await this._http.fetch<ContractsAll>(`/contracts/v1/contracts/${this._puuid}`, "pd");

        return data;
    }

    /**
     * Contracts_Activate
     *
     * Activate a particular contract
     * @param contract_id The ID of the contract to activate. Can be found from the definitions method
     * @returns
     */
    async activate(contract_id: string): Promise<ContractsAll> {
        const data = await this._http.post<ContractsAll>(
            `/contracts/v1/contracts/${this._puuid}/special/${contract_id}`,
            "pd",
        );

        return data;
    }

    /**
     * ContractDefinitions_Fetch
     *
     * Get names and descriptions for contracts
     */
    // async definitions(): Promise<void> {
    //     const data = await this._http.fetch<Record<string, unknown>>("/contracts-definitions/v2/definitions", "pd");

    //
    // }

    /**
     * ContractDefinitions_FetchActiveStory
     *
     * Get the battlepass contracts
     */
    // async battlePass(): Promise<void> {
    //     const data = await this._http.fetch<Record<string, unknown>>("/contract-definitions/v2/definitions/story", "pd");

    // }

    /**
     * Get item upgrades
     */
    async itemUpgrades(): Promise<PvpItemProgressDefinitions[]> {
        const { Definitions } = await this._http.fetch<PvpItemProgressDefinitionsResponse>(
            "/contract-definitions/v3/item-upgrades",
            "pd",
        );

        return Definitions;
    }
}

export { Contracts };
