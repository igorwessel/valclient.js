# Current

Get the ID of a game in the pre-game stage

```js
const preGameCurrent = await client.pre_game.current();
```

Returns
```ts
interface CoreGameResponse {
    Subject: string;
    MatchID: string;
    Version: number;
}
```
