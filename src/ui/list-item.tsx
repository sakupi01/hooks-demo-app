import clsx from "clsx";
import { Memo } from "../../types/index";
import { Button } from "./button";
import { useRef } from "react";
type ListItemProps = {
  memo: Memo;
};
export default function ListItem({ memo }: ListItemProps) {
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
            className="truncate text-sm font-semibold md:text-base"
            ref={ref}
          />
        </div>
        <Button
          icon={"✏️"}
          onClick={() => {
            if (!ref.current) return;
            if (!ref.current.value) return;
            if (ref.current.value === memo.title) return;
          }}
          className="bg-purple-400"
        />
      </div>
      <div className="flex justify-center items-center">
        {memo.marked ? (
          <p
            className={`truncate text-sm font-medium md:text-base`}
            onClick={() => {}}
            role="button"
          >
            ❤️
          </p>
        ) : (
          <p
            className={`truncate text-sm font-medium md:text-base`}
            onClick={() => {}}
            role="button"
          >
            🩶
          </p>
        )}
        <div className="w-[400px] flex items-center justify-between">
          <p className="w-full text-sm text-gray-500 text-right sm:block">
            {memo.updatedAt.toString()}
          </p>
          <Button icon={"🗑️"} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}
