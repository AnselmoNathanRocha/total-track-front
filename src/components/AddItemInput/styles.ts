import styled from "styled-components";

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.lavender};
  position: absolute;
  top: -18px;
  left: 0;
`;

export const BoxInput = styled.div`
  height: 50px;
  color: ${({ theme }) => theme.colors.royalBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Input = styled.input`
  width: clamp(180px, 100%, 600px);
  height: 100%;
  color: ${({ theme }) => theme.colors.white};
  padding: 0 15px;
  font-size: 1rem;
  border-radius: 6px 0 0 6px;
`;

export const ButtonAdd = styled.button<{ $buttonColor?: string }>`
  min-width: 70px;
  max-width: 160px;
  width: 20%;
  height: 100%;
  background-color: ${(props) =>
    props.$buttonColor ? props.$buttonColor : props.theme.colors.mediumSlate};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 0 6px 6px 0;
  display: grid;
  place-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.royalBlue};
  }
`;

export const ContianerErrorMessage = styled.div`
  width: 100%;
  position: absolute;
  bottom: -25px;
  left: 0;
`;

export const Container = styled.div<{
  $background?: string;
  $borderColor?: string;
}>`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  position: relative;

  ${Input} {
    background-color: ${(props) =>
      props.$background ? props.$background : props.theme.colors.charcoal};
    border: 1px solid
      ${(props) => (props.$borderColor ? props.$borderColor : "transparent")};
    border-right: none;
  }
`;
