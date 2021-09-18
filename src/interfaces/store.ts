import { ItemsType, WalletCurrencies } from "@resources";

export interface IStore {
    offers(): Promise<OffersResponse>;
    currentOffers(): Promise<CurrentOffersResponse>;
    wallet(): Promise<Record<WalletCurrencies, number>>;
    yourItems(item_type: ItemsType): Promise<YourItems>;
}
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

export interface WalletResponse {
    Balances: {
        "85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741": number;
        "e59aa87c-4cbf-517a-5983-6e81511be9b7": number;
        "f08d4ae3-939c-4576-ab26-09ce1f23bb37": number;
    };
}

export interface YourItemsEntitlements {
    TypeID: string;
    ItemID: string;
}
export interface YourItems {
    ItemTypeID: string;
    Entitlements: YourItemsEntitlements[];
}
