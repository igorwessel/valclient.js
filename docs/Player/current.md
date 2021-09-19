# Current

Gets current player session authenticated

```js
const currentPlayer = await client.player.current();
```

Returns
```ts
interface CurrentPlayerResponse {
    active: boolean;
    created_datetime: number;
    game_name: string;
    summoner: boolean;
    tag_line: string;
}
```