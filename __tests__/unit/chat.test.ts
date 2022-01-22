import { Chat } from "@app/chat";
import { mock } from "jest-mock-extended";

import { IHttp } from "@interfaces/http";
import { ChatInfoResponse, MessageResponse, ParticipantsResponse } from "@interfaces/chat";

const mockedHttpService = mock<IHttp>();

const chat = new Chat(mockedHttpService);

const cid = "someid@server";
const friend_pid = "friend@server";

const mockedPartyChatResponse: ChatInfoResponse = {
    conversations: [
        {
            cid: "someid@server",
            direct_messages: true,
            global_readership: false,
            message_history: false,
            mid: "mid",
            muted: false,
            mutedRestriction: false,
            type: "groupchat",
            uiState: {
                changedSinceHidden: false,
                hidden: false,
            },
            unread_count: 0,
        },
    ],
};

const mockedPreGameChatResponse: ChatInfoResponse = {
    conversations: mockedPartyChatResponse.conversations.map((chat) => ({ ...chat, cid: "someid-1@server" })),
};

const mockedLiveGameChatResponse: ChatInfoResponse = {
    conversations: [
        ...mockedPartyChatResponse.conversations.map((chat) => ({ ...chat, cid: "someid-blue@server" })),
        { ...mockedPartyChatResponse.conversations[0], cid: "someid-red@server" },
    ],
};

const mockedAllGameChatResponse: ChatInfoResponse = {
    conversations: [
        ...mockedPreGameChatResponse.conversations,
        ...mockedLiveGameChatResponse.conversations,
        { ...mockedLiveGameChatResponse.conversations[0], cid: "someid-all@server" },
    ],
};

const mockedParticipantsResponse: ParticipantsResponse = {
    participants: [
        {
            cid: "someid@server",
            game_name: "test",
            game_tag: "test",
            muted: false,
            name: "test",
            pid: "test",
            puuid: "test",
            region: "test",
        },
    ],
};

const mockedMessagesResponse: MessageResponse = {
    messages: [
        {
            body: "eae",
            cid: "someid@server",
            game_name: "iws",
            game_tag: "777",
            id: "test",
            mid: "test",
            name: "test",
            pid: "test",
            puuid: "test",
            read: true,
            region: "test",
            time: "test",
            type: "groupchat",
        },
    ],
};

afterEach(() => {
    mockedHttpService.fetch.mockClear();
});

test("should return current info about party chat", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedPartyChatResponse);

    const data = await chat.getPartyChat();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith("/chat/v6/conversations/ares-parties", "local");

    expect(data).toEqual(mockedPartyChatResponse);
});

test("should return current info about pregame chat", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedPreGameChatResponse);

    const data = await chat.getPreGameChat();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith("/chat/v6/conversations/ares-pregame", "local");

    expect(data).toEqual(mockedPreGameChatResponse);
});

test("should return current info about livegame chat", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedLiveGameChatResponse);

    const data = await chat.getLiveGameChat();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith("/chat/v6/conversations/ares-coregame", "local");

    expect(data).toEqual(mockedLiveGameChatResponse);
});

test("should return current info about all chats", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedAllGameChatResponse);

    const data = await chat.getAllChat();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith("/chat/v6/conversations/", "local");

    expect(data).toEqual(mockedAllGameChatResponse);
});

test("should return participants in specific chat", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedParticipantsResponse);

    const data = await chat.getParticipants(cid);

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/chat/v5/participants/?cid=${cid}`, "local");

    expect(data).toEqual(mockedParticipantsResponse);
});

test("should return all participants in all active chats", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedParticipantsResponse);

    const data = await chat.getAllParticipants();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/chat/v5/participants/`, "local");

    expect(data).toEqual(mockedParticipantsResponse);
});

test("should return history from all active chats", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedMessagesResponse);

    const data = await chat.getAllHistory();

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith("/chat/v6/messages", "local");

    expect(data).toEqual(mockedMessagesResponse);
});

test("should return history from specific chat", async () => {
    mockedHttpService.fetch.mockResolvedValueOnce(mockedMessagesResponse);

    const data = await chat.getHistory(cid);

    expect(mockedHttpService.fetch).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.fetch).toHaveBeenCalledWith(`/chat/v6/messages?cid=${cid}`, "local");

    expect(data).toEqual(mockedMessagesResponse);
});

test("should send whisper to friend", async () => {
    const mockedFriendWhisper = {
        messages: [{ ...mockedMessagesResponse.messages[0], cid: friend_pid }],
    };
    const message = "eae";

    mockedHttpService.post.mockResolvedValueOnce(mockedFriendWhisper);

    const data = await chat.sendWhisper(friend_pid, message);

    expect(mockedHttpService.post).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.post).toHaveBeenCalledWith("/chat/v6/messages/", "local", {
        cid: friend_pid,
        message,
        type: "chat",
    });

    expect(data).toEqual(mockedFriendWhisper);
});

test("should send message to any chat", async () => {
    mockedHttpService.post.mockClear();
    mockedHttpService.post.mockResolvedValueOnce(mockedMessagesResponse);

    const message = "eae";

    const data = await chat.sendMessage(cid, message);

    expect(mockedHttpService.post).toHaveBeenCalledTimes(1);

    expect(mockedHttpService.post).toHaveBeenCalledWith("/chat/v6/messages/", "local", {
        cid,
        message,
        type: "groupchat",
    });

    expect(data).toEqual(mockedMessagesResponse);
});
