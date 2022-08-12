import { Alert, Button, Col, Input, Row, Table } from "reactstrap";
import { HiSearch } from "react-icons/hi";
import { useEffect, useState } from "react";
import { TariffCondParam } from "modules/tariff/types";
import SearchDestModal from "./SearchDestModal";
import SearchLccModal from "./SearchLccModal";
import { toEditorSettings } from "typescript";

const TariffCondHForm = ({
  isSave,
  cntrtId,
}: {
  isSave: boolean;
  cntrtId: string;
}) => {
  const LccCdLov = [
    { value: "", text: "" },
    { value: "10A1", text: "10A1" },
    { value: "10D1", text: "10D1" },
  ];

  const currCdLov = [
    // 통화코드
    { value: "USD", text: "USD" }, // US Dollar
    { value: "KRW", text: "KRW" }, // Won
    { value: "EUR", text: "EUR" }, // Euro
    { value: "IDR", text: "IDR" }, // Rupiah
    { value: "JPY", text: "JPY" }, // Yen
    { value: "CAD", text: "CAD" }, // Canadian Dollar
    { value: "CNY", text: "CNY" }, // Renminbi Yuan
    { value: "HKD", text: "HKD" }, // H.K.Dollar
    { value: "INR", text: "INR" }, // Rupee
    { value: "AUD", text: "AUD" }, // Austr. Dollar
    { value: "TWD", text: "TWD" }, // Dollar
    { value: "BRL", text: "BRL" }, // Real
    { value: "ZAR", text: "ZAR" }, // Rand
  ];

  const trffItemCdLov = [
    // 품좀명
    { value: "A", text: "A-열연/냉연" },
    { value: "B", text: "B-선재" },
    { value: "C", text: "C-후판" },
    { value: "Y", text: "Y-일반" },
    { value: "Z", text: "Z-기타" },
  ];

  const unitCdLov = [
    // 단위코드 (계산단위)
    { value: "TON", text: "TON" }, // 톤수
    { value: "AMT", text: "AMT" }, // 금액
  ];

  const incoCdLov = [
    // 인도조건
    { value: "1A1", text: "1A1" }, // 공로 (공장상차도)
    { value: "1C1", text: "1C1" }, // 공로 (착지차상도)
    { value: "3A1", text: "3A1" }, // 해송 (제철소 부두선상도)
    { value: "3C1", text: "3C1" }, // 해송 (착지 부두선상도)
    { value: "6A1", text: "6A1" }, // C & F BT(COST + FREIGHT BERTH TERM)
    { value: "6C1", text: "6C1" }, // CIF BT(Cost, Insurance and Freight BERTH TERM)
    { value: "7A1", text: "7A1" }, // FOB(Free On Board)
    { value: "7B1", text: "7B1" }, // FOB ST(Free On Board STOWED)
  ];

  const [trffInfoListData, setTrffInfoListData] = useState([
    {
      seqNo: "1",
      trffId: "271313",
      cntrtId: "20220501000003",
      departCd: "KORKANT01",
      departDesc: "광양제철소",
      arrivalCd: "IDNBLWP01", // 도착지코드
      arrivalDesc: "BELAWAN", // 도착지명
      lccCd: "10D1", // 물류비계정
      subLccCd: "105", // 세부물류비
      lccCdNm: "국제해송비 (COA)(제품)", // 세부물류비설명
      trffStatDate: "20220701",
      trffEndDate: "20220731",
      cntrtCurrCd: "USD", // 계약통화
      payCurrCd: "CAD", // 지불통화
      tariffItemCd: "Y-일반", // 품종명
      cost: "58.2", // 단가
      unitCd: "TON", // 계산단위
      incoCd: "6A1", // 인도조건
      condId: "", // 조건ID
      condNm: "", // 조건명
    },
  ]);

  const [isAdd, setIsAdd] = useState<any[]>(trffInfoListData);

  const addRow = () => {
    console.log("행추가 클릭");
    setIsAdd([...isAdd, {}]);
    console.log("isAdd : ", isAdd);
    console.log("trffInfoListData: ", trffInfoListData);
  };

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

  const leftPad = (value) => {
    if (value >= 10) {
      return value;
    }
    return `0${value}`;
  };

  const toStringByFormatting = (source, delimiter = "-") => {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());

    return [year, month, day].join(delimiter);
  };

  const stringToDate = (date_str) => {
    const yyyyMMdd = String(date_str);
    const sYear = yyyyMMdd.substring(0, 4);
    const sMonth = yyyyMMdd.substring(4, 6);
    const sDate = yyyyMMdd.substring(6, 8);

    return new Date(Number(sYear), Number(sMonth) - 1, Number(sDate));
  };

  const onClickSearch = () => {
    console.log("조회 버튼 클릭");
    if (!isSave) {
      alert("타리프 헤더정보가 없습니다");
    } else {
      // dispatch;
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
    } else {
      addRow();
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
    console.log("trffInfoListData : ", trffInfoListData);
  }, [trffInfoListData]);

  return (
    <>
      <div style={{ marginLeft: 20, marginRight: 20 }}>
        <Row style={{ marginTop: 30 }}>
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
                dateFormat="yyyy-MM-dd"
                style={{
                  boxShadow: "none",
                  width: 230,
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
                {LccCdLov.map((option) => (
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
            maxHeight: "420px",
            maxWidth: "1450px",
            overflowY: "auto",
            marginTop: 20,
          }}
        >
          <Table bordered>
            <thead style={{ textAlign: "center", width: "2000px" }}>
              <tr className="table-secondary" style={{ width: "2000px" }}>
                <th rowSpan={2} style={{ width: "50px" }}></th>
                <th rowSpan={2} style={{ width: "100px" }}>
                  출발지코드
                </th>
                <th rowSpan={2} style={{ width: "100px" }}>
                  출발지명
                </th>
                <th rowSpan={2} style={{ width: 100 }}>
                  도착지코드
                </th>
                <th rowSpan={2} style={{ width: 90 }}>
                  도착지명
                </th>
                <th rowSpan={2} style={{ width: 80 }}>
                  물류비계정
                </th>
                <th rowSpan={2} style={{ width: 80 }}>
                  세부물류비
                </th>
                <th rowSpan={2} style={{ width: 160 }}>
                  세부물류비설명
                </th>
                <th colSpan={2} style={{ width: 130 }}>
                  유효기간
                </th>
                <th rowSpan={2} style={{ width: 70 }}>
                  계약통화
                </th>
                <th rowSpan={2} style={{ width: 70 }}>
                  지불통화
                </th>
                <th rowSpan={2} style={{ width: 70 }}>
                  품종명
                </th>
                <th rowSpan={2} style={{ width: 60 }}>
                  단가
                </th>
                <th rowSpan={2} style={{ width: 70 }}>
                  계산단위
                </th>
                <th rowSpan={2} style={{ width: 70 }}>
                  인도조건
                </th>
                <th rowSpan={2} style={{ width: 100 }}>
                  조건ID
                </th>
                <th rowSpan={2} style={{ width: 100 }}>
                  조건명
                </th>
              </tr>
              <tr className="table-secondary">
                <th>시작</th>
                <th>종료</th>
              </tr>
            </thead>
            <tbody>
              {isAdd?.map((trffInfo, index) => (
                <tr key={index} style={{ width: "2000px" }}>
                  <th
                    scope="row"
                    style={{ textAlign: "center", width: "50px" }}
                  >
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
                  <td style={{ textAlign: "center", width: "100px" }}>
                    {trffInfo.departCd}
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
                        nodeNm={trffInfo.departDesc}
                        whatNode={whatNode}
                      />
                    )}
                  </td>

                  <td style={{ textAlign: "center", width: "100px" }}>
                    {trffInfo.departDesc}
                  </td>
                  <td style={{ textAlign: "center", width: 100 }}>
                    {trffInfo.arrivalCd}
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
                        nodeNm={trffInfo.arrivalDesc}
                        whatNode={whatNode}
                      />
                    )}
                  </td>
                  <td style={{ textAlign: "center", width: 90 }}>
                    {trffInfo.arrivalDesc}
                  </td>
                  <td style={{ textAlign: "right", width: 80 }}>
                    {trffInfo.lccCd}
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
                    {trffInfo.subLccCd}
                  </td>
                  <td style={{ width: 160 }}>{trffInfo.lccCdNm}</td>
                  <td style={{ textAlign: "center", width: 70 }}>
                    <Input
                      id="trffStatDate"
                      name="trffStatDate"
                      type="date"
                      dateFormat="yyyy-MM-dd"
                      style={{
                        boxShadow: "none",
                        width: 230,
                      }}
                      defaultValue={toStringByFormatting(
                        stringToDate(trffInfo.trffStatDate)
                      )}
                      onChange={(e) => setTrffInfoListData}
                    ></Input>
                    {trffInfo.trffStatDate}
                  </td>
                  <td style={{ textAlign: "center", width: 70 }}>
                    <Input
                      id="trffEndDate"
                      name="trffEndDate"
                      type="date"
                      dateFormat="yyyy-MM-dd"
                      style={{
                        boxShadow: "none",
                        width: 230,
                      }}
                    ></Input>
                    {trffInfo.trffEndDate}
                  </td>
                  <td style={{ textAlign: "center", width: 70 }}>
                    <select
                      onChange={(e) =>
                        setTrffInfoListData({
                          ...trffInfoListData,
                          [e.target.id]: e.target.value,
                        })
                      }
                      id="cntrtCurrCd"
                      name="cntrtCurrCd"
                      style={{ width: 70, border: "none" }}
                      value={trffInfo.cntrtCurrCd}
                    >
                      {currCdLov.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ textAlign: "center", width: 70 }}>
                    <select
                      onChange={(e) =>
                        setTrffInfoListData({
                          ...trffInfoListData,
                          [e.target.id]: e.target.value,
                        })
                      }
                      id="payCurrCd"
                      name="payCurrCd"
                      style={{ width: 70, border: "none" }}
                      value={trffInfo.payCurrCd}
                    >
                      {currCdLov.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ textAlign: "center", width: 70 }}>
                    <select
                      onChange={(e) =>
                        setTrffInfoListData({
                          ...trffInfoListData,
                          [e.target.id]: e.target.value,
                        })
                      }
                      id="trffItemCd"
                      name="trffItemCd"
                      style={{ width: 100, border: "none" }}
                      value={trffInfo.tariffItemCd}
                    >
                      {trffItemCdLov.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ textAlign: "center", width: 60 }}>
                    <Input
                      type="text"
                      value={trffInfo.cost}
                      onChange={(e) =>
                        setTrffInfoListData({
                          ...trffInfoListData,
                          [e.target.id]: e.target.value,
                        })
                      }
                      id="cost"
                      style={{ boxShadow: "none", width: 60, height: 30 }}
                    ></Input>
                  </td>
                  <td style={{ width: 70 }}>
                    <select
                      onChange={(e) =>
                        setTrffInfoListData({
                          ...trffInfoListData,
                          [e.target.id]: e.target.value,
                        })
                      }
                      id="unitCd"
                      name="unitCd"
                      style={{ width: 70, border: "none" }}
                      value={trffInfo.unitCd}
                    >
                      {unitCdLov.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ width: 70 }}>
                    <select
                      onChange={(e) =>
                        setTrffInfoListData({
                          ...trffInfoListData,
                          [e.target.id]: e.target.value,
                        })
                      }
                      id="incoCd"
                      name="incoCd"
                      style={{ width: 60, border: "none" }}
                      value={trffInfo.incoCd}
                    >
                      {incoCdLov.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ width: 100 }}>{trffInfo.condId}</td>
                  <td style={{ width: 100 }}>{trffInfo.condNm}</td>
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
