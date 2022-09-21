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
      text: "권역별 담당자 확정 현황",
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
      label: "미확정",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      borderColor: "rgb(255, 206, 86)",
      backgroundColor: "rgba(255, 206, 86, 0.5)",
    },
    {
      label: "확정",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      borderColor: "rgba(113, 205, 146, 0.7 )",
      backgroundColor: "rgba(113, 205, 146, 0.5)",
    },
  ],
};

const DashBoardHorizontalManagerChart = () => {
  return <Bar options={options} data={data} />;
};

export default DashBoardHorizontalManagerChart;
