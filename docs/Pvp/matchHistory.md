# Match History

Get recent matches for a player
There are 3 optional query parameters: start_index, end_index, and queue_id.

```ts
// params
interface PvpMatchHistoryInput {
    puuid?: string;
    start?: number;
    end?: number;
    queue_id?: Queues;
}
```

```js
const params: { puuid: "test", start: 0, end: 15, queue_id: "competitive" };
const matchHistory = await client.pvp.matchHistory(params);
```

Returns
```ts
interface PvpMatchHistory {
    Subject: string;
    BeginIndex: number;
    EndIndex: number;
    Total: number;
    History: PvpMatchHistoryItem[];
}
```
