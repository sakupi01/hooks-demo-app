import { useReducer, useCallback, Dispatch, Reducer } from "react";
import { MemoReducerAction } from "../reducer";
import { Memo } from "../../types";

export type MemoReducerDispatchAction = (
  action:
    | MemoReducerAction // 同期アクションのとき
    | ((dispatch: Dispatch<MemoReducerAction>) => Promise<void>) // 非同期アクションのとき // thunk action
) => Promise<void>;

// 非同期アクションのためのDispatcher
const asyncDispatcher =
  <T>(dispatch: Dispatch<T>) =>
  async (action: T | ((dispatch: Dispatch<T>) => Promise<void>)) => {
    if (typeof action === "function") {
      await (action as (dispatch: Dispatch<T>) => Promise<void>)(dispatch);
    } else {
      dispatch(action);
    }
  };

export const useAsyncReducer = (
  reducer: Reducer<Memo[], MemoReducerAction>,
  initialState: Memo[]
): [Memo[], MemoReducerDispatchAction] => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // ✅カスタムフック内では、useCallbackを使って関数をメモ化することが推奨されている
  const asyncDispatch = useCallback(
    asyncDispatcher<MemoReducerAction>(dispatch),
    [dispatch]
  );

  return [state, asyncDispatch];
};
