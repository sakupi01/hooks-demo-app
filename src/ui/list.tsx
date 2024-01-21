import ListItem from "./list-item";
import { Memo } from "../../types";
import { Dispatch, useRef } from "react";
import { Button } from "./button";

export function MemoListPresenter({
  memos,
  setMemos,
}: {
  memos: Memo[];
  setMemos: Dispatch<React.SetStateAction<Memo[]>>;
}) {
  const ref = useRef<HTMLInputElement>(null);
  async function handleAddMemo(title: Memo["title"]) {
    const addedMemo = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/create/memo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title }),
      }
    ).then((res) => res.json());
    setMemos([...memos, addedMemo]);
  }

  async function handleUpdateMemoTitle(memo: Memo) {
    const updatedMemo = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/update/memo/title`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: memo.id, title: memo.title }),
      }
    ).then((res) => res.json());

    setMemos(
      memos.map((m) => {
        if (m.id === memo.id) {
          return updatedMemo;
        }
        return m;
      })
    );
  }

  async function handleUpdateMemoState(memo: Memo) {
    const updatedMemo = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/update/memo/state`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: memo.id, marked: memo.marked }),
      }
    ).then((res) => res.json());

    setMemos(
      memos.map((m) => {
        if (m.id === memo.id) {
          return updatedMemo;
        }
        return m;
      })
    );
  }

  function handleDeleteMemo(memoId: Memo["id"]) {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/delete/memo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: memoId }),
    });
    setMemos(memos.filter((m) => m.id !== memoId));
  }

  return (
    <main className="flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col md:col-span-4 lg:col-span-4">
        <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
          <div className="bg-white px-6">
            <div className="flex items-center py-4 overflow-hidden ">
              <div className="w-[200px] mr-3">
                <input
                  placeholder="メモを追加"
                  className="truncate text-sm font-semibold md:text-base"
                  ref={ref}
                />
              </div>
              <Button
                icon={"📤"}
                onClick={() => {
                  if (!ref.current) return;
                  if (!ref.current.value) return;
                  handleAddMemo(ref.current.value);
                  ref.current.value = "";
                }}
                className="bg-pink-300"
              />
            </div>
          </div>
          <div className="bg-white px-6">
            {memos.map((memo) => {
              return (
                <ListItem
                  key={memo.id}
                  memo={memo}
                  handleUpdateMemoTitle={handleUpdateMemoTitle}
                  handleUpdateMemoState={handleUpdateMemoState}
                  handleDeleteMemo={handleDeleteMemo}
                />
              );
            })}
          </div>
          <div className="flex items-center pb-2 pt-6">
            📩
            <h3 className="ml-2 text-sm text-gray-500 ">
              最終更新... {new Date().toLocaleTimeString()}
            </h3>
          </div>
        </div>
      </div>
    </main>
  );
}