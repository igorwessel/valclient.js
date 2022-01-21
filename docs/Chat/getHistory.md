# Get Chat History

Get history for specificy chat.
You can use getPreGameChat, getLiveGameChat, getAllChat and getPartyChat to get CID for each chat.

```js
const { conversations } = await client.chat.getLiveGameChat();
const history = await client.chat.getHistory(conversations[0].cid);
```

Parameter

```
cid: string
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
