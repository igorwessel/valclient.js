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

export { getConfigurationPath, parseQueryString };
