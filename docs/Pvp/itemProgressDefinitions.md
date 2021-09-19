# Item Progress Definitions

Get details for item upgrades

```js
const itemProgressDefinitions = await client.pvp.itemProgressDefinitions();
```

Returns
```ts
interface PvpItemProgressDefinitions {
    ID: number;
    Item: PvpItemProgressDefinitionsItem;
    RequiredEntitlement: PvpItemProgressDefinitionsItem;
    ProgressionSchedule: {
        Name: string;
        ProgressionCurrencyID: string;
        ProgressionDeltaPerLevel: unknown | null;
    };
    RewardSchedule: {
        ID: string;
        Name: string;
        Prerequisites: PvpItemProgressPrerequisite | null;
        RewardsPerLevel: PvpItemProgressRewardsPerLevel[] | null;
    };
    Sidegrades: PvpItemProgressDefinitionsSidegrades[];
}
```