import { Card } from "reactstrap";
import { GoogleMapForm } from "./GoogleMapForm";
import ShipMentInfoForm from "./ShipMentInfoForm";
import ShipTable from "./ShipTable";

const ShipMentInfoLoader = () => {
  return (
    <>
      <div>
        <header>
          <div
            style={{
              marginTop: 0,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: "2em",
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
              <h5 style={{ fontWeight: "bold", color: "#003366" }}>
                ● 계약 단가 및 정산 관리 시각화
              </h5>
            </div>
          </div>
        </header>
      </div>
      <Card style={{ marginLeft: "2em", minHeight: "30em", width: "60em" }}>
        <GoogleMapForm />
      </Card>
      {/* <DashBoardLoader /> */}
    </>
  );
};

export default ShipMentInfoLoader;
