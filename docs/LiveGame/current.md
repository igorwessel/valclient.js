# Current

Get the game ID for an ongoing game the player is in

```js
const currentOngoingGame = await client.live_game.current();
```

Returns
```ts
interface CoreGameResponse {
    Subject: string;
    MatchID: string;
    Version: number;
}
```