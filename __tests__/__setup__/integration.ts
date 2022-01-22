import { ValClient } from "@app/client";

import type { Regions } from "@type/resources";

export const client = new ValClient();

beforeAll(async () => {
    if (!client.auth || !client.endpoints.local) {
        await client.init({ region: process.env.TESTING_VALORANT_REGION as Regions });
    }
});
