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
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "권역별 계약 진행 현황",
    },
  },
};

const labels = [
  "동남아",
  "중국",
  "유럽",
  "아프리카",
  "중남미",
  "대양주",
  "일본",
  "중동",
  "미국",
  "서남아",
  "기타",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Termination",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Validity",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const DashBoardVerticalChart = () => {
  return <Bar options={options} data={data} />;
};

export default DashBoardVerticalChart;
