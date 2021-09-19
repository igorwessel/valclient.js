# Quit Match

Quit a match in the pre-game stage

```js
// If dont pass match_id, get current pre_game match_id

const quitMatch = await client.pre_game.quitMatch("test");
const quitMatch = await client.pre_game.quitMatch();
```

Returns
```ts
boolean
```