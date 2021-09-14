import { Fetch } from "@interfaces/http";
import { CurrentOffersResponse, OffersResponse, WalletResponse, YourItems } from "@interfaces/store";
import { itemsMappedByName, ItemsType, WalletCurrencies, walletMappedByID } from "@resources";

class Store {
    private readonly _fetch: Fetch;
    private readonly _puuid: string;

    constructor(fetch: Fetch, puuid: string) {
        this._fetch = fetch;
        this._puuid = puuid;
    }

    /**
     *  Store_GetOffers
     *
     *  Get prices for all store items
     *  @returns
     */
    async offers(): Promise<OffersResponse> {
        const data = await this._fetch<OffersResponse>("/store/v1/offers/", "pd");

        return data;
    }

    /**
     *  Store_GetStorefrontV2
     *
     *  Get the currently available items in the store
     *  @returns
     */
    async currentOffers(): Promise<CurrentOffersResponse> {
        const data = await this._fetch<CurrentOffersResponse>(`/store/v2/storefront/${this._puuid}`, "pd");

        return data;
    }

    /**
     *  Store_GetWallet
     *
     * Get amount of Valorant points and Radianite the player has
     */
    async wallet(): Promise<Record<WalletCurrencies, number>> {
        const { Balances } = await this._fetch<WalletResponse>(`/store/v1/wallet/${this._puuid}`, "pd");

        const balanceIds = Object.keys(Balances);

        const walletMapped = balanceIds.reduce(
            (initialValue, balanceId) => ({ ...initialValue, [walletMappedByID[balanceId]]: Balances[balanceId] }),
            {} as Record<WalletCurrencies, number>,
        );

        return walletMapped;
    }

    /**
     * Store_GetOrder
     *
     * The ID of the order. Can be obtained when creating an order.
     * @param order_id
     * @returns
     */
    // async order(order_id: string): Promise<unknown> {
    //     const data = await this._fetch<unknown>(`/store/v1/order/${order_id}`, "pd");
    //     //TODO: i don't find endpoint to create a order, i will desactivate this method
    //     return data;
    // }

    /**
     *  Store_GetEntitlements
     *  List what the player owns (agents, skins, buddies, ect.)
     *  Correlate with the UUIDs in client.fetch_content() to know what items are owned
     */
    async yourItems(item_type: ItemsType): Promise<YourItems> {
        // TODO: change JSDocs correlate to correct method

        const id = itemsMappedByName[item_type];

        const data = await this._fetch<YourItems>(`/store/v1/entitlements/${this._puuid}/${id}`, "pd");

        return data;
    }
}

export { Store };
