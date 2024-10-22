import styled from "styled-components";

export const ContainerItem = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 15px;
  background-color: ${({ theme }) => theme.colors.navy};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.charcoal};

  &:first-child {
    border-radius: 5px 5px 0 0;
  }

  &:last-child {
    border-radius: 0 0 5px 5px;
    border-bottom: none;
  }
`;

export const CircleStatus = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ffc107;
`;

export const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const TextItem = styled.p<{$size?: string}>`
  font-size: ${(props) => props.$size ? props.$size : "16px"};
  font-weight: ${(props) => props.$size ? 400 : 600};
  color: ${({ theme }) => theme.colors.lavender};
`;

export const DateContainer = styled.div`
  max-width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DateText = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.mediumSlate};
`;
