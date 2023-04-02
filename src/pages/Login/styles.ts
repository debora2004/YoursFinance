import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const Div = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
`;

export const Title = styled.div`
    color: ${({theme}) => theme.colors.yellow[100]};
    font-size:32px;
    font-weight: 700;
`

export const Box = styled.div`
  background-color: ${({ theme }) => theme.colors.purple[400]};
  border-radius: 10px;
  padding: 30px;
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  gap: 20px;
`;