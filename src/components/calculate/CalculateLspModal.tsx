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
  onClickLspParmas?: any;
}

const CalculateLspModal = ({ isOpen, closeModal, baseCodeData,onClickLspParmas }: CalculateLspModalProps) => {

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
            <div
            style={{
              maxHeight: "600px",
              overflowY: "auto",
              
            }}
            >
            <Table border={1} hover>
              <tbody style={{ textAlign: "center" }}>
                <tr className="table-secondary">
                  <th>아이디</th>
                  <th>이름</th>
                </tr>
                  {baseCodeData.data
                    ?.filter((data) => data.cd_tp === "LSP_INFO")
                    .map((data, index) => (
                      <tr key={index} aria-rowcount={index} onClick={()=> onClickLspParmas(data.cd_v, data.cd_v_meaning)}>
                        <td>{data.cd_v}</td>
                        <td>{data.cd_v_meaning}</td>
                      </tr>
                    ))}
              </tbody>
            </Table>
            </div>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CalculateLspModal;
