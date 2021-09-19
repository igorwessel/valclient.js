# Online Friend

Only works on self or active user's friends.
Use puuid passed in parameter or yourself puuid when not pass puuid.

```js
const onlineFriend = await client.player.onlineFriend();
const onlineFriend = await client.player.onlineFriend("friend_puuid");
```

Returns
```ts
interface PresencePrivate {
    championId: string | null;
    companionId: string | null;
    gameId: string | null;
    gameMode: string | null;
    gameQueueType: string | null;
    gameStatus: string | null;
    iconOverride: string | null;
    isObservable: string | null;
    level: string | null;
    mapId: string | null;
    masteryScore: string | null;
    profileIcon: string | null;
    pty: PresencePrivateParty;
    puuid: string | null;
    queueId: string | null;
    rankedLeagueDivision: string | null;
    rankedLeagueQueue: string | null;
    rankedLeagueTier: string | null;
    rankedLosses: string | null;
    rankedSplitRewardLevel: string | null;
    rankedWins: string | null;
    regalia: PresencePrivateRegalia;
    skinVariant: string | null;
    skinname: string | null;
    timeStamp: string | null;
}
```