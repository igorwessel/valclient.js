# Send Whisper

Send a whisper to the specified player.
You can get PID parameter with allFriends, allFriendsOnline and pendingFriendsRequests.

```js
const allFriends = await client.player.allFriendsOnline();
const whisper = await client.chat.sendWhisper(allFriends[0].pid, "hi!");
```

Parameter

```ts
pid: string;
```

Returns

```ts
export interface MessageInfo {
    body: string;
    cid: string;
    game_name: string;
    game_tag: string;
    id: string;
    mid: string;
    name: string;
    pid: string;
    puuid: string;
    read: boolean;
    region: string;
    time: string;
    type: string;
}

export interface MessageResponse {
    messages: MessageInfo[];
}
```
