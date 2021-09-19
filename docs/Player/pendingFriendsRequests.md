# Pending Friends Requests

Get pending friend requests

```js
const pendingFriendsRequest = await client.player.pendingFriendsRequests();
```

Returns
```ts
interface PendingFriendRequest {
    game_name: string;
    game_tag: string;
    name: string;
    note: string;
    pid: string;
    puuid: string;
    region: string;
    subscription: string;
}
```