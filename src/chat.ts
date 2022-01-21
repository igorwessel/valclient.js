import { IChat, Message, ChatInfoResponse, ParticipantsResponse, MessageResponse } from "@interfaces/chat";
import { IHttp } from "@interfaces/http";

class Chat implements IChat {
    private readonly _http: IHttp;

    constructor(http: IHttp) {
        this._http = http;
    }

    /**
     * GET Party Chat Info
     *
     * Get information about the party chat
     *
     * @returns {ChatInfoResponse}
     */
    async getPartyChat(): Promise<ChatInfoResponse> {
        const data = await this._http.fetch<ChatInfoResponse>("/chat/v6/conversations/ares-parties", "local");

        return data;
    }

    /**
     * GET Pregame Chat Info
     *
     * Get information about the pregame chat
     *
     * @returns {ChatInfoResponse}
     */
    async getPreGameChat(): Promise<ChatInfoResponse> {
        const data = await this._http.fetch<ChatInfoResponse>("/chat/v6/conversations/ares-pregame", "local");

        return data;
    }

    /**
     * GET Game Chat Info
     *
     * Get information about the game chat
     *
     * @returns {ChatInfoResponse}
     */
    async getLiveGameChat(): Promise<ChatInfoResponse> {
        const data = await this._http.fetch<ChatInfoResponse>("/chat/v6/conversations/ares-coregame", "local");

        return data;
    }

    /**
     * GET All Chat Info
     *
     * Get information about all active conversations (party, pregame and livegame)
     *
     * @returns {ChatInfoResponse}
     */
    async getAllChat(): Promise<ChatInfoResponse> {
        const data = await this._http.fetch<ChatInfoResponse>("/chat/v6/conversations/", "local");

        return data;
    }

    /**
     * GET TEXT_CHAT_RNet_FetchParticipants
     *
     * Get information about the participants of a chat
     *
     * @param cid e.g: "cid-{1, blue, red, all}@server"
     * @returns {ParticipantsResponse}
     */
    async getParticipants(cid: string): Promise<ParticipantsResponse> {
        const data = await this._http.fetch<ParticipantsResponse>(`/chat/v5/participants/?cid=${cid}`, "local");

        return data;
    }

    /**
     * GET All Chat Participants
     *
     * Get information about all the participants of every active conversation
     *
     * @returns {ParticipantsResponse}
     */
    async getAllParticipants(): Promise<ParticipantsResponse> {
        const data = await this._http.fetch<ParticipantsResponse>("/chat/v5/participants/", "local");

        return data;
    }

    /**
     * GET All Chat History
     *
     * Get chat history for all conversations
     *
     * @returns {MessageResponse}
     */
    async getAllHistory(): Promise<MessageResponse> {
        const data = await this._http.fetch<MessageResponse>("/chat/v6/messages", "local");

        return data;
    }

    /**
     * GET Specific Chat History
     *
     * Get chat history for a specific conversation
     *
     * @param cid e.g: "cid-{1, blue, red, all}@server"
     */
    async getHistory(cid: string): Promise<MessageResponse> {
        const data = await this._http.fetch<MessageResponse>(`/chat/v6/messages?cid=${cid}`, "local");

        return data;
    }

    /**
     * POST Send Whisper
     *
     * Send a whisper to the specified player
     *
     * @param pid - You can get in player.allFriends
     * @param message
     * @returns {MessageResponse}
     */
    async sendWhisper(pid: string, message: string): Promise<MessageResponse> {
        const messageBody: Message = {
            cid: pid,
            message,
            type: "chat",
        };

        const data = await this._http.post<MessageResponse>("/chat/v6/messages/", "local", messageBody);

        return data;
    }

    /**
     * POST Send Chat
     *
     * Send a message to the specified group
     *
     * @param cid  - You can get in chat.getAllChat()
     * @param message
     */
    async sendMessage(cid: string, message: string): Promise<MessageResponse> {
        const messageBody: Message = {
            cid,
            message,
            type: "groupchat",
        };

        const data = await this._http.post<MessageResponse>("/chat/v6/messages/", "local", messageBody);

        return data;
    }
}

export { Chat };
