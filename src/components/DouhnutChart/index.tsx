import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Title,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { Transaction } from "../../types/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Title,
  Filler
);

enum category {
  food = "food",
  housing = "housing",
  transportation = "transportation",
  entertainment = "entertainment",
  other = "other",
}

interface ChartProps {
  transaction: Transaction[];
}

const DoughnutChart = ({ transaction: transactions }: ChartProps) => {
  const outcome = transactions.filter((t) => t.type === "outcome");

  const totalOutgoingByCategory: string[] = Array(5).fill("0");

  outcome.forEach((transaction) => {
    const categoryIndex = Object.values(category).indexOf(
      transaction.category as category
    );
    totalOutgoingByCategory[categoryIndex] = (
      parseFloat(totalOutgoingByCategory[categoryIndex]) +
      parseFloat(transaction.amount)
    ).toFixed(2);
  });
  const data = {
    labels: [
      category.food,
      category.housing,
      category.transportation,
      category.entertainment,
      category.other,
    ],
    datasets: [
      {
        label: "# of Votes",
        data: totalOutgoingByCategory,
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(99, 255, 247, 0.5)",
        ],
        borderColor: ["#636dff", "#9a36eb"],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
};

export default DoughnutChart;
