import styled, { css } from "styled-components";

export const ModalContainer = styled.div<{
  $backgroundcolor?: string;
  $position?: "center" | "bottom";
  $level?: number;
  $width?: string;
}>`
  width: clamp(300px, 90%, 800px);
  min-height: 138px;
  max-height: 90vh;
  max-width: ${(props) => props.$width ? props.$width : "90vh"};
  border-radius: 4px;
  background-color: ${(props) => props.$backgroundcolor || props.theme.colors.darkSlate};
  padding: 10px 20px;
  position: relative;
  overflow-y: auto;

  ${(props) =>
    props.$position === "center" &&
    `
    transform: translateY(-20px);
    transition: transform 0.3s ease-out;
    width: ${props.$level && props.$level > 1 ? "80%" : "clamp(300px, 90%, 800px)"};
    &[data-is-visible="true"] {
      transform: translateY(0);
    }
  `}

  ${(props) =>
    props.$position === "bottom" &&
    css`
      width: 100%;
      max-width: none;
      height: auto;
      max-height: 50vh;
      border-radius: 10px 10px 0 0;
      transform: translateY(100%);
      transition: transform 0.3s ease-out;
      position: absolute;
      bottom: 0;

      &[data-is-visible="true"] {
        transform: translateY(0);
      }
    `}
`;

export const Overlay = styled.div<{ $level?: number }>`
  display: grid;
  place-items: center;
  position: fixed;
  inset: 0;
  z-index: ${({ $level }) => 100 + ($level || 1) * 10};
  background-color: #555555aa;
  opacity: 0;
  visibility: hidden;

  &[data-is-visible="true"] {
    visibility: visible;
    opacity: 1;
  }

  ${({ $level }) =>
    $level !== undefined &&
    $level > 1 &&
    `
    background-color: #00000033;
  `}
`;

export const ModalHeader = styled.header`
  width: 100%;
  padding: 10px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const H2 = styled.h2`
  width: 85%;
  font-size: 20px;
  font-weight: 600;
  line-height: 23.46px;
  color: ${({ theme }) => theme.colors.lavender};
`;

export const CloseButton = styled.button`
  width: 25px;
  height: 25px;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

export const IconClose = styled.svg`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.crimson};
`;

export const ModalContent = styled.div`
  width: 100%;
  min-height: 100px;
  height: 100%;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.lavender};
`;
