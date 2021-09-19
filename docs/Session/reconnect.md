# Reconnect

Try reconnect current game session

```js
const reconnect = await client.session.reconnect();
```

Returns
```ts
interface ReconnectGameSessionResponse {
    reconnect: boolean;
}
```