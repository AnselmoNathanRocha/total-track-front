import styled, { keyframes } from "styled-components";

const DotAnimation = keyframes`
  50% {
    transform: translateX(78px);
  }
`;

const DotsAnimation = keyframes`
  50% {
    transform: translateX(-30px);
  }
`;

export const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  filter: contrast(10);
`;

export const LoadingDots = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 130px;
  height: 40px;
  margin: -20px 0 0 -71px;
  background: transparent;
`;

export const DotMain = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  top: 12px;
  left: 15px;
  background: ${({theme}) => theme.colors.crimson};
  border-radius: 50%;
  transform: translateX(0);
  animation: ${DotAnimation} 2.8s infinite;
  filter: blur(4px);
`;

export const DotsContainer = styled.div`
  transform: translateX(0);
  margin-top: 12px;
  margin-left: 31px;
  animation: ${DotsAnimation} 2.8s infinite;
`;

export const Dot = styled.span`
  display: block;
  float: left;
  width: 15px;
  height: 15px;
  margin-left: 12px;
  background: ${({theme}) => theme.colors.crimson};
  border-radius: 50%;
  filter: blur(4px);
`;
