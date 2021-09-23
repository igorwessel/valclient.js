import { Guns } from "@app/types/loadout";
import { PvpContentItem } from "@interfaces/pvp";
import path from "path";

function getConfigurationPath(file: string): string {
    return path.resolve(process.env.LOCALAPPDATA, "./Riot Games/Riot Client/Config/", file);
}

function parseQueryString<T>(querystring: string): Record<string, string> | T {
    querystring = querystring.replace("#", "");

    return querystring.split("&").reduce((obj, string) => {
        const [key, value] = string.split("=");

        return {
            ...obj,
            [key]: value,
        };
    }, {});
}

function createTypeAndMappedObjectByName(
    name: string,
    loadout: PvpContentItem[],
): { type: string; mappedByType: Record<string, string> } {
    const type = loadout
        .filter((gun) => gun.Name.includes(name))
        .reduce((string, gun) => string + "'" + gun.Name + "'" + " | ", "");

    const mappedByType = loadout
        .filter((gun) => gun.Name.includes(name))
        .reduce((obj, gun) => ({ ...obj, [gun.Name]: gun.ID }), {});

    return { type, mappedByType };
}

function createTypeAndMappedLevelByWeaponName(
    name: string,
    loadout: PvpContentItem[],
): { mappedByType: Record<string, string> } {
    const mappedByType = loadout
        .filter((gun) => gun.Name.includes(name))
        .reduce((obj, gun) => {
            const level = gun.Name.match(/Level \d/g).toString();
            const gunName = gun.Name.match(/.+(?= Level \d)/g).toString();

            if (level) {
                return { ...obj, [gunName]: { ...obj[gunName], [level]: gun.ID } };
            }
            return { ...obj, [gun.Name]: { ...obj[gun.Name], default: gun.ID } };
        }, {});
    return { mappedByType };
}

function createConditionalTypeForVariant(gunName: Guns, loadout: PvpContentItem[]): string {
    loadout = loadout.filter((gun) =>
        gunName === "Knife" ? gun.AssetName.includes("Melee") : gun.Name.includes(gunName),
    );

    const mappedByType = loadout.reduce((obj, gun) => {
        let [gunName, variant] = gun.Name.includes("\n") ? gun.Name.split("\n") : gun.Name.split("(");

        gunName = gunName.replace(/Level|\d|\r/g, "").trim();

        if (variant) {
            variant = variant.replace(/Variant|\s+|\d|\(|\)/g, "");

            return {
                ...obj,
                [gunName]: {
                    ...obj[gunName],
                    [variant]: gun.ID,
                },
            };
        }

        return {
            ...obj,
            [gunName]: {
                ...obj[gunName],
                Default: gun.ID,
            },
        };
    }, {});

    const string = Object.entries(mappedByType).reduce(
        (string, [skinName, variantValues], indexType, originalArrayType) => {
            const values = Object.keys(variantValues).reduce(
                (initial, variantValue, currentIndex, originalArray) =>
                    initial + '"' + variantValue + `" ${currentIndex === originalArray.length - 1 ? "" : "|"}`,
                "",
            );

            return (
                string +
                `T extends "${skinName}" ? ${values} : ${indexType === originalArrayType.length - 1 ? "null" : ""}`
            );
        },
        "",
    );

    return string;
}

export {
    getConfigurationPath,
    parseQueryString,
    createTypeAndMappedObjectByName,
    createTypeAndMappedLevelByWeaponName,
    createConditionalTypeForVariant,
};
