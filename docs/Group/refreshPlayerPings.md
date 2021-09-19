# Refresh Player Pings

Refreshes the pings for a player

```js
const refreshPlayerPings = await client.group.refreshPlayerPings();
```

Returns
```ts
interface GroupDetails {
    ID: string;
    MUCName: string;
    VoiceRoomID: string;
    Version: number;
    ClientVersion: string;
    Members: GroupMember[];
    State: string;
    PreviousState: string;
    StateTransitionReason: string;
    Accessibility: string;
    CustomGameData: {
        Settings: CustomGameSettings;
        Membership: {
            teamOne: GroupMembership[] | null;
            teamTwo: GroupMembership[] | null;
            teamSpectate: GroupMembership[] | null;
            teamOneCoaches: GroupMembership[] | null;
            teamTwoCoaches: GroupMembership[] | null;
        };
        MaxPartySize: number;
        AutobalanceEnabled: boolean;
        AutobalanceMinPlayers: number;
    };
    MatchmakingData: { QueueID: Queues; PreferredGamePods: [] };
    Invites: GroupInvite[] | null;
    Requests: Record<string, unknown>[];
    QueueEntryTime: string;
    ErrorNotification: { ErrorType: string; ErroredPlayers: GroupMembership[] | null };
    RestrictedSeconds: number;
    EligibleQueues: Queues[];
    PlatformType: string;
    QueueIneligibilities: Queues[];
    CheatData: { GamePodOverride: string; ForcePostGameProcessing: boolean };
    XPBonuses: Record<string, unknown>[];
}
```