import React, { useEffect, useState } from "react";
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

const DashBoardVerticalChart = ({ tableData }: { tableData: any }) => {
  const [nationNm, setNationNm] = useState<any>([]);
  const [closeNoN, setCloseNoN] = useState<any>([]);
  const [closeNoY, setCloseNoY] = useState<any>([]);

  useEffect(() => {
    const tempNm: any = [];
    const tempNumN: any = [];
    const tempNumY: any = [];

    tableData?.map((nationArray) => {
      console.log("nationArray : ", nationArray);
      tempNm.push(nationArray[0].nation_nm);
      const numCloseNoN = nationArray.filter(
        (nation) => nation.close_no_yn === "N" || nation.close_no_yn == null
      ).length;
      tempNumN.push(numCloseNoN);
      tempNumY.push(nationArray.length - numCloseNoN);
    });
    setNationNm(tempNm);
    setCloseNoN(tempNumN);
    setCloseNoY(tempNumY);
  }, [tableData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      // title: {
      //   display: true,
      //   text: "물류비 정산 진행 현황",
      // },
    },
  };

  const labels = nationNm;

  const data = {
    labels,
    datasets: [
      {
        label: "미완료",
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        data: closeNoN,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "완료",
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        data: closeNoY,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default DashBoardVerticalChart;
