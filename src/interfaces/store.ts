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

export interface BundleItem {
    Item: {
        ItemTypeID: string;
        ItemID: string;
        Amount: number;
    };
    BasePrice: number;
    CurrencyID: string;
    DiscountPercent: number;
    DiscountedPrice: number;
    IsPromoItem: boolean;
}
export interface CurrentOffersResponse {
    FeaturedBundle: {
        Bundle: {
            ID: string;
            DataAssetID: string;
            CurrencyID: string;
            Items: BundleItem[];
        };
        BundleRemainingDurationInSeconds: number;
    };
    SkinsPanelLayout: {
        SingleItemOffers: string[];
        SingleItemOffersRemainingDurationInSeconds: number;
    };
}
