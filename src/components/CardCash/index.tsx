import React from "react";
import { Action, Amount, Container2, Div } from "./styles";
import Chip from "@mui/material/Chip";
import { Button } from "@mui/material";
import TransactionModal from "../TransactionModal";
import { Transaction } from "../../types/types";

interface PropsCardCash {
  icon?: any;
  amount?: string;
  title?: string;
  porcentage?: string;
  status?: boolean;
  setter: (value: Transaction | undefined) => void;
}

const CardCash = ({
  icon,
  porcentage,
  status,
  title,
  amount,
  setter,
}: PropsCardCash) => {
  return (
    <Container2>
      <Div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 24,
          alignItems: "center",
        }}
      >
        <Div>
          <img src={icon} style={{ height: 50 }} alt="icon" />
          {/*  <Chip label="+152%" color="success" /> */}
        </Div>
        <Div>
          <Amount>u$ {amount}</Amount>
          <Action> {title}</Action>
        </Div>

        <TransactionModal income={title === "Total Incoming"} setter={setter} />
      </Div>
    </Container2>
  );
};

export default CardCash;
