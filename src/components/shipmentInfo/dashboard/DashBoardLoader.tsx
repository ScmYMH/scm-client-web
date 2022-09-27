import { RootState } from "modules";
import { getCalculateInfoAsync } from "modules/dashboard/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardSubtitle, CardTitle, Col, Row } from "reactstrap";
import { GoogleMapForm } from "../googleMapInfo/GoogleMapForm";
import ShipMentInfoForm from "../googleMapInfo/ShipMentInfoForm";
import ShipTable from "../googleMapInfo/ShipTable";
import DashBoardDoughnutChart from "./DashBoardDoughnutChart";
import DashBoardDoughnutChart2 from "./DashBoardDoughnutChart2";
import DashBoardDoughnutChart3 from "./DashBoardDoughnutChart3";
import DashBoardHorizontalAccountChart from "./DashBoardHorizontalAccountChart";
import DashBoardTable from "./DashBoardTable";
import DashBoardTableDetail from "./DashBoardTableDetail";
import DashBoardVerticalChart from "./DashBoardVerticalChart";

export interface DashBoardData {
  regionNm: string; // 권역별 이름
  numCloseNoY: number; // 정산 완료 건수
  numCloseNoN: number; // 정산 미완료 건수
  numClearAmtY: number; // 운임정산 완료 건수
  numClearAmtN: number; // 운임정산 미완료 건수
  numDstConfY: number; // 담당자확정 완료 건수
  numDstConfN: number; // 담당자확정 미완료 건수
  numAcctgY: number; // 회계연결 완료 건수
  numAcctgN: number; // 회계연결 미완료 건수
}

