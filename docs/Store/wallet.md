# Wallet

Get amount of Valorant points and Radianite the player has

```js
const wallet = await client.store.wallet()
```

Returns 
```ts
type WalletCurrencies = "valorant_points" | "radianite_points" | "unknown";

type WalletMapped = Record<WalletCurrencies, number>;

{
    "valorant_points": 0,
    "radianite_points": 0,
    "unknown": 0
}
```