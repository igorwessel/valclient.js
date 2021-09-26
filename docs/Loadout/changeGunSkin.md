# Change Gun Skin

Loadout changes take effect when starting a new game

```js
const changeGunSkin = await client.loadout.changeGunSkin("Guardian", "Oni Guardian", "Level 4", "Black");
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