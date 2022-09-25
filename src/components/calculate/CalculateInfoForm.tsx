import axios from "axios";
import { insertCalculateRequestAsync, updateFrtStatusRequestAsync } from "modules/calculate/actions";
import { check } from "prettier";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { Button, Container, Form, Input, Table } from "reactstrap";
import AccountConnModal from "./AccountConnModal";

import styles from "./calculate.module.css";
import CalculateDetailModal from "./CalculateDetailModal";
import CalculateLspModal from "./CalculateLspModal";
import CalculateVslCdModal from "./CalculateVslCdModal";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export interface CalculateInfoFormProps {
  onSubmitCalculateInfo: (calSelectParams: any) => void;
  onSubmitCalculateDetailInfo: (transOrderNo: any) => void;
  calculateInfoData: any;
  calculateDetailCodeData: any;
  baseCodeData: any;
  vslCodeData: any;
}

const CalculateInfoForm = ({
  calculateDetailCodeData,
  onSubmitCalculateDetailInfo,
  onSubmitCalculateInfo,
  calculateInfoData,
  baseCodeData,
  vslCodeData,
}: CalculateInfoFormProps) => {
  const [detailOpenModal, setDetailOpenModal] = useState(false);
  const [lspOpenModal, setLspOpenModal] = useState(false);
  const [vslOpenModal, setVslOpenModal] = useState(false);
  const [actConOpenModal, setActConOpenModal] = useState(false);
  
  const [chkCalcFlag, setChkCalcFlag] = useState(false);
  const [chkDstConfYnFlag, setChkDstConfYnFlag] = useState("");
  const [chkClearAmtFlag, setChkClearAmtFlag] = useState(0);
  const [chkAcctgYnFlag, setChkAcctgYnFlag] = useState("N");

  const [chkAccountFlag, setChkAccountFlag] = useState(false);

  const [transOrderNoParam, setTransOrderNoParam] = useState("");

  const [dtParams, setDtParams] = useState({
    transOrderNo : "",
    blDate : "",
  });
  const [chkCancleFlag, setChkCancleFlag] = useState(false);

  const [checkedList, setCheckedList] = useState<any>([]);
  
  const [calSelectParams, setCalSelectParams] = useState({
    startDate: "",
    endDate: "",
    lspId: "",
    vslCd: "",
    dstConfYn: "",
    transOrderNo: "",
    cdVmeaning: "",
  });

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [detailParamas, setDetailParamas] = useState({
    data: {
      cntrtId: "",
      cntrtNm: "",
      insDate: "",
      cdvMeaning: "",
      ins_person_id: "",
      user_nm: "",
      vsl_load_posbl_wt: "",
      inv_inner_no: "",
    },
  });

  const [reqLspParam, setReqLspParam] = useState("");
  const onClickLspParmas = (cd_v: string, cd_v_meaning: string) => {
    setReqLspParam(cd_v_meaning);
    setCalSelectParams({ ...calSelectParams, lspId: cd_v });
    setLspOpenModal(false);
  };

  const [reqVslCdParam, setReqVslCdParam] = useState("");

  const onClickVslCdParmas = (vsl_cd: string, vsl_nm: string) => {
    setReqVslCdParam(vsl_nm);
    setCalSelectParams({ ...calSelectParams, vslCd: vsl_cd });
    setVslOpenModal(false);
  };

  const closeNoYnOptions = [
    { value: "", text: "ALL" },
    { value: "N", text: "No" },
    { value: "Y", text: "Yes" },
  ];

  const onChangeReqLspParam = (e: ChangeEvent<HTMLInputElement>) => {
    setReqLspParam(e.target.value);
    setCalSelectParams({ ...calSelectParams, [e.target.id]: e.target.value });
  };

  const onChangeVslCdParam = (e: ChangeEvent<HTMLInputElement>) => {
    setReqVslCdParam(e.target.value);
    setCalSelectParams({ ...calSelectParams, [e.target.id]: e.target.value });
  };

  const onChangeCalInfo = (e: ChangeEvent<HTMLInputElement>) => {
    // setReqVslCdParam(e.target.value);
    setCalSelectParams({ ...calSelectParams, [e.target.id]: e.target.value });
  };

  const checkAccountConn = () => {
    if(chkDstConfYnFlag == "N"){
      alert("담당자 확정을 먼저 해주세요.");
    } else if ((chkClearAmtFlag == null) || (chkClearAmtFlag == 0)){
      alert("운임 정산을 해주세요.");
    }else if (chkAcctgYnFlag=='Y') {
      alert("이미 전표 발행이 완료 되었습니다.");
    }else{
      if (isChecked === true) {
        const dialog = confirm("상신하시겠습니까?");

        if (dialog) {
          console.log("Data Saved");
          setActConOpenModal((actConOpenModal) => !actConOpenModal);
        } else {
          console.log("Data Not Saved");
        }
      } else {
        alert("상신할 아이템을 선택해주세요.");
      }
    }
  };


  const onSubmitInsertCalculateInfo= (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((chkClearAmtFlag != null) && (chkClearAmtFlag != 0)) {
      alert("이미 운임 정산이 완료 되었습니다.");
    } else {
      dispatch(insertCalculateRequestAsync.request(params));
      alert("운임 정산 완료.");
      setChkCalcFlag(!chkCalcFlag);
    }
  };


  const onSubmitCalculateInfoList = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitCalculateInfo(calSelectParams);
  };

  const dateToString = (date) => {
    return (
      date.getFullYear() +
      "/" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      date.getDate().toString().padStart(2, "0")
    );
  };

  function to_date(date_str) {
    const yyyyMMdd = String(date_str);
    const sYear = yyyyMMdd.substring(0, 4);
    const sMonth = yyyyMMdd.substring(4, 6);
    const sDate = yyyyMMdd.substring(6, 8);

    return new Date(Number(sYear), Number(sMonth) - 1, Number(sDate));
  }

  const checkOnlyOne = (checkThis) => {
    const checkboxes = document.getElementsByName("calInfoId") as any | null;
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      }
    }
  };

  const dispatch = useDispatch();

  const [params, setParams] = useState<any>({
    transOrderNo: "",
    frtStatus: "10",
    dstConfYn: "N",
    blDate : "",
    facCd: "",
    invInnerNo:""
  });

  console.log("paramasparamasparamas", params);

  const onSubmitUpdFrtStatus = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ((chkClearAmtFlag != null) && (chkClearAmtFlag != 0)) {
      alert("이미 담당자 확정이 완료 되었습니다.");
    }
    else {
      dispatch(updateFrtStatusRequestAsync.request(params));
      alert("담당자 확정이 취소되었습니다.");
      setChkCancleFlag(!chkCancleFlag);
    }
  };

  const onCheckedElement = (checked, item) => {
    setIsChecked(checked);
    if (checked) {
      setCheckedList([...checkedList, item]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((el) => el !== item));
    }
  };
  
  //엑셀 구현
  const excelFileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const excelFileExtension = ".xlsx";
  const excelFileName = "국제해송비정산";

  const excelDownload = (excelData: any) => {
    const ws = XLSX.utils.aoa_to_sheet([
      [
        "권역",
        "물류실행사ID",
        "물류실행사명",
        "선적일자",
        "지시번호",
        "선박코드",
        "선박명",
        "확정여부",
        "회계연결여부",
        "통화",
        "정산중량",
        "정산금액",
        "회계연결금액",
        "AP전표번호",
      ],
    ]);
    excelData.map((exportData: any) => {
      XLSX.utils.sheet_add_aoa(
        ws,
        [
          [
            exportData.nation_nm,
            exportData.lsp_id,
            exportData.cd_v_meaning,
            exportData.bl_date,
            exportData.trans_order_no,
            exportData.vsl_cd,
            exportData.vsl_nm,
            exportData.dst_conf_yn,
            exportData.acctg_yn ,
            exportData.clear_curr,
            exportData.clear_qty,
            exportData.clear_amt,
            exportData.acctg_amt,
            exportData.close_no,
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
  
  useEffect(() => {
    onSubmitCalculateInfo(calSelectParams);
  }, [chkCalcFlag, chkCancleFlag, chkAccountFlag]);

  function facCdChange(fac_cd){
    if(fac_cd=="포항"){
      return "P"
    }else if(fac_cd=="광양"){
      return "K"
    }
  }
  console.log(calculateInfoData.data)
  return (
    <div
      style={{
        marginTop: 30,
        marginRight: 30,
        marginBottom: 15,
        marginLeft: 30,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Form
          style={{ margin: 3 }}
          onSubmit={onSubmitCalculateInfoList}
          className="CalculateInfoForm"
        >
          <Button outline style={{ margin: 3 }} className="btn" size="sm">
            조회
          </Button>
        </Form>
        <Form
          style={{ margin: 3 }}
          onSubmit={onSubmitInsertCalculateInfo}
          className="InsertCalculateInfoForm"
        >
          <Button outline style={{ margin: 3 }} className="btn" size="sm">
            운임 정산
          </Button>
        </Form>
        <Button
          outline
          style={{ margin: 3 }}
          className="btn"
          size="sm"
          onClick={checkAccountConn}
        >
          회계연결
        </Button>
        {actConOpenModal && (
          <AccountConnModal
            chkAccountFlag={chkAccountFlag}
            setChkAccountFlag= {setChkAccountFlag}
            isOpen={actConOpenModal}
            closeModal={() =>
              setActConOpenModal((actConOpenModal) => !actConOpenModal)
            }
            detailParamas={detailParamas}
          ></AccountConnModal>
        )}
        <Form
          style={{ margin: 3 }}
          onSubmit={onSubmitUpdFrtStatus}
          className="UpdFrtStatus"
        >
          <Button outline style={{ margin: 3 }} className="btn" size="sm">
            확정 취소
          </Button>
        </Form>
      </div>
      <div>
        <div style={{ margin: 4 }}>◎ 조회 조건</div>
        <Table bordered className={styles.calculate_select_table}>
          <tbody>
            <tr>
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "#ced6e0",
                  margin: 1,
                }}
              >
                조회기간
              </th>
              <td>
                <div style={{ display: "inline-block" }}>
                  <div>
                    <Input
                      style={{
                        marginRight: "30px",
                        boxShadow: "none",
                        borderRadius: 0,
                        display: "span",
                      }}
                      fixedHeight
                      dateFormat="yyyy-MM-dd"
                      selectsStart
                      type="date"
                      id="startDate"
                      name="startDate"
                      onChange={(e) =>
                        setCalSelectParams({
                          ...calSelectParams,
                          [e.target.id]: e.target.value.replaceAll("-", ""),
                        })
                      }
                    />
                  </div>
                </div>
                <div style={{ display: "inline-block" }}>
                  <div>
                    <Input
                      type="date"
                      style={{
                        marginRight: "30px",
                        boxShadow: "none",
                        borderRadius: 0,
                        display: "span",
                      }}
                      fixedHeight
                      dateFormat="yyyy-MM-dd"
                      id="endDate"
                      name="endDate"
                      minDate={new Date()}
                      onChange={(e) =>
                        setCalSelectParams({
                          ...calSelectParams,
                          [e.target.id]: e.target.value.replaceAll("-", ""),
                        })
                      }
                    />
                  </div>
                </div>
              </td>
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "#ced6e0",
                  margin: 1,
                }}
              >
                물류실행사
              </th>
              <td>
                <Input
                  id="lspId"
                  style={{
                    boxShadow: "none",
                    width: "85%",
                    display: "inline-block",
                    borderRadius: 0,
                  }}
                  onChange={onChangeReqLspParam}
                  value={ reqLspParam }
                ></Input>
                <HiSearch
                  style={{ marginLeft: 10, cursor: "pointer" }}
                  onClick={() => {
                    setLspOpenModal((lspOpenModal) => !lspOpenModal);
                  }}
                ></HiSearch>
                {lspOpenModal && (
                  <CalculateLspModal
                    onClickLspParmas={onClickLspParmas}
                    isOpen={lspOpenModal}
                    closeModal={() =>
                      setLspOpenModal((lspOpenModal) => !lspOpenModal)
                    }
                    baseCodeData={baseCodeData}
                  ></CalculateLspModal>
                )}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "#ced6e0",
                  margin: 1,
                }}
              >
                정산상태
              </th>
              <td>
                <div>
                  <Input
                    id="dstConfYn"
                    style={{
                      marginRight: "30px",
                      boxShadow: "none",
                      borderRadius: 0,
                    }}
                    type="select"
                    onChange={onChangeCalInfo}
                  >
                    {closeNoYnOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </Input>
                </div>
              </td>
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "#ced6e0",
                  margin: 1,
                }}
              >
                선박코드
              </th>
              <td>
                <Input
                  id="vslCd"
                  style={{
                    boxShadow: "none",
                    width: "85%",
                    display: "inline-block",
                    borderRadius: 0,
                  }}
                  onChange={onChangeVslCdParam}
                  ariaReadOnly={false}
                  value={reqVslCdParam}
                />
                <HiSearch
                  style={{ marginLeft: 10, cursor: "pointer" }}
                  onClick={() => {
                    setVslOpenModal((vslOpenModal) => !vslOpenModal);
                  }}
                ></HiSearch>
                {vslOpenModal && (
                  <CalculateVslCdModal
                    onClickVslCdParmas={onClickVslCdParmas}
                    isOpen={vslOpenModal}
                    closeModal={() =>
                      setVslOpenModal((vslOpenModal) => !vslOpenModal)
                    }
                    vslCodeData={vslCodeData}
                  ></CalculateVslCdModal>
                )}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "#ced6e0",
                  margin: 1,
                }}
              >
                대권역
              </th>
              <td>
                <Input
                  id="cdVmeaning"
                  style={{
                    marginRight: "30px",
                    boxShadow: "none",
                    borderRadius: 0,
                  }}
                  type="select"
                  onChange={onChangeCalInfo}
                >
                  <option key="" value=""></option>
                  {baseCodeData.data
                    ?.filter((data) => data.cd_tp === "DELIVERY_AREA_CD")
                    .map((option) => (
                      <option key={option.cd_v} value={option.cd_v_meaning}>
                        {option.cd_v_meaning}
                      </option>
                    ))}
                </Input>
              </td>
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "#ced6e0",
                  margin: 1,
                }}
              >
                지시번호
              </th>
              <td>
                <div>
                  <Input
                    type="text"
                    id="transOrderNo"
                    onChange={onChangeCalInfo}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Button
            outline
            style={{ margin: 3 }}
            className="btn"
            size="sm"
            onClick={() => {
              onSubmitCalculateDetailInfo(params);
              setDetailOpenModal((detailOpenModal) => !detailOpenModal);
            }}
          >
            상세정보
          </Button>
          {detailOpenModal && (
            <CalculateDetailModal
              detailParamas={detailParamas}
              calculateDetailCodeData={calculateDetailCodeData?.data}
              isOpen={detailOpenModal}
              closeModal={() => {
                setDetailOpenModal((detailOpenModal) => !detailOpenModal);
              }}
              setChkCancleFlag = {setChkCancleFlag}
              chkCancleFlag={chkCancleFlag}
              chkClearAmtFlag={chkClearAmtFlag}
            />
          )}
          <Button
            type="submit"
            onClick={() => excelDownload(calculateInfoData.data)}
            size="sm"
            outline
            style={{ margin: 3 }}
          >
            엑셀 Export
          </Button>
        </div>
        <div
          style={{
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
          <Table bordered style={{ marginTop: 10 }} id="table-sample">
            <thead style={{ textAlign: "center" }}>
                <tr id="tableForm" className="table-secondary">
                  <th>CHK</th>
                  <th>제철소코드</th>
                  <th>권역</th>
                  <th>물류실행사ID</th>
                  <th>물류 실행사명</th>
                  <th>선적일자</th>
                  <th>지시번호</th>
                  <th>선박코드</th>
                  <th>선박명</th>
                  <th>확정여부</th>
                  <th>회계연결여부</th>
                  <th>통화</th>
                  <th>정산중량</th>
                  <th>정산금액</th>
                  <th>회계연결금액</th>
                  <th>AP 전표번호</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
              <>
                {calculateInfoData.data?.map((data, index) => (
                  <tr key={index} aria-rowcount={index}>
                    <td id="tableFormTd" >
                      <Input
                        type="checkbox"
                        id="calInfoId"
                        name="calInfoId"
                        value={data}
                        onChange={(e) => {
                          onCheckedElement(e.target.checked, data);
                          checkOnlyOne(e.target);
                          setDetailParamas({
                            ...detailParamas,
                            data: data,
                          });
                          setTransOrderNoParam(data.trans_order_no);
                          setParams({ ...params, invInnerNo:data.inv_inner_no, transOrderNo: data.trans_order_no, blDate: data.bl_date , facCd: facCdChange(data.fac_cd) });
                          setChkDstConfYnFlag(data.dst_conf_yn);
                          setChkClearAmtFlag(data?.clear_amt);
                          setChkAcctgYnFlag(data.acctg_yn);

                        }}
                      ></Input>
                    </td>
                    <td>{data.fac_cd}</td>
                    <td>{data.nation_nm}</td>
                    <td>{data.lsp_id}</td>
                    <td>{data.cd_v_meaning}</td>
                    <td>{dateToString(to_date(data.bl_date))}</td>
                    <td>{data.trans_order_no}</td>
                    <td>{data.vsl_cd}</td>
                    <td>{data.vsl_nm}</td>
                    <td>{data.dst_conf_yn}</td>
                    <td>{ 
                        (data?.acctg_yn == null) ? 
                         "N" :
                        (data?.acctg_yn)
                      }
                      </td>
                    <td>{data.clear_curr}</td>
                    <td>
                      { 
                        (data?.clear_qty == null) ? 
                        (data?.clear_qty):
                        (data?.clear_qty
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                      }
                    </td>
                    <td>
                      { 
                        (data?.clear_amt == null) ? 
                        (0):
                        (data?.clear_amt
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                      }
                    </td>
                    <td>
                      {
                        (data?.acctg_amt == null) ? 
                        (0):
                        (data?.acctg_amt
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                      }
                    </td>
                    <td>{data.close_no}</td>
                  </tr>
                ))}
              </>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CalculateInfoForm;
