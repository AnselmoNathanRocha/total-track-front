import { FaUserFriends } from "react-icons/fa";
import styled, { keyframes } from "styled-components";

export const Card = styled.div`
  width: 100%;
  min-height: 60px;
  padding: 8px 15px;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.navy};
  border-bottom: 1px solid ${({theme}) => theme.colors.charcoal};

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

export const FriendIcon = styled(FaUserFriends)`
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.crimson};
`;



// Animação de fade para o balão de opções
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const CardContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const DateText = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.lightGray};
`;

export const EllipsisIconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.lightGray};
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.lavender};
  }
`;

export const OptionsMenu = styled.div`
  position: absolute;
  top: 20px;
  right: 12px;
  background-color: ${({ theme }) => theme.colors.mediumSlate};
  border-radius: 4px;
  animation: ${fadeIn} 0.2s ease-in-out;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
`;

export const RemoveFriendButton = styled.button`
  width: 100px;
  height: 30px;
  display: grid;
  place-items: center;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: ${({ theme }) => theme.colors.crimson + "CC"};
  }
`;
