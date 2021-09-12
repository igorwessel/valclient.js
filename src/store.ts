/*



    def store_fetch_entitlements(self, item_type:str="e7c63390-eda7-46e0-bb7a-a6abdacd2433") -> dict:
        '''
        Store_GetEntitlements
        List what the player owns (agents, skins, buddies, ect.)
        Correlate with the UUIDs in client.fetch_content() to know what items are owned
        NOTE: uuid to item type
        "e7c63390-eda7-46e0-bb7a-a6abdacd2433": "skin_level",
        "3ad1b2b2-acdb-4524-852f-954a76ddae0a": "skin_chroma",
        "01bb38e1-da47-4e6a-9b3d-945fe4655707": "agent",
        "f85cb6f7-33e5-4dc8-b609-ec7212301948": "contract_definition",
        "dd3bf334-87f3-40bd-b043-682a57a8dc3a": "buddy",
        "d5f120f8-ff8c-4aac-92ea-f2b5acbe9475": "spray",
        "3f296c07-64c3-494c-923b-fe692a4fa1bd": "player_card",
        "de7caa6b-adf7-4588-bbd1-143831e786c6": "player_title",
        '''
        data = self.fetch(endpoint=f"/store/v1/entitlements/{self.puuid}/{item_type}", endpoint_type="pd")
        return data

*/

import { Fetch } from "@interfaces/http";
import { CurrentOffersResponse, OffersResponse, WalletResponse } from "@interfaces/store";
import { WalletCurrencies, walletMappedByID } from "@resources";
import { saveFileJson } from "@utils";

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
    async order(order_id: string): Promise<unknown> {
        const data = await this._fetch<unknown>(`/store/v1/order/${order_id}`, "pd");
        //TODO: i don't find endpoint to create a order, i will desactivate this method
        return data;
    }
}

export { Store };
