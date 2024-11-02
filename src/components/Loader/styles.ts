import styled, { keyframes } from "styled-components";
import { LoaderProps } from ".";

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div<LoaderProps>`
  width: ${(props) => `${props.size || 20}px`};
  height: ${(props) => `${props.size || 20}px`};
  border-radius: 50%;
  border: 4px solid transparent;
  border-top-color: ${(props) => props.color || "#fff"};
  border-left-color: ${(props) => props.color || "#fff"};
  animation: ${spin} 0.6s linear infinite;
  align-self: center;
`;

export const ContainerSpinner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;