const DashBoardLoader = () => {
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState<any>();
  const [nationArr, setNationArr] = useState<any>([]);

  const {
    data: calculateInfoData,
    loading: calculateInfoLoading,
    error: calculateInfoError,
  } = useSelector((state: RootState) => state.dashboard.dashboardCalculateInfo);

  if (calculateInfoData !== null) {
    console.log("=================calculateInfoData : ", calculateInfoData);
  }

  const dataOrganization = () => {
    const nationArray = calculateInfoData?.map((data) => {
      return data.nation_nm;
    });
    const uniqNationSet = new Set(nationArray);
    const uniqNationArray = Array.from(uniqNationSet);

    const nationList = uniqNationArray.map((nation) => {
      return calculateInfoData?.filter((data) => nation === data.nation_nm);
    });

    setTableData(nationList);
  };

  const onClickTableRow = (nationArray: any) => {
    setNationArr(nationArray);
  };

  useEffect(() => {
    dispatch(getCalculateInfoAsync.request());
  }, []);

  useEffect(() => {
    if (calculateInfoData?.length !== 0) {
      dataOrganization();
    }
  }, [calculateInfoData]);

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
      <Card style={{ margin: "1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2rem",
            marginLeft: "1rem",
          }}
        >
          <div
            style={{ fontWeight: "bold", color: "#003366", fontSize: "1.1rem" }}
          >
            ◎ 선박 해상 경로에 따른 단가 관리
          </div>
        </div>
        <Row style={{ marginBottom: "2rem" }}>
          <Col sm="8">
            {/* <ShipMentInfoForm /> */}
            <div style={{ marginTop: "0.5rem" }}>
              <GoogleMapForm />
            </div>
          </Col>
        </Row>
        {/* <Row style={{ marginBottom: "1rem" }}>
          <Card style={{ width: "90%" }}>
            <ShipTable />
          </Card>
        </Row> */}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{ fontWeight: "bold", color: "#003366", fontSize: "1.1rem" }}
          >
            ◎ 물류비 정산 진행 현황
          </div>
        </div>
        {calculateInfoLoading ? (
          <img
            src="../../images/loading.gif"
            width={"60em"}
            height={"80em"}
            style={{
              display: "block",
              verticalAlign: "middle",
              marginLeft: "1rem",
            }}
          ></img>
        ) : (
          <div>
            <Row style={{ marginBottom: "1rem" }}>
              <Col sm="6">
                <Card>
                  <CardTitle
                    tag="h5"
                    style={{ margin: "1rem", color: "#3C5087" }}
                  >
                    <b>권역별</b> 물류비 정산 진행 현황
                  </CardTitle>
                  <DashBoardTable
                    tableData={tableData}
                    onClickTableRow={onClickTableRow}
                  ></DashBoardTable>
                </Card>
              </Col>
              <Col sm="6">
                <Card>
                  <CardTitle
                    tag="h5"
                    style={{ margin: "1rem", color: "#3C5087" }}
                  >
                    <b>{nationArr[0]?.nation_nm}</b> 물류비 미정산 건 진행현황
                  </CardTitle>
                  <DashBoardTableDetail
                    nationArr={nationArr}
                  ></DashBoardTableDetail>
                </Card>
              </Col>
            </Row>
            <Row style={{ marginBottom: "1rem" }}>
              <Col sm="6">
                <Card style={{ height: "28rem" }}>
                  <CardTitle
                    tag="h5"
                    style={{ margin: "1rem", color: "#3C5087" }}
                  >
                    권역별 물류비 정산 진행 현황
                  </CardTitle>
                  <DashBoardVerticalChart
                    tableData={tableData}
                  ></DashBoardVerticalChart>
                </Card>
              </Col>
              <Col sm="6">
                <Row>
                  <Col sm="4">
                    <Card style={{ height: "28rem" }}>
                      <CardTitle
                        tag="h5"
                        style={{
                          margin: "1rem",
                          color: "#3C5087",
                          marginBottom: "2em",
                        }}
                      >
                        <b>{nationArr[0]?.nation_nm}</b> 미정산 건{" "}
                        <b>운임정산</b> 진행현황
                      </CardTitle>
                      <DashBoardDoughnutChart
                        nationArr={nationArr}
                      ></DashBoardDoughnutChart>
                    </Card>
                  </Col>
                  <Col sm="4">
                    <Card style={{ height: "28rem" }}>
                      <CardTitle
                        tag="h5"
                        style={{
                          margin: "1rem",
                          color: "#3C5087",
                          marginBottom: "2em",
                        }}
                      >
                        <b>{nationArr[0]?.nation_nm}</b> 미정산 건{" "}
                        <b>담당자확정</b> 진행현황
                      </CardTitle>
                      <DashBoardDoughnutChart2
                        nationArr={nationArr}
                      ></DashBoardDoughnutChart2>
                    </Card>
                  </Col>
                  <Col sm="4">
                    <Card style={{ height: "28rem" }}>
                      <CardTitle
                        tag="h5"
                        style={{
                          margin: "1rem",
                          color: "#3C5087",
                          marginBottom: "2em",
                        }}
                      >
                        <b>{nationArr[0]?.nation_nm}</b> 미정산 건{" "}
                        <b>회계연결</b> 진행현황
                      </CardTitle>
                      <DashBoardDoughnutChart3
                        nationArr={nationArr}
                      ></DashBoardDoughnutChart3>
                    </Card>
                  </Col>
                </Row>
                {/* <Row style={{ marginBottom: "1rem" }}>
              <Col sm="6">
                <Card style={{ height: "15rem" }}>
                  <CardTitle
                    tag="h5"
                    style={{ margin: "1rem", color: "#3C5087" }}
                  >
                    <b>{nationArr[0]?.nation_nm}</b> 미정산 건 운임정산 진행현황
                  </CardTitle>
                  <DashBoardDoughnutChart></DashBoardDoughnutChart>
                </Card>
              </Col>
              <Col sm="6">
                <Card style={{ height: "15rem" }}>
                  <CardTitle
                    tag="h5"
                    style={{ margin: "1rem", color: "#3C5087" }}
                  >
                    <b>Graph 2</b>
                  </CardTitle>
                  <DashBoardDoughnutChart></DashBoardDoughnutChart>
                </Card>
              </Col>
            </Row> */}
              </Col>
            </Row>
          </div>
        )}
      </Card>
    </>
  );
};

export default DashBoardLoader;
