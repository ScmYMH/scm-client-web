import { Alert, Button, Col, Input, Row, Table } from "reactstrap";
import { HiSearch } from "react-icons/hi";
import { useEffect, useState } from "react";
import { TariffCondParam } from "modules/tariff/types";
import SearchDestModal from "./SearchDestModal";
import SearchLccModal from "./SearchLccModal";

const TariffCondHForm = ({ isSave }: { isSave: boolean }) => {
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

  const [whatNode, setWhatNode] = useState("");

  const [nodeNm, setNodeNm] = useState({
    departNodeNm: "",
    arrivalNodeNm: "",
  });

  const [tariffCondParam, setTariffCondParam] = useState<TariffCondParam>({
    lccCd: "",
    departNodeCd: "",
    arrivalNodeCd: "",
  });

  const [openDepartModal, setOpenDepartModal] = useState(false);
  const [openArrivalModal, setOpenArrivalModal] = useState(false);
  const [openRowDepartCdModal, setOpenRowDepartCdModal] = useState(false);
  const [openRowArrivalCdModal, setOpenRowArrivalCdModal] = useState(false);
  const [openLccModal, setOpenLccModal] = useState(false);

  const onClickNode = (nodeCd: string, nodeDesc: string) => {
    console.log("nodeCd: ", nodeCd, " nodeDesc: ", nodeDesc);
    if (whatNode === "departCond") {
      // 출발지 cond 선택하는 경우
      setNodeNm({ ...nodeNm, departNodeNm: nodeDesc });
      setTariffCondParam({ ...tariffCondParam, departNodeCd: nodeCd });
    } else if (whatNode === "arrivalCond") {
      // 도착지 cond 선택하는 경우
      setNodeNm({ ...nodeNm, arrivalNodeNm: nodeDesc });
      setTariffCondParam({ ...tariffCondParam, arrivalNodeCd: nodeCd });
    } else if (whatNode === "rowDepartCode") {
      // row에 있는 출발지 코드 선택시
    } else if (whatNode === "rowArrivalCode") {
      // row에 있는 도착지 코드 선택시
    }
  };

  const onClickLcc = (lccCd: string, subLccCd: string, lccCdDesc: string) => {
    console.log(
      "lccCd: ",
      lccCd,
      " subLccCd: ",
      subLccCd,
      " lccCdDesc: ",
      lccCdDesc
    );
  };

  const onClickSearch = () => {
    console.log("조회 버튼 클릭");
    if (!isSave) {
      alert("타리프 헤더정보가 없습니다");
    }
  };

  const onClickCopy = () => {
    console.log("복사 버튼 클릭");
    if (!isSave) {
      alert("타리프 헤더정보가 없습니다");
    }
  };

  const onClickAddRow = () => {
    console.log("행추가 버튼 클릭");
    if (!isSave) {
      alert("타리프 헤더정보가 없습니다");
    }
  };

  const onClickDelRow = () => {
    console.log("행삭제 버튼 클릭");
    if (!isSave) {
      alert("타리프 헤더정보가 없습니다");
    }
  };

  const onClickCondEnroll = () => {
    console.log("조건등록 버튼 클릭");
    if (!isSave) {
      alert("타리프 헤더정보가 없습니다");
    }
  };

  const onClickSave = () => {
    console.log("저장 버튼 클릭");
    if (!isSave) {
      alert("타리프 헤더정보가 없습니다");
    }
  };

  const onClickDelete = () => {
    console.log("삭제 버튼 클릭");
    if (!isSave) {
      alert("타리프 헤더정보가 없습니다");
    }
  };

  const onClickExcelExport = () => {
    console.log("엑셀 export 버튼 클릭");
    if (!isSave) {
      alert("타리프 헤더정보가 없습니다");
    }
  };

  const onClickExcelImport = () => {
    console.log("ADD 버튼 클릭");
    if (!isSave) {
      alert("타리프 헤더정보가 없습니다");
    }
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
                <Button
                  size="sm"
                  style={{ marginLeft: "10px" }}
                  onClick={onClickSearch}
                >
                  조회
                </Button>
                <Button
                  size="sm"
                  style={{ marginLeft: "10px" }}
                  onClick={onClickCopy}
                >
                  복사
                </Button>
                <Button
                  size="sm"
                  style={{ marginLeft: "10px" }}
                  onClick={onClickAddRow}
                >
                  행추가
                </Button>
                <Button
                  size="sm"
                  style={{ marginLeft: "10px" }}
                  onClick={onClickDelRow}
                >
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
                <Button
                  size="sm"
                  style={{ marginLeft: 10 }}
                  onClick={onClickCondEnroll}
                >
                  조건등록
                </Button>
                <Button
                  size="sm"
                  style={{ marginLeft: 10 }}
                  onClick={onClickSave}
                >
                  저장
                </Button>
                <Button
                  size="sm"
                  style={{ marginLeft: 10 }}
                  onClick={onClickDelete}
                >
                  삭제
                </Button>
                <Button
                  size="sm"
                  style={{ marginLeft: 10 }}
                  onClick={onClickExcelExport}
                >
                  엑셀 Export
                </Button>
                <Button
                  size="sm"
                  style={{ marginLeft: 10 }}
                  onClick={onClickExcelImport}
                >
                  Add
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
                  value={nodeNm.departNodeNm}
                  id="departures"
                  readOnly
                  style={{
                    boxShadow: "none",
                    width: 230,
                    display: "inline-block",
                  }}
                ></Input>
                <HiSearch
                  style={{ marginLeft: 10, cursor: "pointer" }}
                  onClick={() => {
                    setOpenDepartModal((openDepartModal) => !openDepartModal);
                    setWhatNode("departCond");
                  }}
                ></HiSearch>
                {openDepartModal && (
                  <SearchDestModal
                    isOpen={openDepartModal}
                    closeModal={() =>
                      setOpenDepartModal((openDepartModal) => !openDepartModal)
                    }
                    onClickNode={onClickNode}
                    nodeNm={nodeNm}
                    whatNode={whatNode}
                  />
                )}
              </div>
            </td>
          </tr>
          <tr>
            <th colSpan={1} style={{ paddingLeft: 10, paddingRight: 10 }}>
              물류비계정
            </th>
            <td colSpan={2}>
              <select
                onChange={(e) =>
                  setTariffCondParam({
                    ...tariffCondParam,
                    lccCd: e.target.value,
                  })
                }
                id="LccCd"
                name="LccCd"
                style={{ width: 230 }}
              >
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
                  value={nodeNm.arrivalNodeNm}
                  id="arrivals"
                  readOnly
                  style={{
                    boxShadow: "none",
                    width: 230,
                    display: "inline-block",
                  }}
                ></Input>
                <HiSearch
                  style={{ marginLeft: 10, cursor: "pointer" }}
                  onClick={() => {
                    setOpenArrivalModal(
                      (openArrivalModal) => !openArrivalModal
                    );
                    setWhatNode("arrivalCond");
                  }}
                ></HiSearch>

                {openArrivalModal && (
                  <SearchDestModal
                    onClickNode={onClickNode}
                    isOpen={openArrivalModal}
                    closeModal={() =>
                      setOpenArrivalModal(
                        (openArrivalModal) => !openArrivalModal
                      )
                    }
                    nodeNm={nodeNm}
                    whatNode={whatNode}
                  />
                )}
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
                <th style={{ width: 100 }}>출발지코드</th>
                <th style={{ width: 90 }}>출발지명</th>
                <th style={{ width: 100 }}>도착지코드</th>
                <th style={{ width: 90 }}>도착지명</th>
                <th style={{ width: 80 }}>물류비계정</th>
                <th style={{ width: 80 }}>세부물류비</th>
                <th style={{ width: 160 }}>세부물류비설명</th>
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
                  <td style={{ textAlign: "center", width: 100 }}>
                    {tarrifInfo.departCd}
                    <HiSearch
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setOpenRowDepartCdModal(
                          (openRowDepartCdModal) => !openRowDepartCdModal
                        );
                        setWhatNode("rowDepartCode");
                      }}
                    ></HiSearch>

                    {openRowDepartCdModal && (
                      <SearchDestModal
                        onClickNode={onClickNode}
                        isOpen={openRowDepartCdModal}
                        closeModal={() =>
                          setOpenRowDepartCdModal(
                            (openRowDepartCdModal) => !openRowDepartCdModal
                          )
                        }
                        nodeNm={tarrifInfo.departDesc}
                        whatNode={whatNode}
                      />
                    )}
                  </td>

                  <td style={{ textAlign: "center", width: 90 }}>
                    {tarrifInfo.departDesc}
                  </td>
                  <td style={{ textAlign: "center", width: 100 }}>
                    {tarrifInfo.arrivalCd}
                    <HiSearch
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setOpenRowArrivalCdModal(
                          (openRowArrivalCdModal) => !openRowArrivalCdModal
                        );
                        setWhatNode("rowArrivalCode");
                      }}
                    ></HiSearch>

                    {openRowArrivalCdModal && (
                      <SearchDestModal
                        onClickNode={onClickNode}
                        isOpen={openRowArrivalCdModal}
                        closeModal={() =>
                          setOpenRowArrivalCdModal(
                            (openRowArrivalCdModal) => !openRowArrivalCdModal
                          )
                        }
                        nodeNm={tarrifInfo.arrivalDesc}
                        whatNode={whatNode}
                      />
                    )}
                  </td>
                  <td style={{ textAlign: "center", width: 90 }}>
                    {tarrifInfo.arrivalDesc}
                  </td>
                  <td style={{ textAlign: "right", width: 80 }}>
                    {tarrifInfo.lccCd}
                    <HiSearch
                      style={{ marginLeft: 10, cursor: "pointer" }}
                      onClick={() => {
                        setOpenLccModal((openLccModal) => !openLccModal);
                      }}
                    ></HiSearch>
                    {openLccModal && (
                      <SearchLccModal
                        isOpen={openLccModal}
                        closeModal={() =>
                          setOpenLccModal((openLccModal) => !openLccModal)
                        }
                        onClickLcc={onClickLcc}
                      />
                    )}
                  </td>
                  <td style={{ textAlign: "center", width: 80 }}>
                    {tarrifInfo.subLccCd}
                  </td>
                  <td style={{ width: 160 }}>{tarrifInfo.lccCdNm}</td>
                  <td style={{ textAlign: "center", width: 70 }}>
                    {tarrifInfo.cntrtCurrCd}
                  </td>
                  <td style={{ textAlign: "center", width: 70 }}>
                    {tarrifInfo.payCurrCd}
                  </td>
                  <td style={{ textAlign: "center", width: 70 }}>
                    {tarrifInfo.tariffItemCd}
                  </td>
                  <td style={{ textAlign: "center", width: 70 }}>
                    {tarrifInfo.cost}
                  </td>
                  <td style={{ textAlign: "center", width: 70 }}>
                    {tarrifInfo.unitCd}
                  </td>
                  <td style={{ textAlign: "center", width: 70 }}>
                    {tarrifInfo.incoCd}
                  </td>
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

export default TariffCondHForm;
