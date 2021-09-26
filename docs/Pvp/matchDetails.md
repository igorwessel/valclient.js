# Match Details

Get the full info for a previous match
Includes everything that the in-game match details screen shows including damage and kill positions, same as the official API w/ a production key

```js
const matchDetails = await client.pvp.matchDetails("match_id");
```

Returns
```ts
interface PvpMatchDetails {
    matchInfo: {
        matchId: string;
        mapId: string;
        gamePodId: string;
        gameLoopZone: string;
        gameServerAddress: string;
        gameVersion: string;
        gameLengthMillis: number;
        gameStartMillis: number;
        provisioningFlowID: string;
        isCompleted: boolean;
        customGameName: string;
        forcePostProcessing: boolean;
        queueID: string;
        gameMode: string;
        isRanked: boolean;
        canProgressContracts: boolean;
        isMatchSampled: boolean;
        seasonId: string;
        completionState: string;
        platformType: string;
    };
    players: PvpMatchDetailsPlayer[];
    bots: unknown[];
    coaches: unknown[];
    teams: PvpMatchTeams[];
    roundResults: PvpMatchDetailsRoundResult[];
    kills: PvpMatchPlayerStatsKill[];
}
```