# Item Upgrades

Get item upgrades

```js
const itemUpgrades = await client.contracts.itemUpgrades();
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