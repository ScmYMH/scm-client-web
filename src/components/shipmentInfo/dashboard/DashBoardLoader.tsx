import { Card, CardSubtitle, CardTitle, Col, Row } from "reactstrap";
import ShipMentInfoForm from "../googleMapInfo/ShipMentInfoForm";
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
            <Card>
             <ShipMentInfoForm />
             </Card>
          </Col>
          <Col sm="6">
            <div style={{height:"400", width: "300", marginLeft: "6em", marginTop:"0.5em"}}>
            <Card style={{ marginLeft: "1em", marginBottom: "1em"}}>
              <CardTitle
                  tag="h5"
                  style={{ margin:"1em", color: "#3C5087" }}
                >
                  <b>권역별</b> 물류비 정산 진행 현황
                </CardTitle>
              <DashBoardTable></DashBoardTable>
            </Card>
            <Card style={{ marginLeft: "1em", marginBottom: "1em"}}>
              <CardTitle
                  tag="h5"
                  style={{ margin:"1em", color: "#3C5087" }}
                >
                  <b>유럽</b> 물류비 미정산 건 진행현황
                </CardTitle>
              <DashBoardTableDetail></DashBoardTableDetail>
            </Card>
            </div>
          </Col>
        </Row>
        <Row
          style={{
          }}
        >
          <Col sm="6">
            <Card style={{ height:"300", width: "300" }}>
              <CardTitle
                tag="h5"
                style={{ margin:"1em", color: "#3C5087" }}
              >
                <b>Graph 1</b>
              </CardTitle>
              <DashBoardVerticalChart></DashBoardVerticalChart>
            </Card>
          </Col>
          <Col sm="6">
            <Card style={{ height:"300", width: "300" }}>
              <CardTitle
                tag="h5"
                style={{ margin:"1em", color: "#3C5087"  }}
              >
                <b>Graph 2</b>
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
