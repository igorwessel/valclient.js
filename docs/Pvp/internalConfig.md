# Internal Config

Get various internal game configuration settings set by Riot

```js
const internalConfig = await client.pvp.internalConfig();
```

Returns
```ts
interface PvpInternalConfig {
    LastApplication: string;
    Collapsed: {
        ARES_MOC_ENTITLEMENT: string;
        "CLIENT.ICONS.ENABLED": BooleanString;
        CLIENT_LEADERBOARDS_ENABLED: BooleanString;
        GAME_ALLOW_CONSOLE: BooleanString;
        GAME_ALLOW_DEVELOPER_MENU: BooleanString;
        GAME_DISABLED_DEATHCAM: BooleanString;
        GAME_DISABLED_SKINS_WEAPONS: string;
        GAME_PERFREPORTING_ENABLED: BooleanString;
        GAME_REMOTE_MOVE_INTERP_ENABLED: BooleanString;
        GAME_ROAMINGSETTINGS_ENABLED: BooleanString;
        GAME_ROAMINGSETTINGS_KEY: string;
        GAME_ROAMINGSETTINGS_STORAGEURL: string;
        MAP_PRELOADING_ENABLED: BooleanString;
        NAMECHECK_PLATFORM_REGION: string;
        NAMECHECK_PLATFORM_URL: string;
        SECURITY_WATERMARK_ENABLED: BooleanString;
        SECURITY_WATERMARK_MAX_OPACITY: string;
        SECURITY_WATERMARK_MIN_OPACITY: string;
        SECURITY_WATERMARK_TILING_FACTOR: string;
        SERVICEURL_ACCOUNT_XP: string;
        SERVICEURL_AGGSTATS: string;
        SERVICEURL_CONTENT: string;
        SERVICEURL_CONTRACTS: string;
        SERVICEURL_CONTRACT_DEFINITIONS: string;
        SERVICEURL_COREGAME: string;
        SERVICEURL_LATENCY: string;
        SERVICEURL_LOGINQUEUE: string;
        SERVICEURL_MASS_REWARDS: string;
        SERVICEURL_MATCHDETAILS: string;
        SERVICEURL_MATCHHISTORY: string;
        SERVICEURL_MATCHMAKING: string;
        SERVICEURL_MMR: string;
        SERVICEURL_NAME: string;
        SERVICEURL_PARTY: string;
        SERVICEURL_PATCHNOTES: string;
        SERVICEURL_PERSONALIZATION: string;
        SERVICEURL_PLAYERFEEDBACK: string;
        SERVICEURL_PREGAME: string;
        SERVICEURL_PROGRESSION: string;
        SERVICEURL_PURCHASEMERCHANT: string;
        SERVICEURL_RESTRICTIONS: string;
        SERVICEURL_SESSION: string;
        SERVICEURL_STORE: string;
        SERVICE_TICKER_MESSAGE: string;
        "SERVICE_TICKER_MESSAGE.de-DE": string;
        "SERVICE_TICKER_MESSAGE.es-MX": string;
        "SERVICE_TICKER_MESSAGE.fr-FR": string;
        "SERVICE_TICKER_MESSAGE.it-IT": string;
        "SERVICE_TICKER_MESSAGE.pl-PL": string;
        "SERVICE_TICKER_MESSAGE.pt-BR": string;
        "SERVICE_TICKER_MESSAGE.ru-RU": string;
        "SERVICE_TICKER_MESSAGE.tr-TR": string;
        SERVICE_TICKER_SEVERITY: string;
        STORESCREEN_OFFERREFRESH_MAXDELAY_MILLISECONDS: string;
        "cap.location": string;
        "characterselect.debugwidgets.hide": BooleanString;
        "chat.v3.enabled": BooleanString;
        "collection.characters.enabled": BooleanString;
        competitiveSeasonOffsetEndTime: string;
        "config.client.telemetry.samplerate": string;
        "content.maps.disabled": string;
        "eog.wip": BooleanString;
        "friends.enabled": BooleanString;
        "game.umgchat.enabled": BooleanString;
        "homescreen.featuredQueues": string;
        "homescreen.promo.enabled": BooleanString;
        "homescreen.promo.key": string;
        "loginqueue.region": string;
        "mainmenubar.collections.enabled": BooleanString;
        "mainmenubar.debug.enabled": BooleanString;
        "mainmenubar.profile.enabled": BooleanString;
        "mainmenubar.progression.enabled": BooleanString;
        "mainmenubar.shootingrange.enabled": BooleanString;
        "mainmenubar.store.enabled": BooleanString;
        "match.details.delay": string;
        "notifications.enabled": BooleanString;
        "parties.auto.balance.enabled": BooleanString;
        "party.observers.enabled": BooleanString;
        "partyinvites.enabled": BooleanString;
        "patchavailability.enabled": BooleanString;
        "ping.packet.count": string;
        "ping.packet.rounds": string;
        "ping.useGamePodsFromParties": BooleanString;
        "ping.useMedian": BooleanString;
        "platformFaulted.level": string;
        "playerfeedbacktool.accessurl": string;
        "playerfeedbacktool.locale": string;
        "playerfeedbacktool.shard": string;
        "playerfeedbacktool.show": BooleanString;
        "playerfeedbacktool.survey_request_rate_float": string;
        "playscreen.custom.enabled": BooleanString;
        "playscreen.partywidget.enabled": BooleanString;
        "playscreen.partywidget.matchmaking.maxsize": string;
        "queue.status.enabled": BooleanString;
        "rchat.ingame.enabled": BooleanString;
        "reporterfeedback.fetch.enabled": BooleanString;
        "reporterfeedback.notifications.enabled": BooleanString;
        "restrictions.v2.fetch.enabled": BooleanString;
        "restrictions.v2.warnings.enabled": BooleanString;
        "riotwarning.fetch.enabled": BooleanString;
        "riotwarning.notifications.enabled": BooleanString;
        "rnet.useAuthenticatedVoice": BooleanString;
        "russia.voice.enabled": BooleanString;
        "shootingtest.enabled": BooleanString;
        "skillrating.enabled": BooleanString;
        "skillrating.inGame.enabled": BooleanString;
        "skillrating.preGame.enabled": BooleanString;
        "social.panel.v6.enabled": BooleanString;
        "socialpanel.v5.enabled": BooleanString;
        "socialviewcontroller.enabled": BooleanString;
        "socialviewcontroller.v2.enabled": BooleanString;
        "store.use_platform_bundle_discounted_prices": BooleanString;
        "temp.voice.allowmuting": BooleanString;
        "tickermanager.deployment": string;
        "vanguard.accessurl": string;
        "voice.provider": string;
        "whisper.enabled": BooleanString;
    };
}
```