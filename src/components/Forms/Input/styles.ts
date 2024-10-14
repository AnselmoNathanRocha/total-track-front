import styled from "styled-components";

export const InputText = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 4px;
  padding: 8px 16px 8px 16px;
  font-size: 16px;
  font-weight: 400;
  line-height: 14.08px;
  color: ${({ theme }) => theme.colors.crimson};
  background-color: transparent;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.navy};
  }
`;

export const FadeInput = styled.div`
  position: absolute;
  inset: 0;
  background-color: #00000066;
  border-radius: 4px;

  &[data-visible="true"] {
    display: none;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.42px;
`;

export const InputBox = styled.div<{ $color?: string; $borderColor?: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  padding-bottom: 10px;

  &[data-invalid="true"] ${InputText} {
    border-color: #ff7777;
  }
  ${Label} {
    color: ${(props) =>
      props.$borderColor ? props.$borderColor : props.theme.colors.white};
  }
  ${InputText} {
    border: 1px solid
      ${(props) =>
        props.$borderColor ? props.$borderColor : props.theme.colors.white};
    color: ${(props) =>
      props.$color ? props.$color : props.theme.colors.navy};
  }
`;

export const ContentInput = styled.div`
  width: 100%;
  position: relative;
`;
