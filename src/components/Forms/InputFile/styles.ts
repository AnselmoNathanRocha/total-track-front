import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.lavender};
  align-self: self-start;
  margin-bottom: 10px;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  &:hover div {
    opacity: 1;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: end;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

export const ContainerButton = styled.label`
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.crimson};
  display: grid;
  place-items: center;
  cursor: pointer;
`;

export const ButtonText = styled.button`
  background-color: transparent;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ContainerImageDefault = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background-color: ${({theme}) => theme.colors.mediumSlate};
`;

export const IconUser = styled.svg`
  font-size: 60px;
  color: ${({theme}) => theme.colors.lavender};
`;