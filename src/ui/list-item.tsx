import clsx from "clsx";
import { Memo } from "../../types/index";
import { Button } from "./button";
import { useRef, memo } from "react";
type ListItemProps = {
  memo: Memo;
  handleUpdateMemoTitle: (memo: Memo) => void;
  handleUpdateMemoState: (memo: Memo) => void;
  handleDeleteMemo: (memoId: Memo["id"]) => void;
};
// ✅memoを利用してpropsが変更されていない場合はコンポーネントの再レンダーをスキップ
// コンポーネントに渡されるhandle...関数はuseCallbackによりキャッシュされているため、
// propsが変更されていない場合は、コンポーネントの再レンダーがスキップされる。
export const MechaOsoiListItem = memo(function MechaOsoiListItem({
  memo,
  handleUpdateMemoTitle,
  handleUpdateMemoState,
  handleDeleteMemo,
}: ListItemProps) {
  console.log("!!!!!SIGNIFICANT PERFORMANCE ISSUE IN LIST ITEM!!!!!");
  const startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // 🦥 0.5秒間何もしない
  }

  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      key={memo.id}
      className={clsx(
        "flex flex-row items-center justify-between py-4 overflow-hidden border-t"
      )}
    >
      <div className="flex items-center">
        <div className="w-[200px] mr-3">
          <input
            defaultValue={memo.title}
            className="truncate text-sm font-semibold bg-transparent md:text-base"
            ref={ref}
          />
        </div>
        <Button
          icon={"✏️"}
          onClick={() => {
            if (!ref.current) return;
            if (!ref.current.value) return;
            if (ref.current.value === memo.title) return;
            handleUpdateMemoTitle({
              ...memo,
              title: ref.current.value,
            });
          }}
          className="bg-purple-400"
        />
      </div>
      <div className="flex justify-center items-center">
        {memo.marked ? (
          <p
            className={`truncate text-sm font-medium md:text-base`}
            onClick={() =>
              handleUpdateMemoState({ ...memo, marked: !memo.marked })
            }
            role="button"
          >
            ❤️
          </p>
        ) : (
          <p
            className={`truncate text-sm font-medium md:text-base`}
            onClick={() =>
              handleUpdateMemoState({ ...memo, marked: !memo.marked })
            }
            role="button"
          >
            🩶
          </p>
        )}
        <div className="w-[400px] flex items-center justify-between">
          <p className="w-full text-sm text-gray-500 text-right sm:block">
            {memo.updatedAt.toString()}
          </p>
          <Button icon={"🗑️"} onClick={() => handleDeleteMemo(memo.id)} />
        </div>
      </div>
    </div>
  );
});
