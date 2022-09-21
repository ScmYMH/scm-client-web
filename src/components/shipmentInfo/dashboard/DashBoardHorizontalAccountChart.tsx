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
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "권역별 회계 연결 현황",
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
      label: "연결되지 않음",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      borderColor: "rgb(250, 128, 114)",
      backgroundColor: "rgba(250, 128, 114, 0.5)",
    },
    {
      label: "연결됨",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      borderColor: "rgb(65, 105, 225)",
      backgroundColor: "rgba(65, 105, 225, 0.5)",
    },
  ],
};

const DashBoardHorizontalAccountChart = () => {
  return <Bar options={options} data={data} />;
};

export default DashBoardHorizontalAccountChart;
