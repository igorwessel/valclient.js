# Details

Get information about an ongoing game

```js
const detailsOngoingGame = await client.live_game.details();
```

Returns
```ts
interface CoreGameDetailsResponse {
    MatchID: string;
    Version: number;
    State: string;
    MapID: string;
    ModeID: string;
    ProvisioningFlow: string;
    GamePodID: string;
    AllMUCName: string;
    TeamMUCName: string;
    TeamVoiceID: string;
    IsReconnectable: boolean;
    ConnectionDetails: CoreGameConnectionDetails;
    PostGameDetails: unknown | null;
    Players: CoreGamePlayer[];
    MatchmakingData: unknown | null;
}
```