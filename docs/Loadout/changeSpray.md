# Change Spray

Loadout changes take effect when starting a new game

```js
const changeSpray = await client.loadout.changeSpray("Caught on Camera Spray", "PreRound");
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

// or when you don't have the selected skin
null
```