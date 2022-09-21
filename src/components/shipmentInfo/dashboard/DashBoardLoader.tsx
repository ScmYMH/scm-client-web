import ShipMentInfoForm from "components/shipmentInfo/ShipMentInfoForm";
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
      <Card style={{ marginTop: "1em" }}>
        <Row style={{ marginBottom: "1em"}}>
          <Col sm="6">
            <Card style={{ }}>
             <ShipMentInfoForm />
            </Card>
          </Col>
          <Col sm="6">
            <Card style={{ marginLeft: "1em", marginBottom: "1em"}}>
              <DashBoardTable></DashBoardTable>
            </Card>
            <Card>
              <DashBoardTableDetail></DashBoardTableDetail>
            </Card>
          </Col>
        </Row>
        <Row
          style={{
          }}
        >
          <Col sm="6">
            <Card style={{ }}>
              <CardTitle
                tag="h5"
                style={{ marginBottom: "20px", color: "	#3C5087" }}
              >
                권역별 물류비 정산 진행 현황
              </CardTitle>
              <DashBoardVerticalChart></DashBoardVerticalChart>
            </Card>
          </Col>
          <Col sm="6">
            <Card style={{  }}>
              <CardTitle
                tag="h5"
                style={{ marginBottom: "20px", color: "	#3C5087" }}
              >
                <b>유럽</b> 물류비 미정산 건 진행현황
              </CardTitle>
              <DashBoardHorizontalAccountChart></DashBoardHorizontalAccountChart>
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default DashBoardLoader;
