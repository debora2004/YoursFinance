import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.purple[400]};
  border-radius: 10px;
  padding: 10px;
`;
