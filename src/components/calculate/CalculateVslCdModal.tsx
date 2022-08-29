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
  vslCodeData: any;
  onClickVslCdParmas: any;
}

const CalculateVslCdModal = ({
  isOpen,
  closeModal,
  vslCodeData,
  onClickVslCdParmas,
}: CalculateVslCdModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} toggle={closeModal} size="xl">
        <Container>
          <ModalHeader toggle={closeModal}>
            <ModalTitle>선박 코드</ModalTitle>
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
            <Table hover border={1}>
              <tbody style={{ textAlign: "center" }}>
                <tr className="table-secondary">
                  <th>선박코드</th>
                  <th>선박명</th>
                  <th>선박재화중량</th>
                  <th>선적가능량</th>
                </tr>
                  {vslCodeData.data?.map((data, index) => (
                      <tr key={index} aria-rowcount={index} onClick={()=>onClickVslCdParmas(data.vsl_cd, data.vsl_nm)}>
                        
                        <td>{data.vsl_cd}</td>
                        <td>{data.vsl_nm}</td>
                        <td>{data.vsl_dead_wt}</td>
                        <td>{data.vsl_load_posbl_wt}</td>
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

export default CalculateVslCdModal;
