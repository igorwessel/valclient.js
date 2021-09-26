# Account XP

Get the account level, XP, and XP history for the active player

```js
const accountXP = await client.pvp.accountXp();
```

Returns
```ts
interface PvpAccountXp {
    Version: number;
    Subject: string;
    Progress: {
        Level: number;
        XP: number;
    };
    History: PvpAccountHistoryXp[];
    LastTimeGrantedFirstWin: string;
    NextTimeFirstWinAvailable: string;
}
```