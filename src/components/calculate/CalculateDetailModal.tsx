import { FormEvent, useEffect, useRef, useState } from "react";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  Label,
  InputGroup,
  InputGroupText,
  Form,
  Row,
  Col,
  Container,
} from "reactstrap";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "modules";
import {
  baseCodeAsync,
  insertContractCodeAsync,
} from "modules/contractCoa/action";
import axios from "axios";
import { ModalTitle } from "react-bootstrap";
import { HiSearch } from "react-icons/hi";
import SearchUser from "components/ContractMember/SearchUser";
import styles from "./coa.module.css";
import { updateFrtStatusRequestAsync } from "modules/calculate/actions";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

interface CalculateDetailModalProps {
  closeModal: any;
  isOpen: boolean;
  calculateDetailCodeData: any;
  detailParamas: any;
  setChkCancleFlag: any;
  chkCancleFlag: boolean;
  chkClearAmtFlag: any;
}

const CalculateDetailModal = ({
  isOpen,
  closeModal,
  calculateDetailCodeData,
  detailParamas,
  setChkCancleFlag,
  chkCancleFlag,
  chkClearAmtFlag,
}: CalculateDetailModalProps) => {
  const [params, setParams] = useState({
    transOrderNo: detailParamas.data?.trans_order_no,
    frtStatus: "20",
    dstConfYn: "Y",
  });

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

  function clearQtyTotalSum() {
    let ans = 0;
    calculateDetailCodeData?.map((data, index) => {
      ans += parseInt(data["clear_qty"]);
    });
    return ans.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function clearAmtTotalSum() {
    let ans = 0;
    calculateDetailCodeData?.map((data, index) => {
      ans += parseInt(data["clear_amt"]);
    });
    return ans.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function clearLocalSuppAmtTotalSum() {
    let ans = 0;
    calculateDetailCodeData?.map((data, index) => {
      ans += parseInt(data["local_supp_amt"]);
    });
    return ans.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const dispatch = useDispatch();

  const onSubmitUpdFrtStatus = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((chkClearAmtFlag == null) || (chkClearAmtFlag == 0)){
      alert("운임 정산을 먼저 해주세요.");
    }else{
      dispatch(updateFrtStatusRequestAsync.request(params));
      alert("담당자 확정이 완료되었습니다.");
      setChkCancleFlag(!chkCancleFlag);
      closeModal(true);
    }
  };
  //엑셀 구현
  const excelFileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const excelFileExtension = ".xlsx";
  const excelFileName = "국제해송비정산상세";

  const excelDownload = (excelData: any) => {
    const ws = XLSX.utils.aoa_to_sheet([
      [
        "제철소코드",
        "목적지명",
        "선적일자",
        "주문번호",
        "제품명",
        "실선적량",
        "총중량단위",
        "단가",
        "정산통화",
        "정산금액",
        "환율",
        "Local통화",
        "Local금액",
      ],
    ]);
    excelData.map((exportData: any) => {
      XLSX.utils.sheet_add_aoa(
        ws,
        [
          [
            exportData.fac_cd,
            exportData.arr_node_nm,
            exportData.bl_date,
            exportData.ref_doc_no,
            exportData.item_cd,
            exportData.clear_qty,
            exportData.tot_gross_wt_unit_cd,
            exportData.unit_price,
            exportData.clear_curr,
            exportData.clear_amt,
            exportData.local_exr,
            exportData.local_curr_cd,
            exportData.local_supp_amt,
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
  
  console.log(detailParamas.data);
  console.log(detailParamas.data?.vsl_load_posbl_wt);
  return (
    <>
      <Modal isOpen={isOpen} toggle={closeModal} size="xl">
        <Container>
          <ModalHeader toggle={closeModal}>
            <ModalTitle>상세 정보</ModalTitle>
          </ModalHeader>
        </Container>
        <ModalBody>
          <Container>
            <table className="detailTable">
              <tr>
                <td>지시번호</td>
                <td>
                  <Input
                    type="text"
                    disabled
                    value={detailParamas.data?.trans_order_no}
                  ></Input>
                </td>
                <td>총선적량</td>
                <td>
                  <Input
                    type="text"
                    disabled
                    value={
                      (detailParamas.data?.clear_qty == null) ? 
                      (detailParamas.data?.clear_qty):
                      (detailParamas.data?.clear_qty
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                    }
                    
                  ></Input>
                </td>
              </tr>
              <tr>
                <td>선박명</td>
                <td>
                  <Input
                    type="text"
                    disabled
                    value={detailParamas.data?.vsl_nm}
                  ></Input>
                </td>
                <td>기준선적량</td>
                <td>
                  <Input
                    type="text"
                    disabled
                    value={
                      (detailParamas.data?.vsl_load_posbl_wt == null) ? 
                      (detailParamas.data?.vsl_load_posbl_wt):
                      (detailParamas.data?.vsl_load_posbl_wt
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                    }
                  ></Input>
                </td>
              </tr>
              <tr>
                <td>물류실행사명</td>
                <td>
                  <Input
                    type="text"
                    disabled
                    value={detailParamas.data?.cd_v_meaning}
                  ></Input>
                </td>
                <td>선적일자</td>
                <td>
                  <Input type="text" disabled value={dateToString(to_date(detailParamas.data?.bl_date))}></Input>
                </td>
              </tr>
              <tr>
                <td>해송운임</td>
                <td>
                  <Input
                    type="text"
                    disabled
                    value={clearAmtTotalSum() == 'NaN' ? 0 : clearAmtTotalSum()}
                  ></Input>
                </td>
                <td>총 운임</td>
                <td>
                  <Input
                    type="text"
                    disabled
                    value={clearAmtTotalSum() == 'NaN' ? 0 : clearAmtTotalSum()}
                  ></Input>
                </td>
              </tr>
            </table>
          </Container>
          <Container>
            <div
              style={{
                margin: "10px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Form
                style={{ margin: 3 }}
                onSubmit={onSubmitUpdFrtStatus}
                className="UpdFrtStatusForm"
              >
                <Button
                  outline
                  className="btn"
                  size="sm"
                  style={{ margin: 0, padding: 0, width: 80 }}
                >
                  담당자확정
                </Button>
              </Form>
              <Button
                type="submit"
                className="btn"
                onClick={() => excelDownload(calculateDetailCodeData)}
                size="sm"
                outline
                style={{ margin: 0, padding: 0, width: 80 }}
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
              <Table bordered id="CalTableDetail">
                <tbody style={{ textAlign: "center" }}>
                  <tr className="table-secondary">
                    <th>번호</th>
                    <th>제철소코드</th>
                    <th>목적지명</th>
                    <th>선적일자</th>
                    <th>주문번호</th>
                    <th>제품명</th>
                    <th>실선적량</th>
                    <th>총중량 단위</th>
                    <th>단가</th>
                    <th>정산통화</th>
                    <th>정산금액</th>
                    <th>환율</th>
                    <th>Local 통화</th>
                    <th>Local 금액</th>
                  </tr>
                  {calculateDetailCodeData?.map((data, index) => (
                    <>
                      <tr key={index} aria-rowcount={index}>
                        <td>{index + 1}</td>
                        <td>{data.fac_cd}</td>
                        <td>{data.arr_node_nm}</td>
                        <td>{dateToString(to_date(data.bl_date))}</td>
                        <td>{data.ref_doc_no}</td>
                        <td>{data.item_cd}</td>
                        <td>
                          {
                            (data?.clear_qty == null) ? 
                            (data?.clear_qty):
                            (data?.clear_qty
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                          }
                        </td>
                        <td>{data.tot_gross_wt_unit_cd}</td>
                        <td>
                          {
                            (data?.unit_price == null) ? 
                            (data?.unit_price):
                            (data?.unit_price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                          }
                          
                        </td>
                        <td>{data.clear_curr}</td>
                        <td>
                        {
                          (data?.clear_amt == null) ? 
                          (data?.clear_amt):
                          (data?.clear_amt
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                        }
                        </td>
                        <td>{data.local_exr}</td>
                        <td>{data.local_curr_cd}</td>
                        <td>
                        {
                          (data?.local_supp_amt == null) ? 
                          (data?.local_supp_amt):
                          (data?.local_supp_amt
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                        }
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
                <tfoot style={{ textAlign: "center" }}>
                  <tr>
                    <td colSpan={6} style={{ backgroundColor: "#ced6e0" }}>
                      총 금액
                    </td>
                    <td>{clearQtyTotalSum()}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{clearAmtTotalSum() == 'NaN' ? null : clearAmtTotalSum()}</td>
                    <td></td>
                    <td></td>
                    <td>{clearLocalSuppAmtTotalSum() == 'NaN' ? null : clearLocalSuppAmtTotalSum()}</td>
                  </tr>
                </tfoot>
              </Table>
            </div>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CalculateDetailModal;
