import { Button, Col, Input, Row, Table } from "reactstrap";
import { HiSearch } from "react-icons/hi";
import { useEffect } from "react";

const TariffInfoForm = () => {
  const LccCd = [
    { value: "", text: "" },
    { value: "10A1", text: "10A1" },
    { value: "10D1", text: "10D1" },
  ];

  const tarrifInfoListData = [
    {
      departCd: "KORKANT01",
      departDesc: "광양제철소",
      arrivalCd: "IDNBLWP01", // 도착지코드
      arrivalDesc: "BELAWAN", // 도착지명
      lccCd: "10D1", // 물류비계정
      subLccCd: "105", // 세부물류비
      lccCdNm: "국제해송비 (COA)(제품)", // 세부물류비설명
      cntrtCurrCd: "USD", // 계약통화
      payCurrCd: "USD", // 지불통화
      tariffItemCd: "Y-일반", // 품종명
      cost: "58.2", // 단가
      unitCd: "TON", // 계산단위
      incoCd: "6A1", // 인도조건
      condId: "", // 조건ID
      condNm: "", // 조건명
    },
  ];

  const addNewLine = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("addNewLine");
    tarrifInfoListData.push({
      departCd: "",
      departDesc: "",
      arrivalCd: "", // 도착지코드
      arrivalDesc: "", // 도착지명
      lccCd: "", // 물류비계정
      subLccCd: "", // 세부물류비
      lccCdNm: "", // 세부물류비설명
      cntrtCurrCd: "", // 계약통화
      payCurrCd: "", // 지불통화
      tariffItemCd: "", // 품종명
      cost: "", // 단가
      unitCd: "", // 계산단위
      incoCd: "", // 인도조건
      condId: "", // 조건ID
      condNm: "", // 조건명
    });
  };

  useEffect(() => {
    console.log("행추가");
    console.log("tarrifInfoListData : ", tarrifInfoListData);
  }, [tarrifInfoListData]);

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
                <Button
                  size="sm"
                  style={{ marginLeft: "10px" }}
                  onClick={(e) => {
                    addNewLine(e);
                  }}
                >
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
        <div
          style={{
            maxHeight: "210px",
            overflowY: "auto",
            marginTop: 20,
          }}
        >
          <Table bordered style={{ height: 30 }}>
            <thead style={{ textAlign: "center" }}>
              <tr className="table-secondary">
                <th style={{ width: 50 }}></th>
                <th style={{ width: 70 }}>출발지코드</th>
                <th style={{ width: 90 }}>출발지명</th>
                <th style={{ width: 70 }}>도착지코드</th>
                <th style={{ width: 90 }}>도착지명</th>
                <th style={{ width: 80 }}>물류비계정</th>
                <th style={{ width: 80 }}>세부물류비</th>
                <th style={{ width: 180 }}>세부물류비설명</th>
                <th style={{ width: 70 }}>계약통화</th>
                <th style={{ width: 70 }}>지불통화</th>
                <th style={{ width: 70 }}>품종명</th>
                <th style={{ width: 70 }}>단가</th>
                <th style={{ width: 70 }}>계산단위</th>
                <th style={{ width: 70 }}>인도조건</th>
                <th style={{ width: 70 }}>조건ID</th>
                <th style={{ width: 70 }}>조건명</th>
              </tr>
            </thead>
            <tbody>
              {tarrifInfoListData?.map((tarrifInfo, index) => (
                <tr key={index}>
                  <th scope="row" style={{ textAlign: "center", width: 50 }}>
                    <Input
                      type="checkbox"
                      // onChange={(e) =>
                      //   onChangeCommonInfoCheckBox(e, commonInfo.cntrtId)
                      // }
                      // checked={
                      //   mngChgInfo.cntrtId.find(
                      //     (id) => id == commonInfo.cntrtId
                      //   )
                      //     ? true
                      //     : false
                      // }
                    />
                  </th>
                  <td
                    style={{ textAlign: "right", paddingRight: 20, width: 70 }}
                  >
                    {tarrifInfo.departCd}
                  </td>
                  <td style={{ width: 90 }}>{tarrifInfo.departDesc}</td>
                  <td style={{ width: 70 }}>{tarrifInfo.arrivalCd}</td>
                  <td style={{ width: 90 }}>{tarrifInfo.arrivalDesc}</td>
                  <td style={{ width: 80 }}>{tarrifInfo.lccCd}</td>
                  <td style={{ width: 80 }}>{tarrifInfo.subLccCd}</td>
                  <td style={{ width: 180 }}>{tarrifInfo.lccCdNm}</td>
                  <td style={{ width: 70 }}>{tarrifInfo.cntrtCurrCd}</td>
                  <td style={{ width: 70 }}>{tarrifInfo.payCurrCd}</td>
                  <td style={{ width: 70 }}>{tarrifInfo.tariffItemCd}</td>
                  <td style={{ width: 70 }}>{tarrifInfo.cost}</td>
                  <td style={{ width: 70 }}>{tarrifInfo.unitCd}</td>
                  <td style={{ width: 70 }}>{tarrifInfo.incoCd}</td>
                  <td style={{ width: 70 }}>{tarrifInfo.condId}</td>
                  <td style={{ width: 70 }}>{tarrifInfo.condNm}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default TariffInfoForm;
