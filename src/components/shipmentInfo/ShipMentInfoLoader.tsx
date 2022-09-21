import { Card } from "reactstrap";
import ShipMentInfoForm from "./ShipMentInfoForm";

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
                ● 국제 해송 선박 구글 맵 제공
              </h5>
            </div>
          </div>
        </header>
      </div>
      <Card style={{ marginLeft:"2em", minHeight: "900px", width:"1300px" }}>
        <ShipMentInfoForm />
      </Card>
      {/* <DashBoardLoader /> */}
    </>
    )
}


export default ShipMentInfoLoader;
