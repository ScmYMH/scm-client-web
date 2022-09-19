import { Card, CardSubtitle, CardTitle, Col, Row } from "reactstrap";
import DashBoardDoughnutChart from "./DashBoardDoughnutChart";
import DashBoardHorizontalAccountChart from "./DashBoardHorizontalAccountChart";
import DashBoardHorizontalManagerChart from "./DashBoardHorizontalManagerChart";
import DashBoardTable from "./DashBoardTable";
import DashBoardTableDetail from "./DashBoardTableDetail";
import DashBoardVerticalChart from "./DashBoardVerticalChart";

const DashBoardLoader = () => {
  return (
    <>
      <div>
        <header>
          <div
            style={{
              marginTop: 0,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 0,
            }}
          >
            <div
              style={{
                margin: "0",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <h5 style={{ fontWeight: "bold", color: "#003366" }}>● Home</h5>
            </div>
          </div>
        </header>
      </div>
      <Card style={{ minHeight: "900px", minWidth: "1200px" }}>
        {/* <Row style={{ margin: "30px" }}>
          <Col sm="6">
            <Card style={{ marginBottom: "20px" }}>
              <DashBoardHorizontalManagerChart></DashBoardHorizontalManagerChart>
            </Card>
          </Col>
          <Col sm="6">
            <Card>
              <DashBoardHorizontalAccountChart></DashBoardHorizontalAccountChart>
            </Card>
          </Col>
        </Row> */}
        <Row
          style={{
            margin: "30px",
          }}
        >
          <Col sm="6">
            <Card style={{ marginBottom: "20px", padding: "10px" }}>
              <CardTitle
                tag="h5"
                style={{ marginBottom: "20px", color: "	#3C5087" }}
              >
                권역별 물류비 정산 진행 현황
              </CardTitle>
              <DashBoardTable></DashBoardTable>
            </Card>
          </Col>
          <Col sm="6">
            <Card style={{ marginBottom: "20px", padding: "10px" }}>
              <CardTitle
                tag="h5"
                style={{ marginBottom: "20px", color: "	#3C5087" }}
              >
                <b>유럽</b> 물류비 미정산 건 진행현황
              </CardTitle>
              <DashBoardTableDetail></DashBoardTableDetail>
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default DashBoardLoader;
