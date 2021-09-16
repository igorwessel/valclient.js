export interface ISession {
    current(): Promise<CurrentGameSessionResponse>;
    reconnect(): Promise<ReconnectGameSessionResponse>;
}

export interface CurrentGameSessionResponse {
    subject: string;
    cxnState: string;
    clientID: string;
    clientVersion: string;
    loopState: string;
    loopStateMetadata: string;
    version: number;
    lastHeartbeatTime: string;
    expiredTime: string;
    heartbeatIntervalMillis: number;
    playtimeNotification: string;
    playtimeMinutes: number;
    isRestricted: boolean;
    userinfoValidTime: string;
    restrictionType: string;
    clientPlatformInfo: {
        platformType: string;
        platformOS: string;
        platformOSVersion: string;
        platformChipset: string;
    };
}

export interface ReconnectGameSessionResponse {
    reconnect: boolean;
}
