import * as React from "react";
import CardComponent from "./CardComponent";
import { useQuery, gql } from "@apollo/client";
import TodoInputComponent from "./TodoInputComponent";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Transaction = {
  id: string;
  type: string;
  amount: string;
  date: string;
  description: string;
  category: string;
  owner: string;
};

type Update = {
  transactionId: String;
  update: String;
};

const GET_TRANSACTION = gql`
  query GetTransaction {
    allTransactions {
      id
      type
      amount
      date
      description
      category
      owner
    }
  }
`;

const dragColors = {
  initialColor: "#63636324",
  dragStartColor: "#636363",
  doneColor: "#6ab05a",
  deleteColor: "#ea3b3b",
};

export default function ListComponent(props: { address: string | undefined }) {
  const ownerAddress: string = String(props.address);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [newTransaction, setNewTransaction] = React.useState<Transaction>();
  const [update, setUpdate] = React.useState<Update>();
  const [open, setOpen] = React.useState(false);
  const [updateMessage, setUpdateMessage] = React.useState("");
  const [updateError, setUpdateError] = React.useState(false);
  const [doneIconColor, setDoneIconColor] = React.useState(
    dragColors.initialColor
  );
  const [deleteIconColor, setDeleteIconColor] = React.useState(
    dragColors.initialColor
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      setUpdateError(false);
      setOpen(false);
      return;
    }
    setOpen(false);
  };

  function onUpdateTransaction(transactionId: String, status: string) {
    setUpdateError(false);
    setUpdateMessage(
      `The ${status} operation was successfully updated in polygon-mumbai`
    );
    setOpen(true);
    setTransactions((current: any) =>
      current.filter((transaction: any) => transaction.id !== transactionId)
    );
  }

  function onError() {
    setUpdateError(true);
    setUpdateMessage("There was an unexpected error");
    setOpen(true);
  }

  const defaultTransaction = {
    amount: "0",
    category: "default",
    date: "2021-10-10",
    description: "default",
    type: "default",
    id: "abcdefg12345",
    owner: "abcdefg123",
  };

  const { loading, error, data } = useQuery(GET_TRANSACTION);

  React.useEffect(() => {
    if (data) setTransactions(data.allTransactions);
  }, [data]);

  React.useEffect(() => {
    if (newTransaction) {
      setTransactions((n) => [...n, newTransaction]);
    }
  }, [newTransaction]);

  if (loading) return <></>;
  if (error) {
    return <p>Error : {error.message}</p>;
  }

  const displayTodos = () =>
    transactions.map((todo: Transaction, index) => (
      <CardComponent
        key={todo.id}
        transaction={todo}
        setState={setTransactions}
        index={index}
        updateState={update}
        onUpdateTransaction={onUpdateTransaction}
        default={false}
        onError={onError}
      />
    ));

  function onDragEnd(result: any) {
    setDeleteIconColor(dragColors.initialColor);
    setDoneIconColor(dragColors.initialColor);
    setUpdate({
      update: result.destination.droppableId,
      transactionId: result.draggableId,
    });
  }

  function onDragStart(result: any) {
    setDeleteIconColor(dragColors.dragStartColor);
    setDoneIconColor(dragColors.dragStartColor);
  }
  function onDragUpdate(result: any) {
    if (result.destination.droppableId === "delete") {
      setDeleteIconColor(dragColors.deleteColor);
    } else if (result.destination.droppableId === "done") {
      setDoneIconColor(dragColors.doneColor);
    } else {
      setDeleteIconColor(dragColors.dragStartColor);
      setDoneIconColor(dragColors.dragStartColor);
    }
  }

  if (props.address) {
    return (
      <div className="list">
        <DragDropContext
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
        >
          <div className="container">
            <Droppable droppableId="delete">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="delete-container"
                >
                  <DeleteOutlineOutlinedIcon
                    fontSize="large"
                    sx={{
                      height: "200px",
                      width: "200px",
                      color: deleteIconColor,
                      position: "fixed",
                      right: "76%",
                    }}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="ready">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="list-container"
                >
                  {displayTodos()}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="done">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="done-container"
                >
                  <CheckCircleOutlineIcon
                    fontSize="large"
                    sx={{
                      height: "200px",
                      width: "200px",
                      color: doneIconColor,
                      position: "fixed",
                      left: "76%",
                    }}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <TodoInputComponent
            setState={setNewTransaction}
            address={ownerAddress}
          />
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={updateError ? "error" : "success"}
              sx={{ width: "100%" }}
            >
              {updateMessage}
            </Alert>
          </Snackbar>
        </DragDropContext>
      </div>
    );
  } else return null;
}
