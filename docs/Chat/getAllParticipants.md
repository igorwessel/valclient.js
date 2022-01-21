# Get All Participants

Get information about the participants for all active chats.

```js
const participants = await client.chat.getAllParticipants();
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
