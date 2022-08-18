import { Alert, Button, Col, Input, Row, Table } from "reactstrap";
import { HiSearch } from "react-icons/hi";
import { useEffect, useState } from "react";
import {
  CodeDefinition,
  TariffCondH,
  TariffCondParam,
} from "modules/tariff/types";
import SearchDestModal from "./SearchDestModal";
import SearchLccModal from "./SearchLccModal";
import { toEditorSettings } from "typescript";
import { ContractInfoDefinition } from "api/contractCoaAxios";
import { baseCodeAsync } from "modules/contractCoa/action";
import { AsyncState } from "lib/reducerUtils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "modules";
import { getTariffCondHAsync } from "modules/tariff/actions";

const TariffCondHForm = ({
  isSave,
  cntrtId,
  trffId,
  codeDefList,
}: {
  isSave: boolean;
  cntrtId: string;
  trffId: number;
  codeDefList: Array<CodeDefinition> | null;
}) => {
  const dispatch = useDispatch();

  const {
    data: tariffCondHListData,
    loading: tariffCondHListLoading,
    error: tariffCondHListError,
  } = useSelector((state: RootState) => state.tariff.tariffCondHList);

  const [checkBoxShow, setCheckBoxShow] = useState(false);

  const LccCdLov = [
    { value: "", text: "" },
    { value: "10A1", text: "10A1" },
    { value: "10D1", text: "10D1" },
  ];

  const [trffInfoListData, setTrffInfoListData] = useState<TariffCondH>();

  const [isAdd, setIsAdd] = useState<any>(tariffCondHListData);

  const addRow = () => {
    console.log("행추가 클릭");
    setIsAdd([...isAdd, {}]);
    console.log("isAdd : ", isAdd);
    console.log("tariffCondHListData: ", tariffCondHListData);
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
    setIsAdd(tariffCondHListData);
    console.log(tariffCondHListData);
  }, [trffInfoListData]);

  useEffect(() => {
    if (trffId !== 0) {
      dispatch(
        getTariffCondHAsync.request({ cntrtId: cntrtId, trffId: trffId })
      );
    }
  }, []);
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
            overflowY: "auto",
            marginTop: 20,
          }}
        >
          <Table bordered>
            <thead style={{ textAlign: "center" }}>
              <tr className="table-secondary">
                <th rowSpan={2} style={{ width: "1%" }}></th>
                <th
                  rowSpan={2}
                  style={{ borderSpacing: "8px", verticalAlign: "middle" }}
                >
                  출발지코드
                </th>
                <th
                  rowSpan={2}
                  style={{ borderSpacing: "8px", verticalAlign: "middle" }}
                >
                  출발지명
                </th>
                <th
                  rowSpan={2}
                  style={{ borderSpacing: "8px", verticalAlign: "middle" }}
                >
                  도착지코드
                </th>
                <th
                  rowSpan={2}
                  style={{ borderSpacing: "8px", verticalAlign: "middle" }}
                >
                  도착지명
                </th>
                <th rowSpan={2} style={{ width: 90, verticalAlign: "middle" }}>
                  물류비계정
                </th>
                <th rowSpan={2} style={{ width: 90, verticalAlign: "middle" }}>
                  세부물류비
                </th>
                <th
                  rowSpan={2}
                  style={{ borderSpacing: "10px", verticalAlign: "middle" }}
                >
                  세부물류비설명
                </th>
                <th colSpan={2} style={{ width: 130, verticalAlign: "middle" }}>
                  유효기간
                </th>
                <th rowSpan={2} style={{ width: 60, verticalAlign: "middle" }}>
                  계약통화
                </th>
                <th rowSpan={2} style={{ width: 60, verticalAlign: "middle" }}>
                  지불통화
                </th>
                <th rowSpan={2} style={{ width: 70, verticalAlign: "middle" }}>
                  품종명
                </th>
                <th rowSpan={2} style={{ width: 60, verticalAlign: "middle" }}>
                  단가
                </th>
                <th rowSpan={2} style={{ width: 70, verticalAlign: "middle" }}>
                  계산단위
                </th>
                <th rowSpan={2} style={{ width: 70, verticalAlign: "middle" }}>
                  인도조건
                </th>
                <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                  조건ID
                </th>
                <th rowSpan={2} style={{ verticalAlign: "middle" }}>
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
                <tr key={index} style={{}}>
                  <th scope="row" style={{ textAlign: "center" }}>
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
                  <td style={{ textAlign: "center", borderSpacing: "8px" }}>
                    {trffInfo.depCd}
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

                  <td style={{ textAlign: "center", borderSpacing: "8px" }}>
                    {trffInfo.depNm}
                  </td>
                  <td style={{ textAlign: "center", borderSpacing: "8px" }}>
                    {trffInfo.arrCd}
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
                  <td style={{ textAlign: "center", borderSpacing: "8px" }}>
                    {trffInfo.arrNm}
                  </td>
                  <td style={{ textAlign: "right", width: 90 }}>
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
                  <td style={{ textAlign: "center", borderSpacing: "10px" }}>
                    {trffInfo.subLccCd}
                  </td>
                  <td style={{ width: 160 }}>{trffInfo.lccCdDesc}</td>
                  <td style={{ textAlign: "center", width: 70 }}>
                    <Input
                      id="trffStatDate"
                      name="trffStatDate"
                      type="date"
                      dateFormat="yyyy-MM-dd"
                      style={{
                        boxShadow: "none",
                        width: 150,
                      }}
                      defaultValue={toStringByFormatting(
                        stringToDate(trffInfo.trffStatDate)
                      )}
                      onChange={(e) => setTrffInfoListData}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center", width: 70 }}>
                    <Input
                      id="trffEndDate"
                      name="trffEndDate"
                      type="date"
                      dateFormat="yyyy-MM-dd"
                      style={{
                        boxShadow: "none",
                        width: 150,
                      }}
                      defaultValue={toStringByFormatting(
                        stringToDate(trffInfo.trffEndDate)
                      )}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center", width: 60 }}>
                    <select
                      // onChange={(e) =>
                      //   setTrffInfoListData({
                      //     ...trffInfoListData,
                      //     [e.target.id]: e.target.value,
                      //   })
                      // }
                      id="cntrtCurrCd"
                      name="cntrtCurrCd"
                      style={{ width: 70, border: "none" }}
                      value={trffInfo.cntrtCurrCd}
                    >
                      <option key={""} value={""}></option>
                      {codeDefList
                        ?.filter((data) => data.cd_tp === "CURR_CD")
                        .map((option) => (
                          <option key={option.cd_v} value={option.cd_v}>
                            {option.cd_v}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td style={{ textAlign: "center", width: 60 }}>
                    <select
                      // onChange={(e) =>
                      //   setTrffInfoListData({
                      //     ...trffInfoListData,
                      //     [e.target.id]: e.target.value,
                      //   })
                      // }
                      id="payCurrCd"
                      name="payCurrCd"
                      style={{ width: 70, border: "none" }}
                      value={trffInfo.payCurrCd}
                    >
                      <option key={""} value={""}></option>
                      {codeDefList
                        ?.filter((data) => data.cd_tp === "CURR_CD")
                        .map((option) => (
                          <option key={option.cd_v} value={option.cd_v}>
                            {option.cd_v}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td style={{ textAlign: "center", width: 70 }}>
                    <select
                      // onChange={(e) =>
                      //   setTrffInfoListData({
                      //     ...trffInfoListData,
                      //     [e.target.id]: e.target.value,
                      //   })
                      // }
                      id="trffItemCd"
                      name="trffItemCd"
                      style={{ width: 100, border: "none" }}
                      value={trffInfo.prodGcd}
                    >
                      <option key={""} value={""}></option>
                      {codeDefList
                        ?.filter((data) => data.cd_tp === "TRFF_ITEM_CD")
                        .map((option) => (
                          <option key={option.cd_v} value={option.cd_v}>
                            {option.cd_v_meaning}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td style={{ textAlign: "center", width: 60 }}>
                    <Input
                      type="text"
                      value={trffInfo.unitPrice}
                      // onChange={(e) =>
                      //   setTrffInfoListData({
                      //     ...trffInfoListData,
                      //     [e.target.id]: e.target.value,
                      //   })
                      // }
                      id="cost"
                      style={{ boxShadow: "none", width: 60, height: 30 }}
                    ></Input>
                  </td>
                  <td style={{ width: 70 }}>
                    <select
                      // onChange={(e) =>
                      //   setTrffInfoListData({
                      //     ...trffInfoListData,
                      //     [e.target.id]: e.target.value,
                      //   })
                      // }
                      id="unitCd"
                      name="unitCd"
                      style={{ width: 70, border: "none" }}
                      value={trffInfo.calUnitCd}
                    >
                      <option key={""} value={""}></option>
                      {codeDefList
                        ?.filter((data) => data.cd_tp === "UNIT_CD")
                        .map((option) => (
                          <option key={option.cd_v} value={option.cd_v}>
                            {option.cd_v}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td style={{ width: 70 }}>
                    <select
                      // onChange={(e) =>
                      //   setTrffInfoListData({
                      //     ...trffInfoListData,
                      //     [e.target.id]: e.target.value,
                      //   })
                      // }
                      id="incoCd"
                      name="incoCd"
                      style={{ width: 60, border: "none" }}
                      value={trffInfo.incoCd}
                    >
                      <option key={""} value={""}></option>
                      {codeDefList
                        ?.filter((data) => data.cd_tp === "INCO_CD")
                        .map((option) => (
                          <option key={option.cd_v} value={option.cd_v}>
                            {option.cd_v}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td style={{}}>{trffInfo.condId}</td>
                  <td style={{}}>{trffInfo.condNm}</td>
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
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
