import axios from "axios";

const fetch = jest.fn(async <T>(endpoint: string): Promise<T> => {
    const { data } = await axios.get<T>(endpoint);

    return data;
});

const post = jest.fn(async <T>(endpoint: string, body = {}): Promise<T> => {
    const { data } = await axios.post<T>(endpoint, body);

    return data;
});

const put = jest.fn(async <T>(endpoint: string, body = {}): Promise<T> => {
    const { data } = await axios.put<T>(endpoint, body);

    return data;
});

const deleteFunction = jest.fn(async <T>(endpoint: string): Promise<T> => {
    const { data } = await axios.delete<T>(endpoint);

    return data;
});

export { fetch, post, put, deleteFunction };
