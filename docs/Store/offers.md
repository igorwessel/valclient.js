# Offers

Get prices for all store items

```js
const offers = await client.store.offers();
```

Returns
```ts
interface OffersResponse {
    Offers: Offer[];
    UpgradeCurrencyOffers: UpgradeCurrencyOffers[];
}
```