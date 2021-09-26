# Loadout

Get player skins and sprays for a game in the pre-game stage

```js

// Receives match_id parameter or get current match_id in pre_game stage

const loadout = await client.pre_game.loadout("test");

const loadout = await client.pre_game.loadout();
```

Returns
```ts
interface PreGameLoadout {
    Sprays: {
        SpraySelections: CoreGameSpraySelection[];
    };
    Items: CoreGameItem[];
}
```