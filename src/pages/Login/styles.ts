import { Link } from "react-router-dom";
import styled from "styled-components";

export const name = styled.div``;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.navy};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  width: clamp(300px, 70%, 600px);
  padding: 15px 5px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.darkSlate};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.p`
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.lavender};
`;

export const ContainerInput = styled.div`
  width: 100%;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonSubmit = styled.button`
  width: clamp(150px, 70%, 300px);
  height: 50px;
  margin-top: 20px;
  border-radius: 4px;
  display: grid;
  place-items: center;
  background-color: ${({ theme }) => theme.colors.crimson};

  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    opacity: 0.8;
  }
`;

export const AreaLink = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
  margin-top: 20px;
`;

export const LinkCustom = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.lightGray};
`;