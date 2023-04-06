## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

```bash
npx prisma generate
```

## Docker

.env

```bash
APP_PORT=3001
DATABASE_URL="postgresql://<USER>:<PASSWORD>@0.0.0.0:5432/manga-reader?schema=public"
SECRET="secret"
REFRESH_SECRET="ref-secret"
```

Start Postgres image(Docker):

1:

```bash
$ docker-compose up
```

open new terminal

2:

```bash
$ npx prisma migrate dev --name init
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## License

Nest is [MIT licensed](LICENSE).
