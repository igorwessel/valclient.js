# Get All Chats History

Get history for all active chats (party, pregame, livegame and whisper)

```js
const allHistory = await client.chat.getAllHistory();
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
