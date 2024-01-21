import { Dispatch, SetStateAction, createContext } from "react";

export type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: Dispatch<SetStateAction<"light" | "dark">>;
};
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
