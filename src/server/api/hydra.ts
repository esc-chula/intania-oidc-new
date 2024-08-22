import { Configuration, OAuth2Api } from "@ory/hydra-client";

export const hydra = new OAuth2Api(
    new Configuration({
        basePath: process.env.HYDRA_ADMIN_URL,
    }),
);
