import styled from "styled-components";

export const Title = styled.p`
  font-size: clamp(30px, 5vw, 45px);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.lavender};
  margin: 50px 0;
  text-align: center;
`;

export const ContainerInput = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  padding: 0 10%;
`;

export const Img = styled.img`
  height: 50%;
  object-fit: contain;
  margin: 30px 0;
`;

export const ContainerAreaProfile = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
`;