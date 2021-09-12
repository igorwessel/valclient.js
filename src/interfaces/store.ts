export interface UpgradeCurrencyOffers {
    OfferID: string;
    StorefrontItemID: string;
}
export interface OfferReward {
    ItemTypeID: string;
    ItemID: string;
    Quantity: number;
}

export interface Offer {
    OfferID: string;
    IsDirectPurchase: boolean;
    StartDate: string;
    Cost: {
        [key: string]: number;
    };
    Rewards: OfferReward[];
}

export interface OffersResponse {
    Offers: Offer[];
    UpgradeCurrencyOffers: UpgradeCurrencyOffers[];
}
