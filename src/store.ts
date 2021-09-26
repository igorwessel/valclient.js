import { IHttp } from "@interfaces/http";
import { CurrentOffersResponse, IStore, OffersResponse, WalletResponse, YourItems } from "@interfaces/store";

import { itemsMappedByName, ItemsType, WalletCurrencies, walletMappedByID } from "@resources";

class Store implements IStore {
    private readonly _http: IHttp;
    private readonly _puuid: string;

    constructor(httpService: IHttp, puuid: string) {
        this._http = httpService;
        this._puuid = puuid;
    }

    /**
     *  Store_GetOffers
     *
     *  Get prices for all store items
     *  @returns
     */
    async offers(): Promise<OffersResponse> {
        const data = await this._http.fetch<OffersResponse>("/store/v1/offers/", "pd");

        return data;
    }

    /**
     *  Store_GetStorefrontV2
     *
     *  Get the currently available items in the store
     *  @returns
     */
    async currentOffers(): Promise<CurrentOffersResponse> {
        const data = await this._http.fetch<CurrentOffersResponse>(`/store/v2/storefront/${this._puuid}`, "pd");

        return data;
    }

    /**
     *  Store_GetWallet
     *
     * Get amount of Valorant points and Radianite the player has
     */
    async wallet(): Promise<Record<WalletCurrencies, number>> {
        const { Balances } = await this._http.fetch<WalletResponse>(`/store/v1/wallet/${this._puuid}`, "pd");

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
    //     const data = await this._httpService.fetch<unknown>(`/store/v1/order/${order_id}`, "pd");
    //     //TODO: i don't find endpoint to create a order, i will desactivate this method
    //     return data;
    // }

    /**
     *  Store_GetEntitlements
     *  List what the player owns (agents, skins, buddies, ect.)
     *  Correlate with the UUIDs in client.pvp.contents() to know what items are owned
     */
    async yourItems<T>(item_type: ItemsType): Promise<YourItems<T>> {
        const id = itemsMappedByName[item_type];

        const data = await this._http.fetch<YourItems<T>>(`/store/v1/entitlements/${this._puuid}/${id}`, "pd");

        return data;
    }
}

export { Store };
