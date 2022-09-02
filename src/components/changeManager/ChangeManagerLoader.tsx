import { Card } from "reactstrap";
import ChangeManagerForm from "./ChangeManagerForm";
import Header from "./Header";

const ChangeManagerLoader = () => {
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
                ● 계약 담당자 변경
              </h5>
            </div>
          </div>
        </header>
      </div>
      <Card style={{ minHeight: "900px" }}>
        <ChangeManagerForm></ChangeManagerForm>
      </Card>
    </>
  );
};

export default ChangeManagerLoader;
