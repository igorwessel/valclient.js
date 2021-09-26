# Client Settings

Get client settings
```js
const settings = await client.valorant.clientSettings();
```

Returns
```ts
interface ClientSettingsResponse {
    data: {
        actionMappings: ActionMap[];
        axisMapping: Record<string, unknown>[];
        floatSettings: SettingsNumber[];
        intSettings: SettingsNumber[];
        roamingSetttingsVersion: number;
        stringSettings: SettingsString[];
    };
    modified: number;
    type: string;
}
```