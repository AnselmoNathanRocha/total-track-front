import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: .2s ease-in-out;
    font-family: "Roboto", sans-serif;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.darkSlate};
  }

  html {
    overflow: hidden;
  }

  input, button {
    outline: none;
    border: none;
    -webkit-text-size-adjust: none;
  }

  button {
    cursor: pointer;
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  ::-webkit-scrollbar-track {
    background: #00000022;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.crimson};
    border-radius: 50px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.crimson};
  }

`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.darkSlate};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContainerInput = styled.div`
  width: clamp(280px, 50%, 500px);
  height: 100%;
  padding: 30px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.lavender};
  text-align: center;
`;