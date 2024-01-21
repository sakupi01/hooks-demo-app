import { ChangeEvent } from "react";
import { useThemeContext } from "./hooks/useThemeContext";
import clsx from "clsx";
import { OnlineStateIndicator } from "./ui/online-state-indicator";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <div
      className={clsx(
        "flex flex-col min-h-screen p-10",
        theme === "light" ? "bg-white" : "bg-slate-600"
      )}
    >
      <div className="flex justify-center items-center gap-5">
        <select
          className="bg-white rounded-md p-2"
          value={theme}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            toggleTheme(e.target.value as "light" | "dark")
          }
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <OnlineStateIndicator />
      </div>
      <div className="flex-grow overflow-y-auto py-20">{children}</div>
    </div>
  );
}
