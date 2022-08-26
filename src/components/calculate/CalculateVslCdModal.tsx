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

interface CalculateVslCdModalProps {
  closeModal: any;
  isOpen: boolean;
}

const CalculateVslCdModal = ({
  isOpen,
  closeModal,
}: CalculateVslCdModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} toggle={closeModal} size="xl">
        <Container>
          <ModalHeader toggle={closeModal}>
            <ModalTitle>사업 코드</ModalTitle>
          </ModalHeader>
        </Container>
        <ModalBody>
          <Container style={{ marginBottom: 30 }}>
            <table>
              <tr>
                <td>검색조건</td>
                <td></td>
                <td>
                  <Input type="text"></Input>
                </td>
              </tr>
            </table>
          </Container>
          <Container>
            <Table border={1}>
              <tbody style={{ textAlign: "center" }}>
                <tr className="table-secondary">
                  <th>아이디</th>
                  <th>이름</th>
                </tr>
                <tr>
                  <td>10028011</td>
                  <td>대유상선(주) / Daeyoo Merchant Marine Co., Ltd</td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CalculateVslCdModal;
