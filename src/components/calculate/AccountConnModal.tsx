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
import "./table.css";

interface AccountConnModalProps {
  closeModal: any;
  isOpen: boolean;
  detailParamas: any;
}

const AccountConnModal = ({ isOpen, closeModal, detailParamas }: AccountConnModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} toggle={closeModal} size="xl">
        <Container>
          <ModalHeader toggle={closeModal}>
            <ModalTitle>결재</ModalTitle>
          </ModalHeader>
        </Container>
        <ModalBody>
          <Container style={{ marginBottom: 30 }}>
          <Table border={1} id="accountSelectTable">
              <tbody style={{ textAlign: "center" }}>
                <tr>
                  <th style={{
                  textAlign: "center",
                  backgroundColor: "#ced6e0",
                  margin: 1,
                }}>매출매입구분코드</th>
                  <td>매입</td>
                  <th style={{
                  textAlign: "center",
                  backgroundColor: "#ced6e0",
                  margin: 1,
                }}>운송비 유형명</th>
                  <td>국제해송</td>
                  <th style={{
                  textAlign: "center",
                  backgroundColor: "#ced6e0",
                  margin: 1,
                }}>매출매입일자</th>
                  <td>
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
                      id="salesDate"
                      name="salesDate"
                    /></td>
                </tr>
                <tr>
                  <th style={{
                  textAlign: "center",
                  backgroundColor: "#ced6e0",
                  margin: 1,
                }}>수신자</th>
                  <td colSpan={2}>
                    <div style={{display:"flex", marginBottom:"20px" }}>
                      <div>
                        <Input
                          id="userNm"
                          readOnly
                          style={{
                            justifyContent: 'flex-start',
                            boxShadow: "none",
                            borderRadius: 0,
                            marginLeft: 0,
                            padding:0
                          }}
                        />
                        </div>
                        <div>
                          <HiSearch style={{ cursor: "pointer" }}>
                          </HiSearch>
                        </div>
                  </div>
                    <Input type="textarea" 
                    style={{
                    boxShadow: "none",
                    borderRadius: 0,
                    marginLeft: 0,
                  }}/>
                  </td>
                  <th style={{
                  textAlign: "center",
                  backgroundColor: "#ced6e0",
                  margin: 1,
                }}>결제의견</th>
                  <td colSpan={2}>
                    <Input type="textarea" 
                    style={{
                    boxShadow: "none",
                    borderRadius: 0,
                    width:'100%',
                    height:'100%',
                    marginLeft: 0,
                  }}/></td>
                </tr>
              </tbody>
            </Table>
          </Container>
          <Container>
            <Table border={1} id="tableResult">
              <tbody style={{ textAlign: "center" }}>
                <tr className="tableResultTr">
                  <th>번호</th>
                  <th>물류실행사명</th>
                  <th>정산량</th>
                  <th>지불통화</th>
                  <th>청구연결금액</th>
                  <th>지불연결금액</th>
                </tr>
                <>
                    <tr className="tableResultTr">
                      <td>{1}</td>
                      <td>{detailParamas.data.cd_v_meaning}</td>
                      <td>{detailParamas.data.clear_qty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                      <td>{detailParamas.data.clear_curr}</td>
                      <td>{detailParamas.data.clear_amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                      <td>{detailParamas.data.clear_amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                    </tr>
                    <tr style={{height:"300px"}}>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                </>
              </tbody>
              <tfoot style={{ textAlign: "center" }} className="tableResultTr">
                <tr >
                  <td colSpan={2} style={{ backgroundColor:"#ced6e0"}}>총 금액</td>
                  <td>{detailParamas.data.clear_qty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                  <td></td>
                  <td>{detailParamas.data.clear_amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                  <td>{detailParamas.data.clear_amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                </tr>                
              </tfoot>
            </Table>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
            <Form
            style={{ margin: 3 }}
            className="CalculateInfoForm"
            >
              <Button outline style={{ margin: 3}} className="btn" size="sm">
                결제요청
              </Button>
           </Form>
            </div>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AccountConnModal;
