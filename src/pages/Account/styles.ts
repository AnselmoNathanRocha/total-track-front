import styled from "styled-components";

export const ButtonLink = styled.button`
  font-size: 16px;
  font-weight: 400;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.crimson};
  text-decoration: underline;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

export const ButtonSave = styled.button`
  width: 180px;
  height: 40px;
  margin: 20px auto 0px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.crimson};
  display: grid;
  place-items: center;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    &:not(:disabled) {
      opacity: 0.85;
    }
  }

  &:disabled {
    cursor: no-drop;
    opacity: .7;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
`;

export const PencilIcon = styled.svg`
height: 20px;
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.crimson};
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  top: calc(50% - 7px);
  right: 15px;

  &:hover {
    opacity: 0.7;
  }
`;
