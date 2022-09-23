import { Table } from "reactstrap";

const DashBoardTable = () => {
  return (
    <Table >
      <thead>
        <tr>
          <th></th>
          <th>총 대상건수</th>
          <th>정산완료</th>
          <th>미완료</th>
        </tr>
      </thead>
      <tbody>
        <tr>
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
        </tr>
      </tbody>
    </Table>
  );
};

export default DashBoardTable;
