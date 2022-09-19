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
import { updateAccountRequestAsync } from "modules/calculate/actions";

interface AccountConnModalProps {
  closeModal: any;
  isOpen: boolean;
  detailParamas: any;
}

const AccountConnModal = ({
  isOpen,
  closeModal,
  detailParamas,
}: AccountConnModalProps) => {
  const expNo = localStorage.getItem("employeeNumber");
  const [openModal, setOpenModal] = useState(false);
  const [addMember, setAddMember] = useState<any>([]);
  const [preActorId, setPreActorId] = useState("");

  const nowUserId = localStorage.getItem("userId");
  const nowUserNm = localStorage.getItem("userNm");
  const [newAccountIdParams, setNewAccountIdParams] = useState({
    closeNo: "",
    acctgAmt: detailParamas.data.clear_amt,
    transOrderNo: detailParamas.data.trans_order_no,
    invInnerNo: detailParamas.data.inv_inner_no,
  });

  const getNewAccountId = async () => {
    await axios
      .get(`http://3.37.155.50:8000/calculate/newAccountId?expNo=${expNo}`)
      .then((res) =>
        setNewAccountIdParams({
          ...newAccountIdParams,
          closeNo: res.data,
        })
      );
  };
  const dispatch = useDispatch();

  useEffect(() => {
    getNewAccountId();
  }, []);

  const onSubmitAccountInfo = (e: FormEvent<HTMLFormElement>) => {
    dispatch(updateAccountRequestAsync.request(newAccountIdParams));
    alert("결재 성공 > 전표번호가 발행 되었습니다.");
  };

  const onClickUser = (userId: string) => {
    setPreActorId(userId);
  };
  console.log(addMember, addMember.length)
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
                  <th
                    style={{
                      textAlign: "center",
                      backgroundColor: "#ced6e0",
                      margin: 1,
                    }}
                  >
                    매출매입구분코드
                  </th>
                  <td>매입</td>
                  <th
                    style={{
                      textAlign: "center",
                      backgroundColor: "#ced6e0",
                      margin: 1,
                    }}
                  >
                    운송비 유형명
                  </th>
                  <td>국제해송</td>
                  <th
                    style={{
                      textAlign: "center",
                      backgroundColor: "#ced6e0",
                      margin: 1,
                    }}
                  >
                    매출매입일자
                  </th>
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
                    />
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
                    수신자
                  </th>
                  <td colSpan={2}>
                    <div>
                      <Input
                        id="crePersonId"
                        name="crePersonId"
                        defaultValue={nowUserNm || ""}
                        value={addMember[addMember.length -1]?.userNm}
                        readOnly
                        style={{
                          boxShadow: "none",
                          width: "90%",
                          display: "inline-block",

                          borderRadius: 0,
                        }}
                      />
                      <HiSearch
                        style={{ marginLeft: 10, cursor: "pointer" }}
                        onClick={() => {
                          setOpenModal((openModal) => !openModal);
                        }}
                      ></HiSearch>
                      {openModal && (
                        <SearchUser
                          onClickUser={onClickUser}
                          isOpen={openModal}
                          closeModal={() =>
                            setOpenModal((openModal) => !openModal)
                          }
                          addMember={addMember}
                          setAddMember={setAddMember}
                        ></SearchUser>
                      )}
                    </div>
                    <Input
                      type="textarea"
                      style={{
                        boxShadow: "none",
                        borderRadius: 0,
                        marginLeft: 0,
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
                    결재의견
                  </th>
                  <td colSpan={2}>
                    <Input
                      type="textarea"
                      style={{
                        boxShadow: "none",
                        borderRadius: 0,
                        width: "100%",
                        height: "100%",
                        marginLeft: 0,
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Container>
          <Container>
            <Table border={1} id="tableResult">
              <tbody style={{ textAlign: "center" }}>
                <tr className="tableResultTr">
                  <th style={{
                      textAlign: "center",
                      backgroundColor: "#ced6e0",
                      margin: 1,
                    }}>번호</th>
                  <th style={{
                      textAlign: "center",
                      backgroundColor: "#ced6e0",
                      margin: 1,
                    }}>물류실행사명</th>
                  <th style={{
                      textAlign: "center",
                      backgroundColor: "#ced6e0",
                      margin: 1,
                    }}>정산량</th>
                  <th style={{
                      textAlign: "center",
                      backgroundColor: "#ced6e0",
                      margin: 1,
                    }}>지불통화</th>
                  <th style={{
                      textAlign: "center",
                      backgroundColor: "#ced6e0",
                      margin: 1,
                    }}>지불연결금액</th>
                </tr>
                <>
                  <tr className="tableResultTr">
                    <td>{1}</td>
                    <td>{detailParamas.data.cd_v_meaning}</td>
                    <td>
                      {
                        (detailParamas.data?.clear_qty == null) ? 
                        (detailParamas.data?.clear_qty):
                        (detailParamas.data?.clear_qty
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                      }
                      
                    </td>
                    <td>{detailParamas.data.clear_curr}</td>
                    <td>
                      {
                        (detailParamas.data?.clear_amt == null) ? 
                        (detailParamas.data?.clear_amt):
                        (detailParamas.data?.clear_amt
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                      }
                    </td>
                  </tr>
                  <tr style={{ height: "300px" }}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </>
              </tbody>
              <tfoot style={{ textAlign: "center" }} className="tableResultTr">
                <tr>
                  <td colSpan={2} style={{ backgroundColor: "#ced6e0" }}>
                    총 금액
                  </td>
                  <td>
                    {
                      (detailParamas.data?.clear_qty == null) ? 
                      (detailParamas.data?.clear_qty):
                      (detailParamas.data?.clear_qty
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                    }
                  </td>
                  <td></td>
                  <td>
                    {
                      (detailParamas.data?.clear_amt == null) ? 
                      (detailParamas.data?.clear_amt):
                      (detailParamas.data?.clear_amt
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                    }
                  </td>
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
                onSubmit={onSubmitAccountInfo}
                className="CalculateInfoForm"
              >
                <Button outline style={{ margin: 3 }} className="btn" size="sm">
                  결재요청
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
