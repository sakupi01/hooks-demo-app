import { ReactNode, useState } from "react";
import { ThemeContext, ThemeContextType } from "../context/theme";
export default function ThemeProvider({ children }: { children: ReactNode }) {
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
