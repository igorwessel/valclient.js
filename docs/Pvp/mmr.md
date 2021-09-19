# MMR

Get the match making rating for a player
Receives a puuid (id of player) for fetching MMR, if dont pass get current user authenticated MMR.

```js
const mmr = await client.pvp.mmr("another_player_puuid");
```

Returns
```ts
interface PvpMMR {
    Version: number;
    Subject: string;
    NewPlayerExperienceFinished: boolean;
    QueueSkills: {
        competitive: PvpMMRQueueSkill;
        deathmatch: PvpMMRQueueSkill;
        seeding: PvpMMRQueueSkill;
        spikerush: PvpMMRQueueSkill;
        unrated: PvpMMRQueueSkill;
    };
    LatestCompetitiveUpdate: PvpMMRLatestCompetitiveUpdate;
    IsLeaderboardAnonymized: boolean;
    IsActRankBadgeHidden: boolean;
}
```