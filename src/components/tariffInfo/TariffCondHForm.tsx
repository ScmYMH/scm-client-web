import { Button, Col, Input, Row, Table } from "reactstrap";
import { HiSearch } from "react-icons/hi";
import { useEffect, useState } from "react";
import { TariffCondH, TariffCondParam } from "modules/tariff/types";
import SearchDestModal from "./SearchDestModal";
import SearchLccModal from "./SearchLccModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "modules";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
  deleteTariffCondHAsync,
  getCodeDefAsync,
  getTariffCondHAsync,
  postTariffCondHAsync,
  resetTariffCondHAsync,
} from "modules/tariff/actions";
import TariffExcelModal from "./TariffExcelModal";
import styles from "./tariff.module.css";
import { optionCSS } from "react-select/dist/declarations/src/components/Option";

const TariffCondHForm = ({ isSave }: { isSave: boolean }) => {
  const dispatch = useDispatch();

  const { data: codeDefList } = useSelector(
    (state: RootState) => state.tariff.codeDefList
  );

  const {
    data: tariffCondHListData,
    loading: tariffCondHListLoading,
    error: tariffCondHListError,
  } = useSelector((state: RootState) => state.tariff.tariffCondHList);

  const {
    data: tariffHeaderData,
    loading: tariffHeaderLoading,
    error: tariffHeaderError,
  } = useSelector((state: RootState) => state.tariff.tariffHeader);

  const {
    data: tariffParamData,
    loading: tariffParamLoading,
    error: tariffParamError,
  } = useSelector((state: RootState) => state.tariff.tariffParam);

  const [trffCondHList, setTrffCondHList] = useState<Array<TariffCondH> | null>(
    tariffCondHListData
  );
  const LccCdLov = [
    { value: "", text: "" },
    { value: "10A1", text: "10A1" },
    { value: "10D1", text: "10D1" },
  ];

  const [isAdd, setIsAdd] = useState<any>([]);

  const [whatNode, setWhatNode] = useState("");

  const [whatLcc, setWhatLcc] = useState("");

  const [tempSeqNo, setTempSeqNo] = useState(0);

  const [count, setCount] = useState(0);

  const [tariffCheckBox, setTariffCheckBox] = useState<Array<number>>([]);

  const [tariffCondParam, setTariffCondParam] = useState<TariffCondParam>({
    validDate: "",
    lccCd: "",
    departNodeCd: "",
    departNodeNm: "",
    arrivalNodeCd: "",
    arrivalNodeNm: "",
  });

  const [tariffCond, setTariffCond] = useState({
    validDate: "",
    lccCd: "",
    departNodeCd: "",
    arrivalNodeCd: "",
  });

  const [openExcelModal, setOpenExcelModal] = useState(false);
  const [openDepartModal, setOpenDepartModal] = useState(false);
  const [openArrivalModal, setOpenArrivalModal] = useState(false);
  const [openRowDepartCdModal, setOpenRowDepartCdModal] = useState(false);
  const [openRowArrivalCdModal, setOpenRowArrivalCdModal] = useState(false);
  const [openLccModal, setOpenLccModal] = useState(false);

  const onChangeTariffCheckBox = (
    e: React.ChangeEvent<HTMLInputElement>,
    paramSeqNo: number
  ) => {
    if (tariffCheckBox.find((id) => id === paramSeqNo)) {
      // 있으면 체크가 되어있다는 뜻 => 배열에서 seqNo 빼기
      const index = tariffCheckBox.indexOf(paramSeqNo);
      tariffCheckBox.splice(index, 1);
      setTariffCheckBox(tariffCheckBox);
    } else {
      // 체크 안되어 있는 상태 => 배열에 체크한 seqNo 넣기
      const newTariffCheckBox = [...tariffCheckBox, paramSeqNo];
      setTariffCheckBox(newTariffCheckBox);
    }
  };

  const onChangeTrffCondHValue = (e: any, seqNoParam) => {
    const { id, value } = e.target;

    const findIndex = trffCondHList?.findIndex(
      (data) => data.seqNo === seqNoParam
    );

    const newTrffCondHList = trffCondHList !== null ? [...trffCondHList] : null;
    if (
      findIndex !== -1 &&
      findIndex !== undefined &&
      newTrffCondHList !== null
    ) {
      if (id == "trffStatDate" || id == "trffEndDate") {
        const newValue = value.replace(/-/g, "");
        newTrffCondHList[findIndex] = {
          ...newTrffCondHList[findIndex],
          [id]: newValue,
        };
      } else {
        newTrffCondHList[findIndex] = {
          ...newTrffCondHList[findIndex],
          [id]: value,
        };
      }
    }
    setTrffCondHList(newTrffCondHList);
  };

  const onChangeAddRowValue = (e: any, seqNoParam) => {
    const { id, value } = e.target;

    const findIndex = isAdd?.findIndex((data) => data.seqNo === seqNoParam);

    const newAdd = [...isAdd];
    if (findIndex !== -1) {
      if (id == "trffStatDate" || id == "trffEndDate") {
        const newValue = value.replace(/-/g, "");
        newAdd[findIndex] = {
          ...newAdd[findIndex],
          [id]: newValue,
        };
      } else {
        newAdd[findIndex] = {
          ...newAdd[findIndex],
          [id]: value,
        };
      }
    }
    setIsAdd(newAdd);
  };

  const onClickNode = (nodeCd: string, nodeDesc: string) => {
    if (whatNode === "departCond") {
      // 출발지 cond 선택하는 경우
      // setNodeNm({ ...nodeNm, departNodeNm: nodeDesc });
      setTariffCondParam({
        ...tariffCondParam,
        departNodeCd: nodeCd,
        departNodeNm: nodeDesc,
      });
    } else if (whatNode === "arrivalCond") {
      // 도착지 cond 선택하는 경우
      // setNodeNm({ ...nodeNm, arrivalNodeNm: nodeDesc });
      setTariffCondParam({
        ...tariffCondParam,
        arrivalNodeCd: nodeCd,
        arrivalNodeNm: nodeDesc,
      });
    } else if (whatNode === "rowDepartCode") {
      // 기존 row에 있는 출발지 코드 선택시
      const findIndex = trffCondHList?.findIndex(
        (data) => data.seqNo === tempSeqNo
      );

      const newTrffCondHList =
        trffCondHList !== null ? [...trffCondHList] : null;
      if (
        findIndex !== -1 &&
        findIndex !== undefined &&
        newTrffCondHList !== null
      ) {
        newTrffCondHList[findIndex] = {
          ...newTrffCondHList[findIndex],
          depCd: nodeCd,
          depNm: nodeDesc,
        };
      }
      setTrffCondHList(newTrffCondHList);
    } else if (whatNode === "rowArrivalCode") {
      // 기존 row에 있는 도착지 코드 선택시
      const findIndex = trffCondHList?.findIndex(
        (data) => data.seqNo === tempSeqNo
      );

      const newTrffCondHList =
        trffCondHList !== null ? [...trffCondHList] : null;
      if (
        findIndex !== -1 &&
        findIndex !== undefined &&
        newTrffCondHList !== null
      ) {
        newTrffCondHList[findIndex] = {
          ...newTrffCondHList[findIndex],
          arrCd: nodeCd,
          arrNm: nodeDesc,
        };
      }
      setTrffCondHList(newTrffCondHList);
    } else if (whatNode === "newRowDepartCode") {
      // 행추가 row에 있는 출발지 코드 선택시
      const findIndex = isAdd?.findIndex((data) => data.seqNo === tempSeqNo);

      const newAdd = [...isAdd];
      if (findIndex !== -1) {
        newAdd[findIndex] = {
          ...newAdd[findIndex],
          depCd: nodeCd,
          depNm: nodeDesc,
        };
      }
      setIsAdd(newAdd);
    } else if (whatNode === "newRowArrivalCode") {
      // 행추가 row에 있는 도착지 코드 선택시
      const findIndex = isAdd?.findIndex((data) => data.seqNo === tempSeqNo);

      const newAdd = [...isAdd];
      if (findIndex !== -1) {
        newAdd[findIndex] = {
          ...newAdd[findIndex],
          arrCd: nodeCd,
          arrNm: nodeDesc,
        };
      }
      setIsAdd(newAdd);
    }
  };

  const onClickLcc = (
    lccCdParam: string,
    subLccCdParam: string,
    lccCdDescParam: string
  ) => {
    if (whatLcc === "rowLcc") {
      const findIndex = trffCondHList?.findIndex(
        (data) => data.seqNo === tempSeqNo
      );

      const newTrffCondHList =
        trffCondHList !== null ? [...trffCondHList] : null;
      if (
        findIndex !== -1 &&
        findIndex !== undefined &&
        newTrffCondHList !== null
      ) {
        newTrffCondHList[findIndex] = {
          ...newTrffCondHList[findIndex],
          lccCd: lccCdParam,
          subLccCd: subLccCdParam,
          lccCdDesc: lccCdDescParam,
        };
      }
      setTrffCondHList(newTrffCondHList);
    } else if (whatLcc === "newRowLcc") {
      const findIndex = isAdd?.findIndex((data) => data.seqNo === tempSeqNo);

      const newAdd = [...isAdd];
      if (findIndex !== -1) {
        newAdd[findIndex] = {
          ...newAdd[findIndex],
          lccCd: lccCdParam,
          subLccCd: subLccCdParam,
          lccCdDesc: lccCdDescParam,
        };
      }
      setIsAdd(newAdd);
    }
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
    if (!isSave) {
      alert("타리프 헤더정보가 없습니다");
    } else {
      // dispatch; 2022-03-31
      const validDateTemp =
        tariffCondParam.validDate.substring(0, 4) +
        tariffCondParam.validDate.substring(5, 7) +
        tariffCondParam.validDate.substring(8);

      if (
        tariffCondParam.departNodeNm == "" &&
        tariffCondParam.arrivalNodeNm !== ""
      ) {
        setTariffCond({
          ...tariffCond,
          departNodeCd: "",
          arrivalNodeCd: tariffCondParam.arrivalNodeCd,
          validDate: validDateTemp,
          lccCd: tariffCondParam.lccCd,
        });
      } else if (
        tariffCondParam.arrivalNodeNm == "" &&
        tariffCondParam.departNodeNm !== ""
      ) {
        setTariffCond({
          ...tariffCond,
          arrivalNodeCd: "",
          departNodeCd: tariffCondParam.departNodeCd,
          validDate: validDateTemp,
          lccCd: tariffCondParam.lccCd,
        });
      } else if (
        tariffCondParam.arrivalNodeNm == "" &&
        tariffCondParam.departNodeNm == ""
      ) {
        setTariffCond({
          ...tariffCond,
          arrivalNodeCd: "",
          departNodeCd: "",
          validDate: validDateTemp,
          lccCd: tariffCondParam.lccCd,
        });
      } else {
        setTariffCond({
          ...tariffCond,
          departNodeCd: tariffCondParam.departNodeCd,
          arrivalNodeCd: tariffCondParam.arrivalNodeCd,
          validDate: validDateTemp,
          lccCd: tariffCondParam.lccCd,
        });
      }
    }
  };

  //엑셀 구현
  const excelFileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const excelFileExtension = ".xlsx";
  const excelFileName = "작성자";

  const excelDownload = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      [
        "출발지코드",
        "출발지명",
        "도착지코드",
        "도착지명",
        "물류비계정",
        "세부물류비",
        "세부물류비설명",
        "유효기간 시작",
        "유효기간 종료",
        "계약통화",
        "지불통화",
        "품종명",
        "단가",
        "계산단위",
        "인도조건",
        "조건ID",
        "조건명",
      ],
    ]);
    trffCondHList?.map((trffCondH) => {
      XLSX.utils.sheet_add_aoa(
        ws,
        [
          [
            trffCondH.depCd,
            trffCondH.depNm,
            trffCondH.arrCd,
            trffCondH.arrNm,
            trffCondH.lccCd,
            trffCondH.subLccCd,
            trffCondH.lccCdDesc,
            trffCondH.trffStatDate,
            trffCondH.trffEndDate,
            trffCondH.cntrtCurrCd,
            trffCondH.payCurrCd,
            trffCondH.prodGcd,
            trffCondH.unitPrice,
            trffCondH.calUnitCd,
            trffCondH.incoCd,
            trffCondH.condId,
            trffCondH.condNm,
          ],
        ],
        { origin: -1 }
      );
      ws["!cols"] = [{ wpx: 200 }, { wpx: 200 }];
      return false;
    });
    const wb: any = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelButter = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelFile = new Blob([excelButter], { type: excelFileType });
    FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
  };

  const onClickCopy = () => {
    if (!isSave) {
      alert("타리프 헤더정보가 없습니다");
    } else {
      tariffCheckBox.map((seqNo) =>
        trffCondHList
          ?.filter((trffCondH) => trffCondH.seqNo === seqNo)
          .map((trff) => {
            isAdd.push(trff);
            setIsAdd(isAdd);
          })
      );
      onClickSearch();
      setTariffCheckBox([]);
    }
  };

  const onClickAddRow = () => {
    if (!isSave) {
      alert("타리프 헤더정보가 없습니다");
    } else {
      setIsAdd([
        ...isAdd,
        {
          seqNo: count,
          cntrtId: tariffParamData?.cntrtId, // 계약 ID
          trffId: tariffParamData?.trffId, // 타리프 ID
          depCd: "", // 출발지코드
          depNm: "", // 출발지명
          arrCd: "", // 도착지코드
          arrNm: "", // 도착지명
          lccCd: "", // 물류비코드
          subLccCd: "", // 세부물류비코드
          lccCdDesc: "", // 물류비코드설명
          trffStatDate: tariffParamData?.cntrtStatDate, // 타리프시작일자
          trffEndDate: tariffParamData?.cntrtEndDate, // 타리프종료일자
          cntrtCurrCd: tariffParamData?.cntrtCurrCd, // 계약통화코드
          payCurrCd: tariffParamData?.cntrtCurrCd, // 지불통화코드
          prodGcd: "", // 제품그룹코드(품종명)
          incoCd: "", // 인도조건코드
          unitPrice: "", // 계약단가 (bigDecimal)
          calUnitCd: "TON", // 계산단위
          condId: "", // 조건ID
          condNm: "", // 조건명
        },
      ]);
      setCount((prevState) => prevState + 1);
    }
  };

  const onClickDelRow = () => {
    if (!isSave) {
      alert("타리프 헤더정보가 없습니다");
    } else {
      isAdd.pop();
      setIsAdd([...isAdd]);
    }
  };

  const onClickSave = () => {
    if (!isSave) {
      alert("타리프 헤더정보가 없습니다");
    } else {
      dispatch(
        postTariffCondHAsync.request({
          trffCondHDtoList: trffCondHList,
          addRowTrffCondHDtoList: isAdd,
        })
      );
      setIsAdd([]);
      setTariffCheckBox([]);
    }
  };

  const onClickDelete = () => {
    if (!isSave) {
      alert("타리프 헤더정보가 없습니다");
    } else {
      dispatch(deleteTariffCondHAsync.request(tariffCheckBox));
      setTariffCheckBox([]);
    }
  };

  const onClickExcelExport = () => {
    if (!isSave) {
      alert("타리프 헤더정보가 없습니다");
    } else {
      excelDownload();
    }
  };

  const onClickExcelImport = () => {
    if (!isSave) {
      alert("타리프 헤더정보가 없습니다");
    } else {
      setOpenExcelModal((openExcelModal) => !openExcelModal);
    }
  };

  useEffect(() => {
    dispatch(getCodeDefAsync.request(""));
    const validDateTemp = toStringByFormatting(
      stringToDate(tariffParamData?.cntrtEndDate)
    );
    setTariffCondParam({ ...tariffCondParam, validDate: validDateTemp });
    if (tariffParamData?.cntrtEndDate !== undefined) {
      setTariffCond({
        ...tariffCond,
        validDate: tariffParamData?.cntrtEndDate,
      });
    }

    if (tariffParamData?.trffId !== 0) {
      dispatch(
        getTariffCondHAsync.request({
          cntrtId: tariffParamData?.cntrtId,
          trffId: tariffParamData?.trffId,
        })
      );
    } else {
      dispatch(resetTariffCondHAsync.request());
    }
  }, []);

  useEffect(() => {
    setTrffCondHList(tariffCondHListData);
  }, [tariffCondHListData]);

  useEffect(() => {
    dispatch(resetTariffCondHAsync.request());
  }, [tariffHeaderData]);

  return (
    <>
      <div style={{ marginLeft: 20, marginRight: 20 }}>
        <Row style={{ marginTop: 30 }}>
          <Col>
            <h4 style={{ marginTop: 10, fontWeight: "bold", color: "#003366" }}>
              ◎ 타리프 정보
            </h4>
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
                  outline
                >
                  조회
                </Button>
                <Button
                  size="sm"
                  style={{ marginLeft: "10px" }}
                  onClick={onClickCopy}
                  outline
                >
                  복사
                </Button>
                <Button
                  size="sm"
                  style={{ marginLeft: "10px" }}
                  onClick={onClickAddRow}
                  outline
                >
                  행추가
                </Button>
                <Button
                  size="sm"
                  style={{ marginLeft: "10px" }}
                  onClick={onClickDelRow}
                  outline
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
                  onClick={onClickSave}
                  outline
                >
                  저장
                </Button>
                <Button
                  size="sm"
                  style={{ marginLeft: 10 }}
                  onClick={onClickDelete}
                  outline
                >
                  삭제
                </Button>
                <Button
                  size="sm"
                  style={{ marginLeft: 10 }}
                  onClick={onClickExcelExport}
                  outline
                >
                  엑셀 Export
                </Button>
                <Button
                  size="sm"
                  style={{ marginLeft: 10 }}
                  onClick={onClickExcelImport}
                  outline
                >
                  Add
                </Button>
                {openExcelModal && (
                  <TariffExcelModal
                    isOpen={openExcelModal}
                    closeModal={() =>
                      setOpenExcelModal((openExcelModal) => !openExcelModal)
                    }
                  ></TariffExcelModal>
                )}
              </div>
            </Row>
          </Col>
        </Row>
        <Table bordered className={styles.tariff_table}>
          <tr>
            <th
              colSpan={1}
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                textAlign: "center",
                backgroundColor: "#ced6e0",
                margin: 1,
              }}
            >
              유효기간
            </th>
            <td colSpan={2}>
              <div style={{ padding: 5 }}>
                <Input
                  id="validDateCond"
                  name="validDateCond"
                  type="date"
                  dateFormat="yyyy-MM-dd"
                  flxedHeight
                  style={{
                    boxShadow: "none",
                    width: 230,
                    display: "span",
                    borderRadius: 0,
                  }}
                  onChange={(e) =>
                    setTariffCondParam({
                      ...tariffCondParam,
                      validDate: e.target.value,
                    })
                  }
                  defaultValue={tariffCondParam.validDate}
                ></Input>
              </div>
            </td>
            <th
              colSpan={1}
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                textAlign: "center",
                backgroundColor: "#ced6e0",
                margin: 1,
              }}
            >
              출발지
            </th>
            <td colSpan={2}>
              <div style={{ padding: 5 }}>
                <Input
                  type="text"
                  value={tariffCondParam.departNodeNm}
                  id="departures"
                  onChange={(e) =>
                    setTariffCondParam({
                      ...tariffCondParam,
                      departNodeNm: e.target.value,
                    })
                  }
                  style={{
                    boxShadow: "none",
                    width: 230,
                    display: "inline-block",
                    borderRadius: 0,
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
                    departNodeNm={tariffCondParam.departNodeNm}
                    arrivalNodeNm={tariffCondParam.arrivalNodeNm}
                    whatNode={whatNode}
                  />
                )}
              </div>
            </td>
          </tr>
          <tr>
            <th
              colSpan={1}
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                textAlign: "center",
                backgroundColor: "#ced6e0",
                margin: 1,
              }}
            >
              물류비계정
            </th>
            <td colSpan={2}>
              <div style={{ padding: 5 }}>
                <Input
                  onChange={(e) =>
                    setTariffCondParam({
                      ...tariffCondParam,
                      lccCd: e.target.value,
                    })
                  }
                  id="LccCd"
                  name="LccCd"
                  type="select"
                  style={{ width: 230, boxShadow: "none", borderRadius: 0 }}
                >
                  {LccCdLov.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </Input>
              </div>
            </td>
            <th
              colSpan={1}
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                textAlign: "center",
                backgroundColor: "#ced6e0",
                margin: 1,
              }}
            >
              도착지
            </th>
            <td colSpan={2}>
              <div style={{ padding: 5 }}>
                <Input
                  type="text"
                  value={tariffCondParam.arrivalNodeNm}
                  id="arrivals"
                  onChange={(e) =>
                    setTariffCondParam({
                      ...tariffCondParam,
                      arrivalNodeNm: e.target.value,
                    })
                  }
                  style={{
                    boxShadow: "none",
                    width: 230,
                    display: "inline-block",

                    borderRadius: 0,
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
                    departNodeNm={tariffCondParam.departNodeNm}
                    arrivalNodeNm={tariffCondParam.arrivalNodeNm}
                    whatNode={whatNode}
                  />
                )}
              </div>
            </td>
          </tr>
        </Table>
        <div
          style={{
            maxHeight: "480px",
            overflowY: "auto",
            marginTop: 20,
          }}
        >
          <Table
            bordered
            className={styles.tariff_table}
            style={{ whiteSpace: "nowrap" }}
          >
            <thead style={{ textAlign: "center", verticalAlign: "middle" }}>
              <tr className="table-secondary">
                <th rowSpan={2} style={{ width: "300" }}></th>
                <th rowSpan={2} style={{}}>
                  출발지코드
                </th>
                <th rowSpan={2} style={{}}>
                  출발지명
                </th>
                <th rowSpan={2} style={{ width: "300" }}>
                  도착지코드
                </th>
                <th rowSpan={2} style={{}}>
                  도착지명
                </th>
                <th rowSpan={2} style={{ width: 90 }}>
                  물류비계정
                </th>
                <th rowSpan={2} style={{ width: 90 }}>
                  세부물류비
                </th>
                <th rowSpan={2} style={{ borderSpacing: "10px" }}>
                  세부물류비설명
                </th>
                <th colSpan={2} style={{ width: 130 }}>
                  유효기간
                </th>
                <th rowSpan={2} style={{ width: 60 }}>
                  계약통화
                </th>
                <th rowSpan={2} style={{ width: 60 }}>
                  지불통화
                </th>
                <th rowSpan={2} style={{ width: 70 }}>
                  품종명
                </th>
                <th rowSpan={2} style={{ width: 80 }}>
                  단가
                </th>
                <th rowSpan={2} style={{ width: 70 }}>
                  계산단위
                </th>
                <th rowSpan={2} style={{ width: 70 }}>
                  인도조건
                </th>
                <th rowSpan={2} style={{}}>
                  조건ID
                </th>
                <th rowSpan={2} style={{}}>
                  조건명
                </th>
              </tr>
              <tr className="table-secondary">
                <th>시작</th>
                <th>종료</th>
              </tr>
            </thead>
            <tbody>
              {trffCondHList
                ?.filter((trffInfo) => {
                  if (
                    trffInfo.lccCd.includes(tariffCond.lccCd) &&
                    trffInfo.depCd.includes(tariffCond.departNodeCd) &&
                    trffInfo.arrCd.includes(tariffCond.arrivalNodeCd) &&
                    trffInfo.trffStatDate <= tariffCond.validDate &&
                    trffInfo.trffEndDate >= tariffCond.validDate
                  )
                    return true;
                })
                .map((trffInfo, index) => (
                  <tr key={trffInfo.seqNo} style={{ whiteSpace: "nowrap" }}>
                    <th scope="row" style={{ textAlign: "center" }}>
                      <Input
                        type="checkbox"
                        onChange={(e) =>
                          onChangeTariffCheckBox(e, trffInfo.seqNo)
                        }
                        checked={
                          tariffCheckBox.find(
                            (seqNo) => seqNo == trffInfo.seqNo
                          )
                            ? true
                            : false
                        }
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
                          setTempSeqNo(trffInfo.seqNo);
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
                          departNodeNm={trffInfo.depNm}
                          arrivalNodeNm={trffInfo.arrNm}
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
                          setTempSeqNo(trffInfo.seqNo);
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
                          departNodeNm={trffInfo.depCd}
                          arrivalNodeNm={trffInfo.arrNm}
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
                          setTempSeqNo(trffInfo.seqNo);
                          setWhatLcc("rowLcc");
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
                        onChange={(e) =>
                          onChangeTrffCondHValue(e, trffInfo.seqNo)
                        }
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
                        onChange={(e) =>
                          onChangeTrffCondHValue(e, trffInfo.seqNo)
                        }
                      ></Input>
                    </td>
                    <td style={{ textAlign: "center", width: 60 }}>
                      <select
                        id="cntrtCurrCd"
                        name="cntrtCurrCd"
                        value={trffInfo.cntrtCurrCd}
                        style={{ width: 70, border: "none" }}
                        onChange={(e) =>
                          onChangeTrffCondHValue(e, trffInfo.seqNo)
                        }
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
                        id="payCurrCd"
                        name="payCurrCd"
                        value={trffInfo.payCurrCd}
                        style={{ width: 70, border: "none" }}
                        onChange={(e) =>
                          onChangeTrffCondHValue(e, trffInfo.seqNo)
                        }
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
                        id="prodGcd"
                        name="prodGcd"
                        value={trffInfo.prodGcd}
                        style={{ width: 100, border: "none" }}
                        onChange={(e) =>
                          onChangeTrffCondHValue(e, trffInfo.seqNo)
                        }
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
                    <td style={{ textAlign: "center", width: 80 }}>
                      <Input
                        id="unitPrice"
                        name="unitPrice"
                        value={trffInfo.unitPrice}
                        type="text"
                        style={{ boxShadow: "none", width: 80, height: 30 }}
                        onChange={(e) =>
                          onChangeTrffCondHValue(e, trffInfo.seqNo)
                        }
                      ></Input>
                    </td>
                    <td style={{ width: 70 }}>
                      <select
                        id="calUnitCd"
                        name="calUnitCd"
                        value={trffInfo.calUnitCd}
                        style={{ width: 70, border: "none" }}
                        onChange={(e) =>
                          onChangeTrffCondHValue(e, trffInfo.seqNo)
                        }
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
                        id="incoCd"
                        name="incoCd"
                        value={trffInfo.incoCd}
                        style={{
                          width: 450,
                          border: "none",
                        }}
                        onChange={(e) =>
                          onChangeTrffCondHValue(e, trffInfo.seqNo)
                        }
                      >
                        <option key={""} value={""}></option>
                        {codeDefList
                          ?.filter((data) => data.cd_tp === "INCO_CD")
                          .map((option) => (
                            <option key={option.cd_v} value={option.cd_v}>
                              {option.cd_v + "-" + option.cd_v_meaning}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td style={{}}>{trffInfo.condId}</td>
                    <td style={{}}>{trffInfo.condNm}</td>
                  </tr>
                ))}
              {isAdd?.map((trffInfo, index) => (
                <tr key={index} style={{}}>
                  <th scope="row" style={{ textAlign: "center" }}></th>
                  <td style={{ textAlign: "center", borderSpacing: "8px" }}>
                    {trffInfo.depCd}
                    <HiSearch
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setOpenRowDepartCdModal(
                          (openRowDepartCdModal) => !openRowDepartCdModal
                        );
                        setWhatNode("newRowDepartCode");
                        setTempSeqNo(trffInfo.seqNo);
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
                        departNodeNm={trffInfo.depNm}
                        arrivalNodeNm={trffInfo.arrNm}
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
                        setWhatNode("newRowArrivalCode");
                        setTempSeqNo(trffInfo.seqNo);
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
                        departNodeNm={trffInfo.depCd}
                        arrivalNodeNm={trffInfo.arrNm}
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
                        setTempSeqNo(trffInfo.seqNo);
                        setWhatLcc("newRowLcc");
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
                      onChange={(e) => onChangeAddRowValue(e, trffInfo.seqNo)}
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
                      onChange={(e) => onChangeAddRowValue(e, trffInfo.seqNo)}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center", width: 60 }}>
                    <select
                      id="cntrtCurrCd"
                      name="cntrtCurrCd"
                      value={trffInfo.cntrtCurrCd}
                      style={{ width: 70, border: "none" }}
                      onChange={(e) => onChangeAddRowValue(e, trffInfo.seqNo)}
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
                      id="payCurrCd"
                      name="payCurrCd"
                      value={trffInfo.payCurrCd}
                      style={{ width: 70, border: "none" }}
                      onChange={(e) => onChangeAddRowValue(e, trffInfo.seqNo)}
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
                      id="prodGcd"
                      name="prodGcd"
                      value={trffInfo.prodGcd}
                      style={{ width: 100, border: "none" }}
                      onChange={(e) => onChangeAddRowValue(e, trffInfo.seqNo)}
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
                  <td style={{ textAlign: "center", width: 80 }}>
                    <Input
                      id="unitPrice"
                      name="unitPrice"
                      value={trffInfo.unitPrice}
                      type="text"
                      style={{ boxShadow: "none", width: 80, height: 30 }}
                      onChange={(e) => onChangeAddRowValue(e, trffInfo.seqNo)}
                    ></Input>
                  </td>
                  <td style={{ width: 70 }}>
                    <select
                      id="calUnitCd"
                      name="calUnitCd"
                      value={trffInfo.calUnitCd}
                      style={{ width: 70, border: "none" }}
                      onChange={(e) => onChangeAddRowValue(e, trffInfo.seqNo)}
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
                  <td style={{ width: 100 }}>
                    <select
                      id="incoCd"
                      name="incoCd"
                      value={trffInfo.incoCd}
                      style={{ width: 450, border: "none" }}
                      onChange={(e) => onChangeAddRowValue(e, trffInfo.seqNo)}
                    >
                      <option key={""} value={""}></option>
                      {codeDefList
                        ?.filter((data) => data.cd_tp === "INCO_CD")
                        .map((option) => (
                          <option key={option.cd_v} value={option.cd_v}>
                            {option.cd_v + "-" + option.cd_v_meaning}
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
