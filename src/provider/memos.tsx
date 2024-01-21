import { ReactNode } from "react";
import { MemoDispatcherContext, MemoStateContext } from "../context/memo";
import { useAsyncReducer } from "../hooks/useAsyncReducer";
import { memosReducer } from "../reducer";
import { Memo } from "../../types";
export default function MemosProvider({
  children,
  initialMemos,
}: {
  children: ReactNode;
  initialMemos: Memo[];
}) {
  const [memos, asyncDispatch] = useAsyncReducer(memosReducer, initialMemos);

  return (
    <MemoDispatcherContext.Provider value={asyncDispatch}>
      <MemoStateContext.Provider value={memos}>
        {children}
      </MemoStateContext.Provider>
    </MemoDispatcherContext.Provider>
  );
}
