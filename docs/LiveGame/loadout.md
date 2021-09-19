# Loadout

Get player skins and sprays for an ongoing game

```js
const loadout = await client.live_game.loadout();
```

Returns
```ts
interface CoreGameLoadout {
    CharacterID: string;
    Loadout: {
        Sprays: {
            SpraySelections: CoreGameSpraySelection[];
        };
        Items: CoreGameItem[];
    };
}

interface CoreGameLoadoutResponse {
    Loadouts: CoreGameLoadout[];
}
```