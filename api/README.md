# Elysia with Bun runtime

## Getting Started

To get started with this template, simply paste this command into your terminal:

```bash
bun create elysia ./elysia-example
```

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

## Prisma Commands

- To migrate

```bash
bunx prisma migrate dev --name init
```

- To reset

```bash
bunx prisma db push --force-reset
```

- To seed from prisma/seed.ts

```bash
bunx prisma db seed
```

## Test API

- Get

```bash
curl -X GET localhost:3000/api/memos/
```

- CREATE

```bash
curl -X POST -H "Content-Type: application/json" -d '{"title":"Test"}' localhost:3000/api/create/memo/
```

- UPDATE: Title

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"id":2, "title":"NewTest"}' localhost:3000/api/update/memo/title
```

- UPDATE: Marked State

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"id":5, "marked": true}' localhost:3000/api/update/memo/state
```

- Delete

```bash
curl -X DELETE -H "Content-Type: application/json" -d '{"id":2}' localhost:3000/api/delete/memo/
```

- Search By Title

```bash
curl -X GET localhost:3000/api/memo?q=Te
```
