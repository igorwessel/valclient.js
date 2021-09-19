# Current

Get the Group ID that a given player belongs to

```js
const currentGroup = await client.group.current();
```

Returns
```ts
interface CurrentGroupIdResponse {
    Subject: string;
    Version: number;
    CurrentPartyID: string;
    Invites: null;
    Requests: CurrentGroupRequest[];
    PlatformInfo: {
        platformType: string;
        platformOS: string;
        platformOSVersion: string;
        platformChipset: string;
    };
}
```