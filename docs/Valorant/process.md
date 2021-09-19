# Process

Gets info about the running Valorant process including start arguments

```js
const valorantProcess = await client.valorant.process()
```

Returns
```ts
interface ValorantProcessResponse {
    [key: string]: {
        exitCode: number;
        exitReason: string | null;
        isInternal: boolean | null;
        launchConfiguration: ValorantProcessLaunchConfiguration;
        patchlineFullName: string;
        patchlineId: string;
        phase: string;
        productId: string;
        version: string;
    };
}
```