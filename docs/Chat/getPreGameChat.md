# Get Pregame Chat

Get information about the pregame chat

```js
const preGameChat = await client.chat.getPreGameChat();
```

Returns

```ts
export type ChatTypes = "chat" | "groupchat";

export interface ChatInfo {
    cid: string;
    direct_messages: boolean;
    global_readership: boolean;
    message_history: boolean;
    mid: string;
    muted: boolean;
    mutedRestriction: boolean;
    type: ChatTypes;
    uiState: { changedSinceHidden: boolean; hidden: boolean };
    unread_count: number;
}

export interface ChatInfoResponse {
    conversations: ChatInfo[];
}
```
