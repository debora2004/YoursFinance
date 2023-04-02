import React from "react";
import {
  CardCash,
  DoughnutChart,
  Layout,
  LineChart,
  Transactions,
} from "../../components";
import { Grid } from "@mui/material";
import incoming from "../../assets/incoming_icon.svg";
import outcome from "../../assets/Outcome_icon.svg";
import { Subtitle, Title } from "./styles";
import { gql, useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Container } from "../../components/CardCash/styles";

type Transaction = {
  id: string;
  type: string;
  amount: string;
  date: string;
  description: string;
  category: string;
  owner: string;
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

const mockTransactions = [
  {
    id: "3",
    type: "income",
    amount: "500",
    date: "2023-01-15",
    description: "Freelance work",
    category: "Freelance",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "4",
    type: "outcome",
    amount: "75",
    date: "2023-02-02",
    description: "Groceries",
    category: "Food",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "5",
    type: "income",
    amount: "200",
    date: "2023-02-10",
    description: "Bonus",
    category: "Bonus",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "6",
    type: "outcome",
    amount: "20",
    date: "2023-03-01",
    description: "Movie tickets",
    category: "Entertainment",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "7",
    type: "outcome",
    amount: "300",
    date: "2023-03-15",
    description: "Rent payment",
    category: "Rent",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "8",
    type: "outcome",
    amount: "50",
    date: "2023-04-05",
    description: "Gas",
    category: "Transportation",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "9",
    type: "income",
    amount: "300",
    date: "2023-04-10",
    description: "Part-time job",
    category: "Part-time",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "10",
    type: "outcome",
    amount: "150",
    date: "2023-05-01",
    description: "Clothing",
    category: "Shopping",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "11",
    type: "outcome",
    amount: "80",
    date: "2023-04-10",
    description: "Dinner with friends",
    category: "entertainment",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "12",
    type: "income",
    amount: "300",
    date: "2023-04-20",
    description: "Part-time job",
    category: "other",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "13",
    type: "outcome",
    amount: "150",
    date: "2023-05-05",
    description: "Clothing",
    category: "other",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "14",
    type: "income",
    amount: "100",
    date: "2023-05-20",
    description: "Salary",
    category: "other",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "15",
    type: "outcome",
    amount: "50",
    date: "2023-06-05",
    description: "Gas",
    category: "transportation",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "16",
    type: "income",
    amount: "200",
    date: "2023-06-20",
    description: "Bonus",
    category: "other",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "17",
    type: "outcome",
    amount: "100",
    date: "2023-07-05",
    description: "Internet bill",
    category: "housing",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "18",
    type: "income",
    amount: "500",
    date: "2023-07-20",
    description: "Freelance work",
    category: "other",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "19",
    type: "outcome",
    amount: "50",
    date: "2023-08-05",
    description: "Gas",
    category: "transportation",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "20",
    type: "income",
    amount: "105",
    date: "2023-08-05",
    description: "Gas",
    category: "transportation",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "21",
    type: "income",
    amount: "70",
    date: "2023-09-05",
    description: "Gas",
    category: "transportation",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "22",
    type: "outcome",
    amount: "30",
    date: "2023-08-05",
    description: "Gas",
    category: "transportation",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "23",
    type: "outcome",
    amount: "150",
    date: "2023-10-05",
    description: "Gas",
    category: "transportation",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "24",
    type: "outcome",
    amount: "550",
    date: "2023-10-05",
    description: "Gas",
    category: "transportation",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
  {
    id: "25",
    type: "outcome",
    amount: "30",
    date: "2023-12-05",
    description: "Gas",
    category: "transportation",
    owner: "0x205232BF3054156674a2e7a30619Cff7a5Cec90A",
  },
];

const columns: GridColDef[] = [
  { field: "type", headerName: "Type", width: 120 },
  { field: "amount", headerName: "Amount", type: "number", width: 120 },
  { field: "date", headerName: "Date", width: 120 },
  { field: "description", headerName: "Description", width: 200 },
  { field: "category", headerName: "Category", width: 120 },
];

const Dashboard = () => {
  const { address } = useAccount();
  const [incomingValue, setIncomingValue] = React.useState(0);
  const [outcomeValue, setOutcomeValue] = React.useState(0);
  const [transactions, setTransactions] =
    React.useState<Transaction[]>(mockTransactions);

  const { loading, error, data } = useQuery(GET_TRANSACTION);

  const [newTransaction, setNewTransaction] = React.useState<Transaction>();
  React.useEffect(() => {
    if (newTransaction) {
      setTransactions((n) => [...n, newTransaction]);
    }
  }, [newTransaction]);

  React.useEffect(() => {
   // if (data) setTransactions(data.allTransactions);
  }, [data]);

  React.useEffect(() => {
    const incoming = transactions.filter((t) => t.type === "income");

    const outcome = transactions.filter((t) => t.type === "outcome");

    const incomingValue = incoming.reduce((acc, curr) => {
      return acc + Number(curr.amount);
    }, 0);

    const outcomeValue = outcome.reduce((acc, curr) => {
      return acc + Number(curr.amount);
    }, 0);

    setIncomingValue(incomingValue);
    setOutcomeValue(outcomeValue);
  }, [transactions]);

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <CardCash
                setter={setNewTransaction}
                icon={incoming}
                title="Total Incoming"
                amount={incomingValue.toString()}
              />
            </Grid>
            <Grid item xs={6}>
              <CardCash
                setter={setNewTransaction}
                icon={outcome}
                title="Total Outcome"
                amount={outcomeValue.toString()}
              />
            </Grid>
            <Grid item xs={12}>
              <Title>My Activity</Title>
              <LineChart transaction={transactions} />
            </Grid>
            <Grid item xs={12}>
              <Container>
                <Title>My Transactions</Title>
                <DataGrid
                  rows={transactions}
                  columns={columns}
                  style={{
                    color: "white",
                    height: 400,
                    width: "auto",
                    border: "none",
                  }}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  disableRowSelectionOnClick
                />
              </Container>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} style={{ height: "500px" }}>
          <Title>Expenses by categories</Title>
          <DoughnutChart transaction={transactions} />
        </Grid>
      </Grid>
      <Grid container spacing={2}></Grid>
    </Layout>
  );
};

export default Dashboard;
