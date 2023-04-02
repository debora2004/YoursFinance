import React from "react";
import {
  Container,
  ContainerLogo,
  MenuItem,
  MenuLabel,
  SettingsAnimated,
  Title,
} from "./styles";
import { ReactComponent as Logo } from "../../assets/wallet.svg";
import { ReactComponent as DashboardIcon } from "../../assets/dashboard_icon.svg";
import { ReactComponent as AnalitycsIcon } from "../../assets/analitycs_icon.svg";
import { ReactComponent as WalletIcon } from "../../assets/wallet_icon.svg";
import { ReactComponent as SettingsIcon } from "../../assets/settings_icon.svg";
import { ReactComponent as MoonIcon } from "../../assets/moon_icon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { Switch } from "@mui/material";
import Divider from "../Divider";
import { Web3Button } from "@web3modal/react";
import LoginButton from "../LoginButton";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <Container>
      <ContainerLogo>
        <Logo />
        <Title>Yours Finances</Title>
      </ContainerLogo>
      <MenuItem
        isActive={pathname.split("/").includes("dashboard")}
        onClick={() => navigate("/dashboard")}
      >
        <DashboardIcon />
        <MenuLabel>Dashboard</MenuLabel>
      </MenuItem>
      <MenuItem
        isActive={pathname.split("/").includes("analitycs")}
        onClick={() => navigate("/analitycs")}
      >
        <AnalitycsIcon />
        <MenuLabel>Analitycs</MenuLabel>
      </MenuItem>
      <MenuItem
        isActive={pathname.split("/").includes("mywallet")}
        onClick={() => navigate("/mywallet")}
      >
        <WalletIcon />
        <MenuLabel>Wallet</MenuLabel>
      </MenuItem>
      <MenuItem
        isActive={pathname.split("/").includes("settings")}
        onClick={() => navigate("/settings")}
      >
        <SettingsAnimated>
          <SettingsIcon />
        </SettingsAnimated>
        <MenuLabel>Settings</MenuLabel>
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => navigate("/dashboard")}>
        <MoonIcon />
        <MenuLabel>Dark Mode</MenuLabel>
        <Switch />
      </MenuItem>
      <LoginButton />
    </Container>
  );
};

export default Sidebar;
