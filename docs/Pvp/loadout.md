# Loadout 

Get the player's current loadout

```js
const current = await client.pvp.loadout();
```

Returns
```ts
interface PvpLoadout {
    Subject: string;
    Version: number;
    Guns: PvpLoadoutGun[];
    Sprays: PvpLoadoutSpray[];
    Identity: PvpLoadoutIdentity;
    Incognito: boolean;
}
```