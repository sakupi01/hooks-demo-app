import { Memo } from "../../types";

type MemoReducerAction =
  | {
      type: "add";
      payload: Memo;
    }
  | {
      type: "update";
      payload: Memo;
    }
  | {
      type: "delete";
      payload: {
        id: number;
      };
    };

export function memosReducer(memos: Memo[], action: MemoReducerAction) {
  switch (action.type) {
    case "add": {
      return [...memos, action.payload];
    }
    case "update": {
      return memos.map((m) => {
        if (m.id === action.payload.id) {
          return action.payload;
        }
        return m;
      });
    }
    case "delete": {
      return memos.filter((m) => m.id !== action.payload.id);
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}
