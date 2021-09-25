import axios from "axios";
import { guns, GunsType } from "@type/loadout";

import { promises as fs } from "fs";
import path from "path";

import { ValorantSkin, ValorantSkinBuddy, ValorantSkinsBuddyResponse, ValorantSkinsResponse } from "@interfaces/utils";

const root = path.resolve(".");

function createUnionTypeForSkins(gun: GunsType, loadout: ValorantSkin[]) {
    const unionType = loadout.reduce(
        (string, valorantskin, index, array) =>
            string + '"' + valorantskin.displayName + '"' + `${index === array.length - 1 ? ";" : "| "}`,
        "",
    );

    return `export type ${gun}Skin = ${unionType}`;
}

function createSkinsIdMappedByName(loadout: ValorantSkin[]) {
    const object = loadout.reduce((obj, skin) => {
        return {
            ...obj,
            [skin.displayName]: skin.uuid,
        };
    }, {});

    return object;
}

function createConditionalTypeForVariant(loadout: ValorantSkin[]): string {
    const chroma = loadout.reduce((string, skin) => {
        const unionTypeChromas = skin.chromas.reduce((stringChroma, chroma, indexChroma, chromaOriginalArray) => {
            let [, chromaName] = chroma.displayName.includes("\n") ? chroma.displayName.split("\n") : [, "Default"];

            chromaName = chromaName.replace(/Variant|\s+|\d|\(|\)/g, "");

            return (
                stringChroma +
                '"' +
                chromaName +
                '"' +
                `${indexChroma === chromaOriginalArray.length - 1 ? " " : " | "}`
            );
        }, "");

        return string + `T extends "${skin.displayName}" ? ${unionTypeChromas} : `;
    }, "");

    return chroma;
}

function createUnionTypeForBuddy(loadout: ValorantSkinBuddy[]): string {
    const unionType = loadout.reduce(
        (string, valorantskin, index, array) =>
            string + '"' + valorantskin.displayName + '"' + `${index === array.length - 1 ? ";" : "| "}`,
        "",
    );

    return `export type BuddyType = ${unionType}`;
}

function createBuddyLevelIdMappedByName(loadout: ValorantSkinBuddy[]): Record<string, unknown> {
    const level = loadout.reduce((obj, buddy) => {
        const levels = buddy.levels.reduce(
            (objBuddyLevel, buddyLevel) => ({ ...objBuddyLevel, [buddyLevel.charmLevel]: buddyLevel.uuid }),
            {},
        );

        return {
            ...obj,
            [buddy.displayName]: levels,
        };
    }, {});

    return level;
}

function createBuddyIdMappedByName(loadout: ValorantSkinBuddy[]): Record<string, unknown> {
    const buddyObject = loadout.reduce((obj, buddy) => {
        return {
            ...obj,
            [buddy.displayName]: buddy.uuid,
        };
    }, {});

    return buddyObject;
}

async function createTypeFile() {
    console.log("Starting update types...");

    const {
        data: { data },
    } = await axios.get<ValorantSkinsResponse>("https://valorant-api.com/v1/weapons/skins");

    const {
        data: { data: buddies },
    } = await axios.get<ValorantSkinsBuddyResponse>("https://valorant-api.com/v1/buddies");

    const fileGeneratedAutomatically = "/* FILE GENERATED AUTOMATICALLY */\n\n";
    const skinsIdMappedByGunName = {};
    let unionType = fileGeneratedAutomatically;
    let buddyUnionType = fileGeneratedAutomatically;
    let chroma = `${fileGeneratedAutomatically}export type VariantSkin<T> = `;

    for (const gun of guns) {
        const skins = data.filter((skin) =>
            gun === "Knife" ? skin.assetPath.includes("Melee") : skin.displayName.includes(gun),
        );

        unionType += `${createUnionTypeForSkins(gun, skins)}\n\n`;
        chroma += `${createConditionalTypeForVariant(skins)}`;
        skinsIdMappedByGunName[gun] = createSkinsIdMappedByName(skins);
    }

    buddyUnionType += createUnionTypeForBuddy(buddies);
    const buddyLevelIdMappedByName = createBuddyLevelIdMappedByName(buddies);
    const buddyIdMappedByName = createBuddyIdMappedByName(buddies);

    await fs.writeFile(`${root}/src/types/skins.ts`, unionType);
    await fs.writeFile(`${root}/src/types/buddies.ts`, buddyUnionType);
    await fs.writeFile(`${root}/src/types/chroma.ts`, chroma + "null;");
    await fs.writeFile(
        `${root}/src/resources/skins.ts`,
        `${fileGeneratedAutomatically}import { SkinsIdMappedByGunName } from "@type/loadout";\n\nexport const skinsIdMappedByGunName: SkinsIdMappedByGunName = ${JSON.stringify(
            skinsIdMappedByGunName,
            null,
            2,
        )}`,
    );

    await fs.writeFile(
        `${root}/src/resources/buddies.ts`,
        `${fileGeneratedAutomatically}import { BuddyIdMappedByName, BuddyLevelIdMappedByName } from "@type/loadout";\n\nexport const buddyIdMappedByName: BuddyIdMappedByName = ${JSON.stringify(
            buddyIdMappedByName,
            null,
            2,
        )}\n\nexport const buddyLevelIdMappedByName: BuddyLevelIdMappedByName = ${JSON.stringify(
            buddyLevelIdMappedByName,
            null,
            2,
        )}`,
    );
}

(async () => {
    await createTypeFile();
    console.log("Update finished!");
})();
