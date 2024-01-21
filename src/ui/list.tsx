import ListItem from "./list-item";
import { Memo } from "../../types";
import { useRef } from "react";
import { Button } from "./button";

export function MemoListPresenter({ memos }: { memos: Memo[] }) {
  const ref = useRef<HTMLInputElement>(null);

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
                  ref.current.value = "";
                }}
                className="bg-pink-300"
              />
            </div>
          </div>
          <div className="bg-white px-6">
            {memos.map((memo) => {
              return <ListItem key={memo.id} memo={memo} />;
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
