# Contents

Get names and ids for game content such as agents, maps, guns, etc.

```js
const contents = await client.pvp.contents();
```

Returns
```ts
interface PvpContents {
    Characters: PvpContentItem[];
    Maps: PvpContentItem[];
    Chromas: PvpContentItem[];
    Skins: PvpContentItem[];
    SkinLevels: PvpContentItem[];
    Attachments: PvpContentItem[];
    Equips: PvpContentItem[];
    Themes: PvpContentItem[];
    GameModes: PvpContentItem[];
    Sprays: PvpContentItem[];
    SprayLevels: PvpContentItem[];
    Charms: PvpContentItem[];
    CharmLevels: PvpContentItem[];
    PlayerCards: PvpContentItem[];
    PlayerTitles: PvpContentItem[];
    StorefrontItems: PvpContentItem[];
    Seasons: PvpSeasonsItem[];
    CompetitiveSeasons: PvpCompetitiveSeason[];
    Events: PvpEventItem[];
}
```