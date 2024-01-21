import { useContext } from "react";
import { MemoStateContext, MemoDispatcherContext } from "../context/memo";

export const useMemosContext = () => {
  const state = useContext(MemoStateContext);
  const dispatch = useContext(MemoDispatcherContext);
  if (state === undefined || dispatch === undefined) {
    throw new Error("useMemosContext must be used within a MemosProvider!");
  }
  return { memos: state, asyncDispatch: dispatch };
};
