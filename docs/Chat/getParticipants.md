# Get Participants

Get information about the participants for specificy chat.
You can get CID parameter with getPreGameChat, getLiveGameChat, getAllChat and getPartyChat.

```js
const { conversations } = await client.chat.getLiveGameChat();
const participants = await client.chat.getParticipants(conversations[0].cid);
```

Parameter

```
cid: string
```

Returns

```ts
export interface ParticipantInfo {
    cid: string;
    game_name: string;
    game_tag: string;
    muted: boolean;
    name: string;
    pid: string;
    puuid: string;
    region: string;
}

export interface ParticipantsResponse {
    participants: ParticipantInfo[];
}
```
