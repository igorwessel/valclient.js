# Current Available Gamemodes

Get information about the available gamemodes

```js
const currentAvailableGameModes = await client.group.currentAvailableGameModes();
```

Returns
```ts
interface CurrentAvailableGameModeResponse {
    Enabled: boolean;
    EnabledMaps: Maps[];
    EnabledModes: string[];
    Queues: CurrentAvailableGameModeQueue[];
    GamePodPingServiceInfo: CurrentAvailableGameModePing;
}
```