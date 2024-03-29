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
import { vslCdRequestAsync } from "modules/calculate/actions";

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
  const dispatch = useDispatch();

  const [params, setParams] = useState({
    vslCd: "",
    vslNm: "",
  });

  const onSubmitVslCd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(vslCdRequestAsync.request(params));
  };

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
            <table className="vslTable">
              <tr>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ced6e0",
                    margin: 1,
                  }}
                >
                  선박 코드
                </th>
                <td>
                  <Input
                    type="text"
                    id="vslCd"
                    onChange={(e) =>
                      setParams({
                        ...params,
                        [e.target.id]: e.target.value,
                      })
                    }
                    style={{
                      marginRight: "30px",
                      boxShadow: "none",
                      borderRadius: 0,
                      display: "span",
                    }}
                  />
                </td>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ced6e0",
                    margin: 1,
                  }}
                >
                  선박 명
                </th>
                <td>
                  <Input
                    style={{
                      marginRight: "30px",
                      boxShadow: "none",
                      borderRadius: 0,
                      display: "span",
                    }}
                    type="text"
                    id="vslNm"
                    onChange={(e) =>
                      setParams({
                        ...params,
                        [e.target.id]: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <Form
                    style={{ margin: 3 }}
                    onSubmit={onSubmitVslCd}
                    className="vslCd"
                  >
                    <Button
                      outline
                      style={{ margin: 3 }}
                      className="btn"
                      size="sm"
                    >
                      조회
                    </Button>
                  </Form>
                </td>
              </tr>
            </table>
          </Container>
          <Container>
            <div
              style={{
                maxHeight: "500px",
                overflowY: "auto",
              }}
            >
              <Table hover border={1}>
                <tbody style={{ textAlign: "center" }}>
                  {vslCodeData.data?.map((data, index) => (
                    <tr
                      key={index}
                      aria-rowcount={index}
                      onClick={() =>
                        onClickVslCdParmas(data.vsl_cd, data.vsl_nm)
                      }
                    >
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
