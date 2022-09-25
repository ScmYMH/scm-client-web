import { Card, CardSubtitle, CardTitle, Col, Row } from "reactstrap";
import GoogleMapForm from "../googleMapInfo/GoogleMapForm";
import ShipMentInfoForm from "../googleMapInfo/ShipMentInfoForm";
import ShipTable from "../googleMapInfo/ShipTable";
import DashBoardDoughnutChart from "./DashBoardDoughnutChart";
import DashBoardHorizontalAccountChart from "./DashBoardHorizontalAccountChart";
import DashBoardHorizontalManagerChart from "./DashBoardHorizontalManagerChart";
import DashBoardTable from "./DashBoardTable";
import DashBoardTableDetail from "./DashBoardTableDetail";
import DashBoardVerticalChart from "./DashBoardVerticalChart";

const DashBoardLoader = () => {
  return (
    <>
      <div
        style={{
          margin: "0",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <h5 style={{ fontWeight: "bold", color: "#003366" }}>
          ● 구글 맵 선적 정보
        </h5>
      </div>
      <Card style={{ marginTop: "1em" }}>
        <Row style={{ marginBottom: "1em"}}>
          <Col sm="8">
            <Card style={{ marginLeft: "0.5em", marginBottom: "1.5em"}}>
             <GoogleMapForm />
             </Card>
          </Col>
          <Col sm="4">
            <div style={{marginTop:"3em"}}>
            <Card style={{ width: "25em", marginBottom: "1em"}}>
              <CardTitle
                  tag="h5"
                  style={{ margin:"1em", color: "#3C5087" }}
                >
                  <b>권역별</b> 물류비 정산 진행 현황
                </CardTitle>
              <DashBoardTable></DashBoardTable>
            </Card>
            <Card style={{ width: "25em", marginBottom: "1em"}}>
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
        <Row>
          <Card style={{ width: "90%"}}>
            <ShipTable />
          </Card>
        </Row>
        <Row
          style={{
          }}
        >
          {/* <Col sm="6">
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
          </Col> */}
        </Row>
      </Card>
      
    </>
  );
};

export default DashBoardLoader;
