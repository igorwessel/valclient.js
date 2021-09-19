# Change Loadout

Loadout changes take effect when starting a new game
Receives a parameters:
```ts
type PvpLoadoutParams = Pick<PvpLoadout, "Guns" | "Sprays" | "Identity" | "Incognito">;

/*
    {
        Guns: [],
        Spray: [],
        Identity: {
            PlayerCardID: string;
            PlayerTitleID: string;
            AccountLevel: number;
            PreferredLevelBorderID: string;
            HideAccountLevel: boolean;
        },
        Incognito: boolean,
    }

*/
```

```js
const changeLoadout = await client.pvp.changeLoadout({ Guns: [...]})
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