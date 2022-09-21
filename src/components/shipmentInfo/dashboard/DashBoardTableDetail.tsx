import { Table } from "reactstrap";

const DashBoardTableDetail = () => {
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
          <td>8</td>
          <td style={{ color: "red" }}>2</td>
        </tr>
        <tr>
          <th scope="row">담당자확정</th>
          <td>6</td>
          <td style={{ color: "red" }}>4</td>
        </tr>
        <tr>
          <th scope="row">회계연결</th>
          <td>5</td>
          <td style={{ color: "red" }}>5</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default DashBoardTableDetail;
