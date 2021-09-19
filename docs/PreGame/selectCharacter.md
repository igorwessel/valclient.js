# Select Character

Select an agent

```js
// Receives paramenter agent and match_id
// If dont pass match_id get current pre_game match_id

const selectedCharacter = await client.pre_game.selectCharacter("Raze", "match_id");
const selectedCharacter = await client.pre_game.selectCharacter("Raze");
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
