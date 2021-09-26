# Competitive Updates

Get recent games and how they changed ranking
There are 3 optional query parameters: start_index, end_index, and queue_id. queue can be one of null, competitive, custom, deathmatch, ggteam, newmap, onefa, snowball, spikerush, or unrated.

```ts
// PARAMS
interface PvpMatchHistoryInput {
    puuid?: string;
    start?: number;
    end?: number;
    queue_id?: Queues;
}
```

```js
const params = { start: 0, end: 15, queue_id: "competitive" };
const compettitiveUpdates = await client.pvp.competitiveUpdates(params);
```

Returns
```ts
interface PvpCompetitiveUpdates {
    Version: number;
    Subject: string;
    Matches: PvpCompetitiveUpdatesMatch[];
}
```
