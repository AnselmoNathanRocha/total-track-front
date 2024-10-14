import styled from "styled-components";

export const Container = styled.div`
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  position: absolute;
  z-index: 100;
  top: 20px;
  left: 20px;

  @media (min-width: 1025px) {
    display: none;
  }
`;

export const Line = styled.span`
  width: 20px;
  height: 2.4px;
  border-radius: 1.2px;
  background-color: ${({ theme }) => theme.colors.white};

  &[data-is-open="true"] {
    &:nth-child(1) {
      transform: rotate(45deg) translateY(12px);
    }

    &:nth-child(2) {
      transform: translateX(-25px);
      opacity: 0;
    }

    &:nth-child(3) {
      transform: rotate(-45deg) translateY(-12px);
    }
  }

  &[data-is-open="false"] {
    &:nth-child(1) {
      transform: none;
    }

    &:nth-child(2) {
      transform: none;
      opacity: 1;
    }

    &:nth-child(3) {
      transform: none;
    }
  }
`;

export const Button = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  background-color: transparent;

  &[data-is-open="true"] > ${Line} {
    &:nth-child(1) {
      transform: rotate(45deg) translate(3px, 6px);
    }

    &:nth-child(2) {
      transform: translateX(-25px);
      opacity: 0;
    }

    &:nth-child(3) {
      transform: rotate(-45deg) translate(1.5px, -4.5px);
    }
  }
`;
