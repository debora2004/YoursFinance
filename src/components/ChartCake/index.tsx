import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { theme } from "../../theme/theme";
import { Transaction } from "../../types/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

interface ChartProps {
  transaction: Transaction[];
}

const ChartCake = ({ transaction }: ChartProps) => {
  const incoming = transaction.filter((t) => t.type === "income");
  const outcome = transaction.filter((t) => t.type === "outcome");

  const totalIncomingByMonth: string[] = Array(12).fill("0");
  const totalOutgoingByMonth: string[] = Array(12).fill("0");

  incoming.forEach((transaction) => {
    const [year, month, _] = transaction.date.split("-");
    const monthIndex = parseInt(month) - 1;
    totalIncomingByMonth[monthIndex] = (
      parseFloat(totalIncomingByMonth[monthIndex]) +
      parseFloat(transaction.amount)
    ).toFixed(2);
  });

  outcome.forEach((transaction) => {
    const [year, month, _] = transaction.date.split("-");
    const monthIndex = parseInt(month) - 1;
    totalOutgoingByMonth[monthIndex] = (
      parseFloat(totalOutgoingByMonth[monthIndex]) +
      parseFloat(transaction.amount)
    ).toFixed(2);
  });

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Incoming",
        data: totalOutgoingByMonth,
        backgroundColor: "#64CFF6",
        borderRadius: 80,
      },
      {
        label: "Outcome",
        data: totalIncomingByMonth,
        backgroundColor: "#5967E9",
        borderRadius: 80,
      },
    ],
  };

  return <Bar data={data} options={options} />;
};

export default ChartCake;
