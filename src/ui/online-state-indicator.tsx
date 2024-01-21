import { useSyncExternalStore } from "react";
import { useThemeContext } from "../hooks/useThemeContext";

export function OnlineStateIndicator() {
  const { theme } = useThemeContext();
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return (
    <h1 className={theme === "light" ? "text-black" : "text-white"}>
      {isOnline ? "✅ Connection is Stable." : "❌ Uh, oh. Disconnected..."}
    </h1>
  );
}

function getSnapshot() {
  return navigator.onLine;
}

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}
