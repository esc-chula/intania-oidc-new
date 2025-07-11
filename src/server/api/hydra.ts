import { Configuration, OAuth2Api } from "@ory/hydra-client";
import { env } from "next-runtime-env";

export const hydra = new OAuth2Api(
    new Configuration({
        basePath: env("HYDRA_ADMIN_URL"),
    }),
);
