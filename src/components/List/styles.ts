import styled from "styled-components";

export const ListContainer = styled.div`
  width: clamp(300px, 60%, 500px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding-top: 50px;
`;

export const IconCheck = styled.svg`
  font-size: 18px;
`;

export const ItemName = styled.span`
  font-size: 16px;
`;

export const ButtonCheck = styled.button`
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding: 0 15px;
  border-radius: 4px 0 0 4px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 18px;
`;

export const ItemList = styled.div<{ checked: boolean }>`
  width: 100%;
  height: 45px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${(props) =>
    props.checked ? props.theme.colors.navy : "transparent"};

  ${ButtonCheck} {
    border: 2px solid
      ${(props) =>
        props.checked ? "transparent" : props.theme.colors.mediumSlate};
    border-right: none;
  }

  ${ItemName} {
    text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
  }

  ${IconCheck}, ${ItemName} {
    color: ${(props) =>
      props.checked ? props.theme.colors.lightGray : props.theme.colors.white};
  }
`;

export const ButtonDell = styled.button`
  width: 25%;
  height: 100%;
  background-color: transparent;
  border-radius: 0 4px 4px 0;
  border: 2px solid ${({ theme }) => theme.colors.crimson};
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.crimson};
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;
