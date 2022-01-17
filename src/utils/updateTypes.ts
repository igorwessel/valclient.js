import axios from "axios";
import { guns, GunsType } from "@type/loadout";

import { promises as fs } from "fs";
import path from "path";

import {
    CreateIdMappedByNameParameter,
    CreateLevelIdMappedByNameParameter,
    ValorantSkin,
    ValorantSkinBuddy,
    ValorantSkinsBuddyResponse,
    ValorantSkinSpray,
    ValorantSkinsResponse,
    ValorantSkinsSpraysResponse,
} from "@interfaces/utils";

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

function createSkinsLevelsIdMappedByName(loadout: ValorantSkin[]) {
    const object = loadout.reduce((obj, skin) => {
        const levels = skin.levels.reduce((objLevel, level) => {
            const levelKey = level.displayName ? level.displayName.match(/Level \d/g) : "Level 2";

            return {
                ...objLevel,
                [levelKey ? levelKey.toString() : "Level 1"]: level.uuid,
            };
        }, {});

        return {
            ...obj,
            [skin.displayName]: levels,
        };
    }, {});

    return object;
}

function createSkinsChromasIdMappedByName(loadout: ValorantSkin[]) {
    const object = loadout.reduce((obj, skin) => {
        const chromas = skin.chromas.reduce((objChroma, chroma) => {
            let [, chromaName] = chroma.displayName.includes("\n") ? chroma.displayName.split("\n") : [, "Default"];

            chromaName = chromaName.replace(/Variant|\s+|\d|\(|\)/g, "");

            return {
                ...objChroma,
                [chromaName]: chroma.uuid,
            };
        }, {});

        return {
            ...obj,
            [skin.displayName]: chromas,
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

function createUnionType<T extends CreateIdMappedByNameParameter>(loadout: T[], typeName: string): string {
    const unionType = loadout.reduce(
        (string, valorantskin, index, array) =>
            string + '"' + valorantskin.displayName + '"' + `${index === array.length - 1 ? ";" : "| "}`,
        "",
    );

    return `export type ${typeName} = ${unionType}`;
}

function createLevelIdMappedByName<T extends CreateLevelIdMappedByNameParameter<T>>(
    loadout: T[],
): Record<string, unknown> {
    const level = loadout.reduce((obj, mapped) => {
        const levels = mapped.levels.reduce(
            (objMappedLevel, mappedLevel) => ({
                ...objMappedLevel,
                [mappedLevel[`${"charmLevel" in mappedLevel ? "charmLevel" : "sprayLevel"}`]]: mappedLevel.uuid,
            }),
            {},
        );

        return {
            ...obj,
            [mapped.displayName]: levels,
        };
    }, {});

    return level;
}

function createIdMappedByName<T extends CreateIdMappedByNameParameter>(loadout: T[]): Record<string, unknown> {
    const buddyObject = loadout.reduce((obj, buddy) => {
        return {
            ...obj,
            [buddy.displayName]: buddy.uuid,
        };
    }, {});

    return buddyObject;
}

async function createSkinsFiles(skinsData: ValorantSkin[], startingFileData: string) {
    const skinsIdMappedByGunName = {};
    let unionType = startingFileData;
    let chroma = `${startingFileData}export type VariantSkin<T> = `;

    for (const gun of guns) {
        const skins = skinsData.filter((skin) =>
            gun === "Knife" ? skin.assetPath.includes("Melee") : skin.displayName.includes(gun),
        );

        unionType += `${createUnionTypeForSkins(gun, skins)}\n\n`;
        chroma += `${createConditionalTypeForVariant(skins)}`;
        skinsIdMappedByGunName[gun] = createSkinsIdMappedByName(skins);
    }

    const skinsChromasMapped = createSkinsChromasIdMappedByName(skinsData);
    const skinsLevelsMapped = createSkinsLevelsIdMappedByName(skinsData);

    await fs.writeFile(`${root}/src/types/skins.ts`, unionType);
    await fs.writeFile(`${root}/src/types/chroma.ts`, chroma + "null;");
    await fs.writeFile(
        `${root}/src/resources/skins.ts`,
        [
            startingFileData,
            'import { SkinsIdMappedByGunName, SkinsLevelsMapped, SkinsVariantsMapped } from "@type/loadout";',
            `export const skinsIdMappedByGunName: SkinsIdMappedByGunName = ${JSON.stringify(
                skinsIdMappedByGunName,
                null,
                2,
            )};`,
            `export const skinsLevelMappedByName: SkinsLevelsMapped = ${JSON.stringify(skinsLevelsMapped, null, 2)};`,
            `export const skinsChromasMappedByName: SkinsVariantsMapped = ${JSON.stringify(
                skinsChromasMapped,
                null,
                2,
            )};`,
        ].join("\n\n"),
    );
}

async function createBuddiesFiles(buddiesData: ValorantSkinBuddy[], startingFileData: string) {
    const buddyUnionType = `${startingFileData}${createUnionType(buddiesData, "BuddyType")}`;
    const buddyLevelIdMappedByName = createLevelIdMappedByName(buddiesData);
    const buddyIdMappedByName = createIdMappedByName(buddiesData);

    await fs.writeFile(`${root}/src/types/buddies.ts`, buddyUnionType);

    await fs.writeFile(
        `${root}/src/resources/buddies.ts`,
        `${startingFileData}import { BuddyIdMappedByName, BuddyLevelIdMappedByName } from "@type/loadout";\n\nexport const buddyIdMappedByName: BuddyIdMappedByName = ${JSON.stringify(
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

async function createSprayFiles(spraysData: ValorantSkinSpray[], startingFileData: string) {
    const spraysUnionType = `${startingFileData}${createUnionType(spraysData, "SprayType")}`;
    const sprayLevelIdMappedByName = createLevelIdMappedByName(spraysData);
    const sprayIdMappedByName = createIdMappedByName(spraysData);

    await fs.writeFile(`${root}/src/types/sprays.ts`, spraysUnionType);

    await fs.writeFile(
        `${root}/src/resources/sprays.ts`,
        `${startingFileData}import { SprayIdMappedByName, SprayLevelIdMappedByName } from "@type/loadout";\n\nexport const sprayIdMappedByName: SprayIdMappedByName = ${JSON.stringify(
            sprayIdMappedByName,
            null,
            2,
        )}\n\nexport const sprayLevelIdMappedByName: SprayLevelIdMappedByName = ${JSON.stringify(
            sprayLevelIdMappedByName,
            null,
            2,
        )}`,
    );
}

async function createAgentsFiles<G>(agentsData: G & { uuid: string; displayName: string }[], startingFileData) {
    const agentsUnionType = createUnionType(agentsData, "Agents");
    const agentsIdMappedByName = createIdMappedByName(agentsData);

    await fs.writeFile(`${root}/src/types/agents.ts`, [startingFileData, agentsUnionType]);

    await fs.writeFile(`${root}/src/resources/agents.ts`, [
        startingFileData,
        'import { Agents } from "@type/agents";\n\n',
        "export const agentsMappedById: Record<Agents, string> = ",
        JSON.stringify(agentsIdMappedByName, null, 2),
    ]);
}

(async () => {
    console.log("Starting update types...");

    const {
        data: { data: skins },
    } = await axios.get<ValorantSkinsResponse>("https://valorant-api.com/v1/weapons/skins");

    const {
        data: { data: buddies },
    } = await axios.get<ValorantSkinsBuddyResponse>("https://valorant-api.com/v1/buddies");

    const {
        data: { data: sprays },
    } = await axios.get<ValorantSkinsSpraysResponse>("https://valorant-api.com/v1/sprays");

    const {
        data: { data: agents },
    } = await axios.get<ValorantSkinsSpraysResponse>("https://valorant-api.com/v1/agents?isPlayableCharacter=true");

    const fileGeneratedAutomatically = "/* FILE GENERATED AUTOMATICALLY */\n\n";

    await createSkinsFiles(skins, fileGeneratedAutomatically);
    await createBuddiesFiles(buddies, fileGeneratedAutomatically);
    await createSprayFiles(
        sprays.filter((spray) => !spray.displayName.includes("(ツ)")),
        fileGeneratedAutomatically,
    );
    await createAgentsFiles(agents, fileGeneratedAutomatically);

    console.log("Update finished!");
})();
