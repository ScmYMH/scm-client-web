import { useState } from "react";
import { Table } from "reactstrap";

const DashBoardTable = ({
  tableData,
  onClickTableRow,
}: {
  tableData: any;
  onClickTableRow: (nationArray: any) => void;
}) => {
  console.log("=========== tableData : ", tableData);
  const [selectedId, setSelectedId] = useState<number>(-1);

  return (
    <Table style={{ width: "25em" }}>
      <thead>
        <tr>
          <th></th>
          <th style={{ textAlign: "center" }}>총 대상건수</th>
          <th style={{ textAlign: "center" }}>정산완료</th>
          <th style={{ textAlign: "center" }}>미완료</th>
        </tr>
      </thead>
      <tbody>
        {tableData?.map((nationArray, index) => {
          console.log("nationArray : ", nationArray);
          const numCloseNoN = nationArray.filter(
            (nation) => nation.close_no_yn === "N" || nation.close_no_yn == null
          ).length;
          return (
            <tr
              key={index}
              onClick={(e) => {
                onClickTableRow(nationArray);
                setSelectedId(index);
              }}
              style={{
                backgroundColor: `${
                  selectedId === index ? "#e6f0ff" : "white"
                }`,
              }}
            >
              <th scope="row" style={{ textAlign: "center" }}>
                {nationArray[0].nation_nm}
              </th>
              <td style={{ textAlign: "center" }}>{nationArray.length}</td>
              <td style={{ textAlign: "center" }}>
                {nationArray.length - numCloseNoN}
              </td>
              <td style={{ textAlign: "center", color: "red" }}>
                {numCloseNoN}
              </td>
            </tr>
          );
        })}
        {/* <tr>
          <th scope="row">유럽</th>
          <td>20</td>
          <td>10</td>
          <td style={{ color: "red" }}>10</td>
        </tr>
        <tr>
          <th scope="row">미주</th>
          <td>30</td>
          <td>12</td>
          <td style={{ color: "red" }}>18</td>
        </tr>
        <tr>
          <th scope="row">동남아</th>
          <td>50</td>
          <td>13</td>
          <td style={{ color: "red" }}>37</td>
        </tr> */}
      </tbody>
    </Table>
  );
};

export default DashBoardTable;
