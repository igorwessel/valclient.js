# Player Restrictions

Checks for any gameplay penalties on the account

```js
const restrictions = await client.pvp.playerRestrictions();
```

Returns
```ts
interface PvpPlayerRestrictions {
    Subject: string;
    Penalties: unknown[];
    Version: number;
}
```