import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.purple[400]};
  border-radius: 10px;
  padding: 16px;
`;

//Extend the Container and add gap 15px

export const Container2 = styled(Container)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 16px;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Amount = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 700;
`;

export const Action = styled.div`
  color: ${({ theme }) => theme.colors.grey[100]};
  font-weight: 700;
`;
