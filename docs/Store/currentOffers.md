# Current Offers

Get the currently available items in the store

```js
const currentOffers = await client.store.currentOffers();
```

Returns
```ts
interface CurrentOffersResponse {
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
```