import { Spinner } from "./styles";

export interface LoaderProps {
  size?: number;
  color?: string;
}

export function Loader(props: LoaderProps) {
  return <Spinner {...props} />;
}