import { theme } from "@/styles/theme";
import "styled-components";

export type ITheme = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends ITheme {}
}