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

interface CalculateLspModalProps {
  closeModal: any;
  isOpen: boolean;
  baseCodeData:any;
}

const CalculateLspModal = ({ isOpen, closeModal, baseCodeData }: CalculateLspModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} toggle={closeModal} size="xl">
        <Container>
          <ModalHeader toggle={closeModal}>
            <ModalTitle>사업협력사 검색</ModalTitle>
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
                  {baseCodeData
                    ?.filter((data) => data.cd_tp === "LSP_INFO")
                    .map((data, index) => (
                      <tr key={index} aria-rowcount={index}>
                        <td>
                          <Input type="checkbox"></Input>
                        </td>
                        <td>{data.nation_nm}</td>
                        <td>{data.lsp_id}</td>
                        <td>{data.cd_v_meaning}</td>
                        <td>날짜</td>
                        <td>{data.trans_order_no}</td>
                        <td>{data.vsl_cd}</td>
                        <td>{data.vsl_nm}</td>
                        <td>
                          <Input type="checkbox"></Input>
                        </td>
                        <td>{data.close_no_yn}</td>
                        <td>{data.acctg_yn}</td>
                        <td>{data.clear_curr}</td>
                        <td>{data.clear_qty}</td>
                        <td>{data.clear_amt}</td>
                        <td>{data.acctg_amt}</td>
                        <td>EX-직번-220810(날찌)-SEQ(6자리)</td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CalculateLspModal;
