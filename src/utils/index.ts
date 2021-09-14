import path from "path";
import { promises as fs } from "fs";

function getConfigurationPath(file: string): string {
    return path.resolve(process.env.LOCALAPPDATA, "./Riot Games/Riot Client/Config/", file);
}

async function saveFileJson(name: string, data: Record<string, unknown>): Promise<void> {
    const root = path.resolve("./");
    await fs.writeFile(`${root}/${name}`, JSON.stringify(data, null, 2));
}

function parseQueryString<T>(querystring: string): Record<string, string> | T {
    if (querystring.startsWith("#")) {
        querystring = querystring.replace("#", "");
    }

    return querystring.split("&").reduce((obj, string) => {
        const [key, value] = string.split("=");

        return {
            ...obj,
            [key]: value,
        };
    }, {});
}

export { getConfigurationPath, saveFileJson, parseQueryString };
