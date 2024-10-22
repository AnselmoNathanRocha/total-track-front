import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  min-height: 60px;
  padding: 8px 15px;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.navy};

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.lavender};
`;

export const CardBody = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button<{ color: string }>`
  background-color: ${(props) => props.color};
  color: white;
  border-radius: 4px;
  padding: 7px 10px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${(props) => props.color + "CC"};
  }

  svg {
    margin-right: 5px;
  }
`;
