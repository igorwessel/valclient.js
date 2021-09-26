# Leadersboards

Get the competitive leaderboard for a given season
The query parameter query can be added to search for a username.

```ts
// PARAMS
interface PvpLeaderboardParams {
    season_id?: string;
    query?: string;
    start?: number;
    region?: Regions;
    size?: number;
}
```

```js
const params = { query: "coreano" };
const leaderboard = await client.pvp.leadersboards(params);
```

Returns
```ts
interface PvpLeaderboard {
    Deployment: string;
    QueueID: Extract<Queues, "competitive">;
    SeasonID: string;
    Players: PvpLeaderboardPlayer[];
    totalPlayers: number;
    immortalStartingPage: number;
    immortalStartingIndex: number;
    topTierRRThreshold: number;
    tierDetails: PvpLeaderboardTierDetail;
    startIndex: number;
    query: string;
}
```