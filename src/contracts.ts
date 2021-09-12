import { ContractsAll } from "@interfaces/contracts";
import { Fetch, Post } from "@interfaces/http";
import { PvpItemProgressDefinitions, PvpItemProgressDefinitionsResponse } from "@interfaces/sharedEndpointResponses";

class Contracts {
    private readonly _fetch: Fetch;
    private readonly _post: Post;
    private readonly _puuid: string;

    constructor(fetch: Fetch, post: Post, puuid: string) {
        this._fetch = fetch;
        this._post = post;
        this._puuid = puuid;
    }

    /**
     *  Contracts_Fetch
     *
     *  Get a list of contracts and completion status including match history
     *  @returns
     */
    async all(): Promise<ContractsAll> {
        const data = await this._fetch<ContractsAll>(`/contracts/v1/contracts/${this._puuid}`, "pd");

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
        const data = await this._post<ContractsAll>(
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
    //     const data = await this._fetch<Record<string, unknown>>("/contracts-definitions/v2/definitions", "pd");

    //
    // }

    /**
     * ContractDefinitions_FetchActiveStory
     *
     * Get the battlepass contracts
     */
    // async battlePass(): Promise<void> {
    //     const data = await this._fetch<Record<string, unknown>>("/contract-definitions/v2/definitions/story", "pd");

    // }

    /**
     * Get item upgrades
     */
    async itemUpgrades(): Promise<PvpItemProgressDefinitions[]> {
        const { Definitions } = await this._fetch<PvpItemProgressDefinitionsResponse>(
            "/contract-definitions/v3/item-upgrades",
            "pd",
        );

        return Definitions;
    }
}

export { Contracts };
