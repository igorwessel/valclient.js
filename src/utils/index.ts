import * as nodePath from "path";
import fs from "fs";
import { AxiosRequestConfig } from "axios";

function loadEnvBasedEnvironment(path = "./"): string {
    const environment = process.env.NODE_ENV;
    const rootDir: string = nodePath.resolve(path);
    const files = fs.readdirSync(rootDir);
    const env =
        files.filter((file: string) => file.includes(".env")).find((env: string) => env.includes(environment)) ||
        ".env";
    return nodePath.resolve(rootDir, env);
}

function getConfigurationPath(file: string): string {
    return nodePath.resolve(process.env.LOCALAPPDATA, "./Riot Games/Riot Client/Config/", file);
}

export { loadEnvBasedEnvironment, getConfigurationPath };
