import { getConfigurationPath, parseQueryString } from "@utils";
import { mocked } from "ts-jest/utils";

jest.mock("@utils");

const mockedGetConfigurationPath = mocked(getConfigurationPath, true);
const mockedParseQueryString = mocked(parseQueryString);

describe("Configuration Path", () => {
    afterEach(() => {
        mockedGetConfigurationPath.mockReset();
    });

    test("should return correct local for lockfile", () => {
        mockedGetConfigurationPath.mockReturnValue(
            "C:\\Users\\igor_\\AppData\\Local\\Riot Games\\Riot Client\\Config\\lockfile",
        );

        const filepath = getConfigurationPath("lockfile");

        expect(filepath).toEqual("C:\\Users\\igor_\\AppData\\Local\\Riot Games\\Riot Client\\Config\\lockfile");
    });
});

describe("Parse query string", () => {
    afterEach(() => {
        mockedParseQueryString.mockClear();
    });

    test("should return a object from a query string", () => {
        const queryString = "take=down&cry=somuch";

        mockedParseQueryString.mockReturnValue({
            take: "down",
            cry: "somuch",
        });

        const object = parseQueryString(queryString);

        expect(object).toEqual({
            take: "down",
            cry: "somuch",
        });
    });

    test("should replace query string which start hashtag", () => {
        const queryString = "#take=down&cry=somuch";

        mockedParseQueryString.mockReturnValue({
            take: "down",
            cry: "somuch",
        });

        const object = parseQueryString(queryString);

        expect(object).toEqual({
            take: "down",
            cry: "somuch",
        });
    });
});
