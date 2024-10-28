import styled from "styled-components";

export const Container = styled.div<{ $isOpen: boolean }>`
  width: clamp(250px, 40%, 400px);
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.navy};
  border-right: 1px solid ${({ theme }) => theme.colors.mediumSlate};
  padding-top: 100px;

  @media (max-width: 1024px) {
    position: absolute;
    z-index: 10;
    top: 0;
    left: -100%;
    width: 100%;
    transform: ${({ $isOpen }) =>
      $isOpen ? "translateX(100%)" : "translateX(0)"};
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 8px;
  padding: 15px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.lavender};
  font-size: 18px;
  font-weight: 600;

  &:hover {
    opacity: .8;
    background-color: ${({ theme }) => theme.colors.darkSlate};
  }

  &[data-is-active="true"] {
    background-color: ${({ theme }) => theme.colors.charcoal};
  }
`;

export const AreaNotification = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const IconBtn = styled.svg`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.lavender};
`;

export const NotificationBalloon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background-color: ${({ theme }) => theme.colors.crimson};
  color: ${({theme}) => theme.colors.white};
  font-size: 14px;
  font-weight: 500;
`;