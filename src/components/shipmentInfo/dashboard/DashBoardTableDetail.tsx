import { useEffect, useState } from "react";
import { Table } from "reactstrap";

const DashBoardTableDetail = ({ nationArr }: { nationArr: any }) => {
  const [numDataList, setNumDataList] = useState({
    numClearAmtY: 0, // 운임정산 완료 건수
    numClearAmtN: 0, // 운임정산 미완료 건수
    numDstConfY: 0, // 담당자확정 완료 건수
    numDstConfN: 0, // 담당자확정 미완료 건수
    numAcctgY: 0, // 회계연결 완료 건수
    numAcctgN: 0, // 회계연결 미완료 건수
  });

  console.log("===============nationArr : ", nationArr);
  console.log("================numDataList : ", numDataList);

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

    const tempNumDstConfY = nationArr.filter(
      (nation) =>
        (nation.close_no_yn === "N" || nation.close_no_yn == null) &&
        nation.dst_conf_yn === "Y"
    ).length;

    const tempNumDstConfN = nationArr.filter(
      (nation) =>
        (nation.close_no_yn === "N" || nation.close_no_yn == null) &&
        nation.dst_conf_yn === "N"
    ).length;

    const tempNumAcctgY = nationArr.filter(
      (nation) =>
        (nation.close_no_yn === "N" || nation.close_no_yn == null) &&
        nation.acctg_yn === "Y"
    ).length;

    const tempNumAcctgN = nationArr.filter(
      (nation) =>
        (nation.close_no_yn === "N" || nation.close_no_yn == null) &&
        (nation.acctg_yn === "N" || nation.acctg_yn == null)
    ).length;

    setNumDataList({
      ...numDataList,
      numClearAmtY: tempNumClearAmtY,
      numClearAmtN: tempNumClearAmtN,
      numDstConfY: tempNumDstConfY,
      numDstConfN: tempNumDstConfN,
      numAcctgY: tempNumAcctgY,
      numAcctgN: tempNumAcctgN,
    });
  }, [nationArr]);

  return (
    <Table>
      <thead>
        <tr>
          <th></th>
          <th>완료</th>
          <th>미완료</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">운임정산</th>
          <td>{numDataList.numClearAmtY}</td>
          <td style={{ color: "red" }}>{numDataList.numClearAmtN}</td>
        </tr>
        <tr>
          <th scope="row">담당자확정</th>
          <td>{numDataList.numDstConfY}</td>
          <td style={{ color: "red" }}>{numDataList.numDstConfN}</td>
        </tr>
        <tr>
          <th scope="row">회계연결</th>
          <td>{numDataList.numAcctgY}</td>
          <td style={{ color: "red" }}>{numDataList.numAcctgN}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default DashBoardTableDetail;
