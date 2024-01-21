import { useContext } from "react";
import { ThemeContext } from "../context";

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider!");
  }
  return { theme: context.theme, toggleTheme: context.toggleTheme };
};
