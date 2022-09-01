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

interface CalculateDetailModalProps {
  closeModal: any;
  isOpen: boolean;
  calculateDetailCodeData: any;
  detailParamas: any;
}

const CalculateDetailModal = ({
  isOpen,
  closeModal,
  calculateDetailCodeData,
  detailParamas
}: CalculateDetailModalProps) => {

  console.log("calculateDetailCodeData.data", calculateDetailCodeData);
  
  const dateToString = (date) => {
    return (
      date.getFullYear() +"/"+
      (date.getMonth() + 1).toString().padStart(2, "0") +"/"+
      date.getDate().toString().padStart(2, "0")
    );
  }

  function to_date(date_str)
  {
      const yyyyMMdd = String(date_str);
      const sYear = yyyyMMdd.substring(0,4);
      const sMonth = yyyyMMdd.substring(4,6);
      const sDate = yyyyMMdd.substring(6,8);

      return new Date(Number(sYear), Number(sMonth)-1, Number(sDate));
  }

  function clearQtyTotalSum(){
    console.log(calculateDetailCodeData);
    let ans = 0;
    calculateDetailCodeData?.map((data, index) => {
      ans+=parseInt(data['clear_qty']);
    })
    console.log(ans)
    return ans.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
  function clearAmtTotalSum(){
    console.log(calculateDetailCodeData);
    let ans = 0;
    calculateDetailCodeData?.map((data, index) => {
      ans+=parseInt(data['clear_amt']);
    })
    console.log(ans)
    return ans.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  function clearLocalSuppAmtTotalSum(){
    console.log(calculateDetailCodeData);
    let ans = 0;
    calculateDetailCodeData?.map((data, index) => {
      ans+=parseInt(data['local_supp_amt']);
    })
    console.log(ans)
    return ans.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
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
            <table>
              <tr>
                <td>지시번호</td>
                <td>
                  <Input type="text" disabled value={detailParamas.data?.trans_order_no}></Input>
                </td>
                <td>총선적량</td>
                <td>
                  <Input type="text" disabled value={detailParamas.data?.clear_qty}></Input>
                </td>
              </tr>
              <tr>
                <td>선박명</td>
                <td>
                  <Input type="text" disabled value={detailParamas.data?.vsl_nm}></Input>
                </td>
                <td>기준선적량</td>
                <td>
                  <Input type="text" disabled value="2500000"></Input>
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
                <td>기타할증</td>
                <td>
                  <Input type="text" disabled value={"0"}></Input>
                </td>
              </tr>
              <tr>
                <td>해송운임</td>
                <td>
                  <Input type="text" disabled value={detailParamas.data?.clear_amt}></Input>
                </td>
                <td>총 운임</td>
                <td>
                  <Input type="text" disabled value={detailParamas.data?.clear_amt}></Input>
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
              <Button
                outline
                className="btn"
                size="sm"
                style={{ margin: 0, padding: 0, width: 80 }}
              >
                담당자확정
              </Button>
            </div>
            <Table bordered>
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
                {calculateDetailCodeData?.map((data, index)=>(
                  <><tr key={index} aria-rowcount={index}>
                    <td>{index+1}</td>
                    <td>{data.fac_cd}</td>
                    <td>{data.arr_node_nm}</td>
                    <td>{dateToString(to_date(data.bl_date))}</td>
                    <td>{data.ref_doc_no}</td>
                    <td>{data.item_cd}</td>
                    <td>{data.clear_qty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                    <td>{data.tot_gross_wt_unit_cd}</td>
                    <td>{data.unit_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                    <td>{data.clear_curr}</td>
                    <td>{data.clear_amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                    <td>{data.local_exr}</td>
                    <td>{data.local_curr_cd}</td>
                    <td>{data.local_supp_amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                  </tr>
                  
                  </>
                ))}
              </tbody>
              <tfoot style={{ textAlign: "center" }}>
                <tr>
                  <td colSpan={6} style={{ backgroundColor:"#ced6e0"}}>총 금액</td>
                  <td>{clearQtyTotalSum()}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{clearAmtTotalSum()}</td>
                  <td></td>
                  <td></td>
                  <td>{clearLocalSuppAmtTotalSum()}</td>
                </tr>
              </tfoot>
            </Table>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CalculateDetailModal;