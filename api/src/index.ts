import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { assertNonNullable } from "../libs/assertNonNullable";
import { prisma } from "../prisma/client";

const app = new Elysia().use(
  cors({
    origin: true,
    methods: "*",
  })
);

// Create Memo
type CreateMemoBody = {
  title: string;
};
/**
 * Create Memo
 */
const createMemo = async (body: CreateMemoBody) => {
  const createdMemo = await prisma.memo.create({
    data: { title: body.title },
  });
  return {
    ...createdMemo,
    createdAt: `${createdMemo.createdAt.toLocaleDateString()} ${createdMemo.createdAt.toLocaleTimeString()}`,
    updatedAt: `${createdMemo.updatedAt.toLocaleDateString()} ${createdMemo.updatedAt.toLocaleTimeString()}`,
  };
};
app.post("/api/create/memo", (body) => createMemo(body.body), {
  body: t.Object({
    title: t.String(),
  }),
});

// Update Memo Title
type UpdateMemoBody = {
  id: number;
  title: string;
};
/**
 * update Memo Title
 */
const updateMemo = async (body: UpdateMemoBody) => {
  const updatedMemo = await prisma.memo.update({
    where: { id: body.id },
    data: { title: body.title },
  });

  return {
    ...updatedMemo,
    createdAt: `${updatedMemo.createdAt.toLocaleDateString()} ${updatedMemo.createdAt.toLocaleTimeString()}`,
    updatedAt: `${updatedMemo.updatedAt.toLocaleDateString()} ${updatedMemo.updatedAt.toLocaleTimeString()}`,
  };
};
app.post("/api/update/memo/title", (body) => updateMemo(body.body), {
  body: t.Object({
    id: t.Number(),
    title: t.String(),
  }),
});

// Update Memo State
type UpdateMemoStateBody = {
  id: number;
  marked: boolean;
};
/**
 * update Memo State
 */
const updateMemoState = async (body: UpdateMemoStateBody) => {
  const updatedMemo = await prisma.memo.update({
    where: { id: body.id },
    data: { marked: body.marked },
  });

  return {
    ...updatedMemo,
    createdAt: `${updatedMemo.createdAt.toLocaleDateString()} ${updatedMemo.createdAt.toLocaleTimeString()}`,
    updatedAt: `${updatedMemo.updatedAt.toLocaleDateString()} ${updatedMemo.updatedAt.toLocaleTimeString()}`,
  };
};
app.post("/api/update/memo/state", (body) => updateMemoState(body.body), {
  body: t.Object({
    id: t.Number(),
    marked: t.Boolean(),
  }),
});

// get Memo
app.get("/api/memos", async () => {
  const memos = await prisma.memo.findMany();
  assertNonNullable(memos);

  const convertedMemos = memos.map((memo) => ({
    ...memo,
    createdAt: `${memo.createdAt.toLocaleDateString()} ${memo.createdAt.toLocaleTimeString()}`,
    updatedAt: `${memo.updatedAt.toLocaleDateString()} ${memo.updatedAt.toLocaleTimeString()}`,
  }));
  return convertedMemos;
});

// delete Memo
type DeleteMemoBody = {
  id: number;
};
/**
 * delete Memo
 */
const deleteMemo = async (body: DeleteMemoBody) => {
  const deletedMemo = await prisma.memo.delete({
    where: { id: body.id },
  });

  return {
    ...deletedMemo,
    createdAt: `${deletedMemo.createdAt.toLocaleDateString()} ${deletedMemo.createdAt.toLocaleTimeString()}`,
    updatedAt: `${deletedMemo.updatedAt.toLocaleDateString()} ${deletedMemo.updatedAt.toLocaleTimeString()}`,
  };
};
app.post("/api/delete/memo", (body) => deleteMemo(body.body), {
  body: t.Object({
    id: t.Number(),
  }),
});

// search Memo by title query
type SearchMemoByTitleQuery = {
  q: string;
};
/**
 * search Memo by title query
 */
const searchMemoByTitle = async ({ q }: SearchMemoByTitleQuery) => {
  const searchedMemos = await prisma.memo.findMany({
    where: {
      title: {
        contains: q,
      },
    },
  });

  const convertedMemos = searchedMemos.map((memo) => ({
    ...memo,
    createdAt: `${memo.createdAt.toLocaleDateString()} ${memo.createdAt.toLocaleTimeString()}`,
    updatedAt: `${memo.updatedAt.toLocaleDateString()} ${memo.updatedAt.toLocaleTimeString()}`,
  }));
  return convertedMemos;
};
app.get("/api/memo", ({ query }) => searchMemoByTitle(query), {
  query: t.Object({
    q: t.String(),
  }),
});

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
