# All Friends Online

Get a list of online friends and their activity
private is a base64-encoded JSON string that contains useful information such as party and in-progress game score.
If decode base64-encoded JSON, we have type FriendPrivate for JSON Object

```js
const allFriendsOnline = await client.player.allFriendsOnline();
```

Returns
```ts
interface Presence {
    actor: string | null;
    basic: string | null;
    details: string | null;
    game_name: string | null;
    game_tag: string | null;
    location: string | null;
    msg: string | null;
    name: string | null;
    patchline: null;
    pid: string | null;
    platform: null;
    private: Base64;
    privateJwt: null;
    product: string | null;
    puuid: string | null;
    region: string | null;
    resource: string | null;
    state: string | null;
    summary: string | null;
    time: number | null;
}
```