import LoginButton from "../../components/LoginButton";
import { Box, Container, Div, Title } from "./styles";
import { ReactComponent as Wallet } from "../../assets/wallet.svg";

const Login = () => {
  return (
    <Container>
      <Box>
        <Div>
          <Wallet />
          <Title>Yours Finances</Title>
        </Div>
        <LoginButton />
      </Box>
    </Container>
  );
};

export default Login;
