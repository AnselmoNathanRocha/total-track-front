import styled from "styled-components";

export const ContainerForm = styled.div`
  width: 100%;
  margin-top: 80px;
  padding: 0 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export const ContainerRequests = styled.div<{ $title?: string }>`
  width: clamp(250px, 100%, 600px);
  min-height: 100px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.lavender};
  margin-top: 20px;
  position: relative;

  &::after {
    content: '${(props) => props.$title}';
    position: absolute;
    top: -18px;
    left: 5px;
    font-size: 14px;
    font-weight: 500;
    color: ${({theme}) => theme.colors.lavender};
  }
`;
