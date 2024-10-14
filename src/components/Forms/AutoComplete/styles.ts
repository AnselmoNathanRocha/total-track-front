import styled from "styled-components";
import { Label } from "../Label";

export const AreaInput = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 15px;
  border: 1px solid ${({ theme }) => theme.colors.lavender};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OptionsBox = styled.div`
  width: 100%;
  max-height: 140px;
  min-height: 50px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.mediumSlate};
  position: absolute;
  bottom: 58px;
  z-index: 10;
  overflow: auto;
  box-shadow: 0px 6px 10px 4px #0000001a;
`;

export const AutoCompleteContainer = styled.div`
  width: 100%;
  height: 60px;
  position: relative;

  &[data-invalid="true"] ${AreaInput} {
    margin-bottom: 0px;
    border-color: #ff7777;
  }
  &[data-position-option-box="bottom"] ${OptionsBox} {
    top: 62px;
    bottom: auto;
  }
  &[data-disabled="true"] ${AreaInput} {
    background-color: ${({ theme }) => theme.colors.grayLight};
  }
`;

export const InputBox = styled.div`
  width: 100%;
  height: 45px;
  border-radius: 3px;
  position: relative;
`;

export const LabelFilter = styled(Label)`
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.lavender};
`;

export const InputFilter = styled.input`
  width: 100%;
  height: 100%;
  background-color: transparent;
  font-size: 1rem;
  outline: none;
  font-size: 16px;
  font-weight: 400;
  line-height: 14.08px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Option = styled.label`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.08px;
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.royalBlue};
  }
`;

export const EmptyOption = styled(Option)`
  min-height: 80px;
`;

export const Empty = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

export const EmptyButton = styled.button`
  width: 40%;
  height: 50px;
  padding: 5px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.blueDark};
  color: ${(props) => props.theme.colors.grayMedium};
`;

export const InputCheck = styled.input`
  display: none;
`;

export const Icon = styled.svg`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.grayDark};
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: 10px;
`;
