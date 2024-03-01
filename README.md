# Nest.js RESTful API template

## Important!

This application is running on port which is described in `.env` file (`APP_PORT`).

After cloning this repo, do these steps:
1. Run
```shell
git rm .env* --cached
```

2. If you want to use Prisma in your project, here is your config for Vercel:
```prisma
datasource db {
  provider = "postgresql"
  url = env("POSTGRES_PRISMA_URL") // uses connection pooling
  directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct connection
}
```
