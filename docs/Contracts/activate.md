# Activate

Activate a particular contract
Receives a contract id, at the moment , the endpoint that took the contract ids is disabled

```js
const activateContract = await client.contracts.activate("contract_id_example")
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