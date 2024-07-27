<div>
    <h1 align="center">Intania OIDC</h1>
</div>

## Getting started

Getting your Postgres and Redis running. Make a copy of `.env.example` and name
it `.env` and config it to match your setting. `AUTH_KEY` and `AUTH_ENDPOINT`
does not it to be set since it is only use for production.

After thing has been set, seed the database with
```
bun db:migrate

# Don't forget to clone submodule
git submodule update
bun run scripts/seed/index.ts

# Some mock data can also be added.
bun run scripts/seed/mock.ts

# Start the application
bun run dev
```

In the home page (login page), you can login with any username, the password is
the same as username e.g. you can login with username `6560000021` and password
`6560000021`.

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

-   [Documentation](https://create.t3.gg/)
-   [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## Feature plan

- OIDC
- Audit log
