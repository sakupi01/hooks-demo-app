import { ReactNode, useState } from "react";
import { ThemeContext, ThemeContextType } from "../context";
export default function Provider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeContextType["theme"]>("light");
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
