# Session

Get the current session including player name and PUUID

```js
const currentSession = await client.player.session();
```

Returns
```ts
interface RNETFetchChatSession {
    federated: boolean;
    game_name: string;
    game_tag: string;
    loaded: boolean;
    name: string;
    pid: string;
    puuid: string;
    region: string;
    resource: string;
    state: string;
}
```