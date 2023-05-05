# FASTIFY + PG + REDIS + VUETIFY

## Prepare

```bash
chmod +x ./run.sh
```

## Run

```bash
./run.sh dev
```

or 

```bash
./run.sh prod
```

## Frontend

All connection properties in the `.env` file

## Backend

All connection properties in the `.env` file

Endpoints match: `/api/foo` → `backend/routes/foo/index.js`

## Database

All connection properties in the `.env` file

The initial db scripts should be placed in: `database/initdb` (runs only once if the database does not exist).

To clean the database - remove `database/pgdata` dir

## Redis

All connection properties in the `.env` file


