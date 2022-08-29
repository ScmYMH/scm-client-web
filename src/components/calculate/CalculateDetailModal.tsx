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
  calculateInfoData: any;
}

const CalculateDetailModal = ({
  isOpen,
  closeModal,
  calculateInfoData,
}: CalculateDetailModalProps) => {
  console.log("calculateInfoDatacalculateInfoData", calculateInfoData)
  return (
    <>
      <Modal isOpen={isOpen} toggle={closeModal} size="xl">
        <Container>
          <ModalHeader toggle={closeModal}>
            <ModalTitle>계약 등록</ModalTitle>
          </ModalHeader>
        </Container>
        <ModalBody>
          <Container>
            <table>
              <tr>
                <td>지시번호</td>
                <td>
                  <Input type="text" disabled value={4220624003}></Input>
                </td>
                <td>총선적량</td>
                <td>
                  <Input type="text" disabled value={2446716}></Input>
                </td>
              </tr>
              <tr>
                <td>선박명</td>
                <td>
                  <Input type="text" disabled value={2500000}></Input>
                </td>
                <td>기준선적량</td>
                <td>
                  <Input type="text" disabled value={"MIRAI ASTRO"}></Input>
                </td>
              </tr>
              <tr>
                <td>물류실행사명</td>
                <td>
                  <Input
                    type="text"
                    disabled
                    value={"신성해운(주) / Shinsung Shipping Co., Ltd.-본사"}
                  ></Input>
                </td>
                <td>선박명</td>
                <td>
                  <Input type="text" disabled value={"0"}></Input>
                </td>
              </tr>
              <tr>
                <td>해송운임</td>
                <td>
                  <Input type="text" disabled value={89060.46}></Input>
                </td>
                <td>총 운임</td>
                <td>
                  <Input type="text" disabled value={89060.46}></Input>
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
                style={{ margin: 0, padding: 0, width: 50 }}
              >
                추가
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
                <tr>
                  <td>1</td>
                  <td>K</td>
                  <td>ICHIKAWA</td>
                  <td>7/3/2022</td>
                  <td>01S5488637010</td>
                  <td>HR.Coil</td>
                  <td>72,524</td>
                  <td>KG</td>
                  <td>36.40</td>
                  <td>USD</td>
                  <td>2,639.87</td>
                  <td>1,299.80</td>
                  <td>KRW</td>
                  <td>3,431,303</td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CalculateDetailModal;
