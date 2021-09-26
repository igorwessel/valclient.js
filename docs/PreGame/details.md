# Details

Get info for a game in the pre-game stage

```js

// Receives match_id parameter or get current match_id in pre_game stage

const details = await client.pre_game.details("test");

const details = await client.pre_game.details();
```

Returns
```ts
interface PreGameDetailsResponse {
    ID: string;
    Version: number;
    Teams: PreGameTeam[];
    AllyTeam: PreGameTeam;
    EnemyTeam: PreGameTeam | null;
    ObserverSubjects: string[];
    MatchCoaches: unknown;
    EnemyTeamSize: number;
    EnemyTeamLockCount: number;
    PregameState: string;
    LastUpdated: string;
    MapID: string;
    GamePodID: string;
    Mode: string;
    VoiceSessionID: string;
    MUCName: string;
    QueueID: string;
    ProvisioningFlowID: string;
    IsRanked: boolean;
    PhaseTimeRemainingNS: number;
    altModesFlagADA: boolean;
}
```