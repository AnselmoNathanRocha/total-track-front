import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { AuthProvider } from "..";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>;
    </ThemeProvider>
  );
};
