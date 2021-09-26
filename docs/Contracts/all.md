# All

Get a list of contracts and completion status including match history

```js
const contracts = await client.contracts.all()
```

Returns

```ts
interface ContractsAll {
    Version: number;
    Subject: string;
    Contracts: Contract[];
    ProcessedMatches: ProcessedMatch[];
    ActiveSpecialContract: string;
    Missions: Mission[];
    MissionMetadata: {
        NPECompleted: boolean;
        WeeklyCheckpoint: string;
        WeeklyRefillTime: string;
    };
}
```