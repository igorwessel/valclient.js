export type State = "OPEN" | "CLOSED";

export type Opaque<T, K extends string> = T & { __typename: K };

export type Base64 = Opaque<string, "base64">;

export type BooleanString = "true" | "false";
