# valclient.js

![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg) ![Branches](https://img.shields.io/badge/branches-100%25-brightgreen.svg) ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg) ![Lines](https://img.shields.io/badge/lines-100%25-brightgreen.svg)

Valorant Client API Wrapper in NodeJS

# Usage

```js
const client = new ValClient()

client.init({ region: "br" }) // we try to iniciate client locally when not pass auth
// need to have connected in valorant launcher
    .then(async () => {
        const player = await client.player.current()
    })

// or with async/await

(async () => {
    await client.init({ region: "br" });
    const player = await client.player.current()
})()

// passing auth

client.init({ auth: { username: "teste", password: "teste" }, region: "br" })
    .then(async () => {
        const player = await client.group.current()
    })
```
# Legal

Riot Games, VALORANT, and any associated logos are trademarks, service marks, and/or registered trademarks of Riot Games, Inc.

This project is in no way affiliated with, authorized, maintained, sponsored or endorsed by Riot Games, Inc or any of its affiliates or subsidiaries.

I, the project owner and creator, am not responsible for any legalities that may arise in the use of this project. Use at your own risk.