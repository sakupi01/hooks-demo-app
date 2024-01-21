import { useRef, useState } from "react";
import { Button } from "./button";

export default function Timer() {
  // ✅Timerコンポーネント内のstateの更新は，他のコンポーネントに影響しない
  // ✅leftTimeはUIに影響する変数のためstateを用いる
  const [leftTime, setLeftTime] = useState(300);
  // ✅直接はUIに影響しないDOMを保持するためにuseRefを使用する
  const domRef = useRef<HTMLInputElement>(null);
  // ✅これも直接はUIに影響しないinterval IDを保持するためにuseRefを使用する
  // intervalIDは，タイマーをリセットするために使用
  const timeRef = useRef(0);

  const handleStartTimer = () => {
    // ✅すでにタイマーが動いている場合は，そのタイマーを消して
    if (timeRef.current) {
      console.log("clear the timerID: ", timeRef.current);
      clearInterval(timeRef.current);
    }
    // ✅タイマーを生成する
    timeRef.current = setInterval(() => {
      setLeftTime((prev) => {
        // ０になったらタイマーを止める（timerIDを消す）
        if (prev === 0) {
          clearInterval(timeRef.current);
          return prev;
        }
        return prev - 1;
      });
    }, 1000);
    console.log("new the timerID: ", timeRef.current);
  };

  return (
    <div className="flex flex-col m-5">
      <h1 className="text-center text-2xl">💣Time Limit: {leftTime} </h1>
      <div className="flex justify-center m-5">
        <input
          type="number"
          ref={domRef}
          placeholder="Set a limit"
          defaultValue={300}
          min={0}
          className="truncate text-sm font-semibold bg-yellow-50 rounded-xl md:text-base"
        />
        <Button
          icon={"set"}
          onClick={() =>
            domRef.current && setLeftTime(Number(domRef.current.value))
          }
          className="bg-yellow-400"
        />
        <Button
          icon={"start"}
          onClick={handleStartTimer}
          className="bg-yellow-400"
        />
      </div>
    </div>
  );
}
