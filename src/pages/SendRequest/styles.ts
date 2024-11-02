import styled from "styled-components";

export const ContainerItem = styled.div`
  width: 100%;
  height: 60px;
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.colors.navy};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.charcoal};
  
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 8px 8px;
    border-bottom: none;
  }
`;

export const CircleStatus = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ffc107;
`;

export const StatusIcon = styled.div<{ status: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ status }) =>
    status === "ACCEPTED" ? "#4CAF50" : "#F44336"};
`;

export const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TextItem = styled.p<{ $size?: string; color?: string }>`
  font-size: ${(props) => (props.$size ? props.$size : "16px")};
  font-weight: 600;
  color: ${(props) => (props.color ? props.color : props.theme.colors.lavender)};
`;

export const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.mediumSlate};
`;

export const DateText = styled.span`
  font-size: 12px;
  color: inherit;
`;
