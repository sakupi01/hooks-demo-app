import { useEffect, useState } from "react";
import { MemoListPresenter } from "./ui/list";
import { Memo } from "../types";
import MemosProvider from "./provider/memos";

// Tips: トップレベルのコードは、コンポーネントがインポートされたときに、一度だけ実行される
let didInit = false;

function MemoListContainer() {
  const [memos, setMemos] = useState<Memo[] | undefined>(undefined);
  useEffect(() => {
    if (didInit) return;
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/memos`
      );
      const data = await response.json();
      return data;
    };

    // ✅ fetchData()はアプリケーションの初期化時に一度だけ実行される
    fetchData()
      .then((memos: Memo[]) => setMemos(memos))
      .catch(console.error);
    didInit = true;
  }, []);
  if (memos === undefined) {
    return;
  }
  return (
    <MemosProvider initialMemos={memos}>
      <MemoListPresenter />
    </MemosProvider>
  );
}

export default MemoListContainer;
