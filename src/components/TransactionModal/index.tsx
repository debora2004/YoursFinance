import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";
import { BtnCustom } from "./styles";
import { useAccount } from "wagmi";
import { gql, useMutation } from "@apollo/client";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

enum type {
  income = "income",
  outcome = "outcome",
}

enum category {
  food = "food",
  housing = "housing",
  transportation = "transportation",
  entertainment = "entertainment",
  other = "other",
}

type Transaction = {
  id: string;
  type: type;
  amount: string;
  date: string;
  description: string;
  category: category;
  owner: string;
};

const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $type: String!
    $amount: String!
    $date: String!
    $description: String!
    $category: String!
    $owner: String!
  ) {
    createTransaction(
      transaction: {
        type: $type
        amount: $amount
        date: $date
        description: $description
        category: $category
        owner: $owner
      }
    ) {
      txHash
      transaction {
        id
        type
        amount
        date
        description
        category
        owner
      }
    }
  }
`;

type ModalProps = {
  setter: (value: Transaction | undefined) => void;
  income: boolean;
};
const TransactionModal = ({ setter, income }: ModalProps) => {
  const [open, setOpen] = React.useState(false);

  const { address } = useAccount();

  const [createTransaction, { data, loading, error }] =
    useMutation(CREATE_TRANSACTION);

  const [categoryValue, setCategoryValue] = React.useState(category.food);
  const [amountValue, setAmountValue] = React.useState("");
  const [dateValue, setDateValue] = React.useState("2023-04-2023");
  const [descriptionValue, setDescriptionValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async () => {
    const newTransaction: Transaction = {
      id: "0",
      type: income ? type.income : type.outcome,
      amount: amountValue,
      date: dateValue,
      description: descriptionValue,
      category: categoryValue,
      owner: address!,
    };
    try {
      await createTransaction({
        variables: {
          amount: newTransaction.amount,
          owner: newTransaction.owner,
          type: newTransaction.type,
          description: newTransaction.description,
          category: newTransaction.category,
          date: newTransaction.date,
        },
      });
    } catch (e) {
      console.log(e);
    }
    setter(newTransaction);
    setOpen(false);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: string }>
  ) => {
    setCategoryValue(event.target.value as category);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountValue(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionValue(event.target.value);
  };
  return (
    <div>
      <BtnCustom isIncoming={income} onClick={handleClickOpen}>
        + {income ? "Incoming" : "Outcoming"}
      </BtnCustom>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="transaction-dialog-title"
      >
        <DialogTitle id="transaction-dialog-title">
          {"Add a new transaction"}
        </DialogTitle>
        <DialogContent
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <DialogContentText>
            Please enter the details of the transaction:
          </DialogContentText>
          <TextField
            label="Amount"
            type="number"
            value={amountValue}
            onChange={handleAmountChange}
            fullWidth
            required
          />
          <TextField
            label="Date"
            type="date"
            value={dateValue}
            onChange={handleDateChange}
            fullWidth
            required
          />
          <TextField
            label="Description"
            value={descriptionValue}
            onChange={handleDescriptionChange}
            variant="outlined"
            fullWidth
          />

          <Select
            labelId="category-label"
            id="category-select"
            value={"food"}
            /*  onChange={handleCategoryChange} */
            label="Category"
            fullWidth
            required
          >
            <MenuItem value="food">Food</MenuItem>
            <MenuItem value="housing">Housing</MenuItem>
            <MenuItem value="transportation">Transportation</MenuItem>
            <MenuItem value="entertainment">Entertainment</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <LoadingButton
            loading={loading}
            onClick={handleClick}
            loadingPosition="start"
            variant="contained"
          >
            {loading ? "-" : "Save"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={loading}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          Uploading to polygon mumbai testnet...
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TransactionModal;
