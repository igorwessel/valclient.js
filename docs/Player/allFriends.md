# All Friends

Get a list of friends

```js
const allFriends = await client.player.allFriends();
```

Returns
```ts
interface Friend {
    displayGroup: string;
    game_name: string;
    game_tag: string;
    group: string;
    last_online_ts: number | null;
    name: string;
    note: string;
    pid: string;
    puuid: string;
    region: string;
}
```