import { Button, Col, Input, Row, Table } from "reactstrap";
import { HiSearch } from "react-icons/hi";

const TariffInfoForm = () => {
  const LccCd = [
    { value: "", text: "" },
    { value: "10A1", text: "10A1" },
    { value: "10D1", text: "10D1" },
  ];

  return (
    <>
      <div style={{ marginLeft: 20, marginRight: 20 }}>
        <Row style={{ marginTop: 50 }}>
          <Col>
            <h4 style={{ marginTop: 10 }}>타리프 정보</h4>
          </Col>
          <Col>
            <Row>
              <div
                style={{
                  margin: "3px",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Button size="sm" style={{ marginLeft: "10px" }}>
                  조회
                </Button>
                <Button size="sm" style={{ marginLeft: "10px" }}>
                  복사
                </Button>
                <Button size="sm" style={{ marginLeft: "10px" }}>
                  행추가
                </Button>
                <Button size="sm" style={{ marginLeft: "10px" }}>
                  행삭제
                </Button>
              </div>
              <div
                style={{
                  margin: "3px",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Button size="sm" style={{ marginLeft: 10 }}>
                  조건등록
                </Button>
                <Button size="sm" style={{ marginLeft: 10 }}>
                  저장
                </Button>
                <Button size="sm" style={{ marginLeft: 10 }}>
                  삭제
                </Button>
                <Button size="sm" style={{ marginLeft: 10 }}>
                  엑셀 Export
                </Button>
              </div>
            </Row>
          </Col>
        </Row>
        <Table bordered>
          <tr>
            <th colSpan={1} style={{ paddingLeft: 10, paddingRight: 10 }}>
              유효기간
            </th>
            <td colSpan={2}>
              <Input
                type="date"
                style={{
                  boxShadow: "none",
                  width: 230,
                  display: "inline-block",
                }}
              ></Input>
            </td>
            <th colSpan={1} style={{ paddingLeft: 20, paddingRight: 10 }}>
              출발지
            </th>

            <td colSpan={2}>
              <div style={{ padding: 3 }}>
                <Input
                  type="text"
                  value={"팝업"}
                  id="departures"
                  style={{
                    boxShadow: "none",
                    width: 230,
                    display: "inline-block",
                  }}
                ></Input>
                <HiSearch
                  style={{ marginLeft: 10, cursor: "pointer" }}
                ></HiSearch>
              </div>
            </td>
          </tr>
          <tr>
            <th colSpan={1} style={{ paddingLeft: 10, paddingRight: 10 }}>
              물류비계정
            </th>
            <td colSpan={2}>
              <select id="LccCd" name="LccCd" style={{ width: 230 }}>
                {LccCd.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </td>
            <th colSpan={1} style={{ paddingLeft: 20, paddingRight: 10 }}>
              도착지
            </th>
            <td colSpan={2}>
              <div style={{ padding: 3 }}>
                <Input
                  type="text"
                  value={"팝업"}
                  id="arrivals"
                  style={{
                    boxShadow: "none",
                    width: 230,
                    display: "inline-block",
                  }}
                ></Input>
                <HiSearch
                  style={{ marginLeft: 10, cursor: "pointer" }}
                ></HiSearch>
              </div>
            </td>
          </tr>
        </Table>
      </div>
    </>
  );
};

export default TariffInfoForm;
