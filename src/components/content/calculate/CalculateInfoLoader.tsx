import { Card } from "reactstrap";
import CalculateInfoForm from "./CalculateInfoForm";

const CalculateInfoLoader = () => {
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
              <h5 style={{ fontWeight: "bold", color: "#003366" }}>
                ● 국제해송 정산
              </h5>
            </div>
          </div>
        </header>
      </div>
      <Card style={{ minHeight: "900px" }}>
        <CalculateInfoForm />
      </Card>
    </>
  );
};

export default CalculateInfoLoader;
