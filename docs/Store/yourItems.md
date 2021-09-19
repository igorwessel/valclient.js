# Your Items

List what the player owns (agents, skins, buddies, ect.)
Correlate with the UUIDs in client.pvp.contents() to know what items are owned

```ts
type ItemsType =
    | "skin_level"
    | "skin_chroma"
    | "agent"
    | "contract_definition"
    | "buddy"
    | "spray"
    | "player_card"
    | "player_title";

const yourItems = await client.store.yourItems("agent")
```

Returns
```ts
interface YourItems {
    ItemTypeID: string;
    Entitlements: YourItemsEntitlements[];
}
```