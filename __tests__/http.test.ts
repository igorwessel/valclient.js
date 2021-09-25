import axios from "axios";
import { mocked } from "ts-jest/utils";

import { HttpService } from "@app/http";

import { BaseEndpoints } from "@interfaces/client";
import { EndpointType } from "@type/client";

const base_endpoints: BaseEndpoints = {
    pd: null,
    glz: null,
    shared: null,
    local: null,
};

const endpoint = "/";
const endpointType: EndpointType = "pd";

const returnData = { data: undefined };

const httpService = new HttpService(axios);

jest.mock("axios");

const mockedAxios = mocked(axios, true);

beforeAll(async () => {
    mockedAxios.get.mockResolvedValue(returnData);
    mockedAxios.post.mockResolvedValue(returnData);
    mockedAxios.put.mockResolvedValue(returnData);
    mockedAxios.delete.mockResolvedValue(returnData);

    await httpService.fetch(endpoint, endpointType);
    await httpService.post(endpoint, endpointType);
    await httpService.put(endpoint, endpointType);
    await httpService.del(endpoint, endpointType);
});

afterAll(() => {
    mockedAxios.get.mockReset();
    mockedAxios.post.mockReset();
    mockedAxios.put.mockReset();
    mockedAxios.delete.mockReset();
});

test("[GET]: should do request with correct endpoint based in endpoint type", async () => {
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);

    expect(mockedAxios.get).toHaveBeenCalledWith(`${base_endpoints[endpointType]}${endpoint}`, undefined);
});

test("[POST]: should do request with correct endpoint based in endpoint type", async () => {
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);

    expect(mockedAxios.post).toHaveBeenCalledWith(`${base_endpoints[endpointType]}${endpoint}`, undefined, undefined);
});

test("[PUT]: should do request with correct endpoint based in endpoint type", async () => {
    expect(mockedAxios.put).toHaveBeenCalledTimes(1);

    expect(mockedAxios.put).toHaveBeenCalledWith(`${base_endpoints[endpointType]}${endpoint}`, undefined, undefined);
});

test("[DEL]: should do request with correct endpoint based in endpoint type", async () => {
    expect(mockedAxios.delete).toHaveBeenCalledTimes(1);

    expect(mockedAxios.delete).toHaveBeenCalledWith(`${base_endpoints[endpointType]}${endpoint}`, undefined);
});
