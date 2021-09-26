# Crosshair

Get your current profiles settings for crosshair

```js
const crossHair = await client.valorant.crossHair();
```

Returns
```ts
interface CrossHair {
    color: CrossHairColor;
    bHasOutline: boolean;
    outlineThickness: number;
    outlineColor: CrossHairColor;
    outlineOpacity: number;
    centerDotSize: number;
    centerDotOpacity: number;
    bDisplayCenterDot: boolean;
    bFixMinErrorAcrossWeapons: boolean;
    innerLines: CrossHairLine;
    outerLines: CrossHairLine;
}

// with profile name, example: 

{
    "crosshair_name_in_client": {
            color: CrossHairColor;
            bHasOutline: boolean;
            outlineThickness: number;
            outlineColor: CrossHairColor;
            outlineOpacity: number;
            centerDotSize: number;
            centerDotOpacity: number;
            bDisplayCenterDot: boolean;
            bFixMinErrorAcrossWeapons: boolean;
            innerLines: CrossHairLine;
            outerLines: CrossHairLine;
    }
}
```