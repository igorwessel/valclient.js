# Loadout 

Get the player's current loadout

```js
const current = await client.loadout.current();
```

Returns
```ts
interface LoadoutResponse {
    Subject: string;
    Version: number;
    Guns: PvpLoadoutGun[];
    Sprays: PvpLoadoutSpray[];
    Identity: PvpLoadoutIdentity;
    Incognito: boolean;
} 
```