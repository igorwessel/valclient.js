# Change client Settings

Update client settings need to reopen game to see modifications.

Example:

```js
const actualSettings = await client.valorant.clientSettings();

const newSettings = {
    ...actualSettings.data,
    floatSettings: actualSettings.data.floatSettings.map((setting) =>
        setting.settingEnum.includes("MouseSensitivity") ? { ...setting, value: 0.5 } : setting,
    ),
};

await client.valorant.changeSettings(newSettings);
```

Param

```ts
export interface ClientSettings {
    actionMappings: ActionMap[];
    axisMapping: Record<string, unknown>[];
    floatSettings: SettingsNumber[];
    intSettings: SettingsNumber[];
    roamingSetttingsVersion: number;
    stringSettings: SettingsString[];
    settingsProfiles: string[];
}
```

Returns

```ts
interface ClientSettingsResponse {
    data: string;
    modified: number;
    type: string;
}
```
