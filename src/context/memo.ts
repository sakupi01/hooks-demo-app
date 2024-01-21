import { createContext } from "react";
import { Memo } from "../../types/index";
import { MemoReducerDispatchAction } from "../hooks/useAsyncReducer";

export const MemoDispatcherContext = createContext<
  MemoReducerDispatchAction | undefined
>(undefined);

export const MemoStateContext = createContext<Memo[] | undefined>(undefined);
