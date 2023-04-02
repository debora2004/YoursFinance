import React from "react";
import { Container, ContainerContent } from "./styles";
import Sidebar from "../Sidebar";

interface PropsLayout {
  children?: React.ReactNode;
}

const Layout = ({ children }: PropsLayout) => {
  return (
    <Container>
      <Sidebar />
      <ContainerContent>{children}</ContainerContent>
    </Container>
  );
};

export default Layout;
