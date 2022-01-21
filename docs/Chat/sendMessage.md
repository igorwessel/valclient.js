# Send Message

Send a message to the specified chat.
You can get CID parameter with getPreGameChat, getLiveGameChat, getAllChat and getPartyChat.

```js
const { conversations } = await client.chat.getAllChat();
const message = await client.chat.sendMessage(conversations[0].cid, "hi!");
```

Parameter

```ts
cid: string;
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
