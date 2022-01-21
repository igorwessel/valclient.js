export interface IChat {
    getPartyChat(): Promise<ChatInfoResponse>;
    getPreGameChat(): Promise<ChatInfoResponse>;
    getLiveGameChat(): Promise<ChatInfoResponse>;
    getAllChat(): Promise<ChatInfoResponse>;
    getParticipants(cid: string): Promise<ParticipantsResponse>;
    getAllParticipants(): Promise<ParticipantsResponse>;
    getAllHistory(): Promise<MessageResponse>;
    getHistory(cid: string): Promise<MessageResponse>;
    sendWhisper(pid: string, message: string): Promise<MessageResponse>;
    sendMessage(cid: string, message: string): Promise<MessageResponse>;
}

export type ChatTypes = "chat" | "groupchat";

export interface Message {
    cid: string;
    message: string;
    type: ChatTypes;
}

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
