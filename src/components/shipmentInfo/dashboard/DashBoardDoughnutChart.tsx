import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashBoardDoughnutChart = ({ nationArr }: { nationArr: any }) => {
  const [num, setNum] = useState<any>([]);
  useEffect(() => {
    const tempNumClearAmtY = nationArr.filter(
      (nation) =>
        (nation.close_no_yn === "N" || nation.close_no_yn == null) &&
        nation.clear_amt !== null
    ).length;

    const tempNumClearAmtN = nationArr.filter(
      (nation) =>
        (nation.close_no_yn === "N" || nation.close_no_yn == null) &&
        (nation.clear_amt === null || nation.clear_amt == 0)
    ).length;
    const newNum: any = [];
    newNum.push(tempNumClearAmtY);
    newNum.push(tempNumClearAmtN);
    setNum(newNum);
  }, [nationArr]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      // title: {
      //   display: true,
      //   text: "권역별 Total 계약 건수",
      // },
    },
  };

  const data = {
    labels: ["완료", "미완료"],
    datasets: [
      {
        label: "# of Votes",
        data: num,
        backgroundColor: [
          // "rgba(255, 99, 132, 0.2)",
          // "rgba(54, 162, 235, 0.2)",
          // "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2 )",
        ],
        borderColor: [
          // "rgba(255, 99, 132, 1)",
          // "rgba(54, 162, 235, 1)",
          // "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut options={options} data={data} />;
};

export default DashBoardDoughnutChart;
