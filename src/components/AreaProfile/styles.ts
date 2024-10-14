import styled from "styled-components";

export const Container = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.crimson};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ContainerImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.colors.mediumSlate};
  display: grid;
  place-items: center;
`;

export const IconUser = styled.svg`
  font-size: 30px;
  color: ${({theme}) => theme.colors.lavender};
`;