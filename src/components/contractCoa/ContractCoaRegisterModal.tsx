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

interface ContractCoaRegisterModalProps {
  closeModal: any;
  isOpen: boolean;
}

const ContractCoaRegisterModal = ({
  isOpen,
  closeModal,
}: ContractCoaRegisterModalProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [preActorId, setPreActorId] = useState("");
  const [addMember, setAddMember] = useState<any>([]);

  const nowUserId = localStorage.getItem("userId");
  const nowUserNm = localStorage.getItem("userNm");

  const onClickUser = (userId: string) => {
    setPreActorId(userId);
    setContractInfoParamas({
      ...contractInfoParams,
      crePersonId: userId,
    });
    console.log(contractInfoParams);
  };

  const baseCodeData = useSelector(
    (state: RootState) => state.baseCode.baseCode
  );
  const [contractInfoParams, setContractInfoParamas] = useState({
    cntrtId: "",
    cntrtCurrCd: "USD",
    cntrtNm: "",
    cntrtScd: "60",
    cntrtStartDate: "",
    cntrtEndDate: "",
    cntrtTcd: "109031",
    crePersonId: nowUserId, // 담당자 명
    insPersonId: nowUserId,
    updPersonId: nowUserId,
    cntrtTypGcd: "1090",
  });
  const dispatch = useDispatch();

  const getContractId = async () => {
    await axios.get(`http://3.37.155.50:8000/coa/newcntrtid`).then((res) =>
      setContractInfoParamas({
        ...contractInfoParams,
        cntrtId: res.data,
      })
    );
  };

  useEffect(() => {
    dispatch(baseCodeAsync.request(""));
    getContractId();
  }, []);

  const onSubmitInsertContractInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contractInfoParams.cntrtNm == "") {
      alert("계약 명을 작성 해주세요.");
    } else if (contractInfoParams.crePersonId == "") {
      alert("담당자명을 작성 해주세요.");
    } else if (contractInfoParams.cntrtStartDate == "") {
      alert("계약 시작 기간을 작성 해주세요.");
    } else if (contractInfoParams.cntrtEndDate == "") {
      alert("계약 종료 기간을 작성 해주세요.");
    } else {
      dispatch(insertContractCodeAsync.request(contractInfoParams));
      alert("등록이 완료되었습니다.");
      closeModal();
    }
  };
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
            <div style={{ margin: 4 }}>계약정보</div>
            <Table bordered className={styles.register_table}>
              <tbody>
                <tr>
                  <th
                    style={{
                      textAlign: "center",
                      backgroundColor: "#ced6e0",
                      margin: 1,
                    }}
                  >
                    물류법인
                  </th>
                  <td>
                    <div>
                      <Input
                        id="coprId"
                        name="coprId"
                        type="select"
                        onChange={(e) =>
                          setContractInfoParamas({
                            ...contractInfoParams,
                            [e.target.id]: e.target.value,
                          })
                        }
                        style={{
                          marginRight: "30px",
                          boxShadow: "none",
                          borderRadius: 0,
                        }}
                      >
                        {baseCodeData.data?.slice(8, 9).map((option) => (
                          <option
                            key={option.cd_v}
                            value={option.cd_v}
                            selected={option.cd_v_meaning}
                            disabled
                          >
                            {option.cd_v_meaning}
                          </option>
                        ))}
                      </Input>
                    </div>
                  </td>
                  <th
                    style={{
                      textAlign: "center",
                      backgroundColor: "#ced6e0",
                      margin: 1,
                    }}
                  >
                    계약유형그룹코드*
                  </th>
                  <td>
                    <div>
                      <Input
                        style={{
                          marginRight: "30px",
                          boxShadow: "none",
                          borderRadius: 0,
                        }}
                        id="cntrtTypGcd"
                        name="cntrtTypGcd"
                        type="select"
                        onChange={(e) =>
                          setContractInfoParamas({
                            ...contractInfoParams,
                            [e.target.id]: e.target.value,
                          })
                        }
                      >
                        {baseCodeData.data?.slice(10, 12).map((option) => (
                          <option key={option.cd_v} value={option.cd_v}>
                            {option.cd_v_meaning}
                          </option>
                        ))}
                      </Input>
                    </div>
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
                    계약명
                  </th>
                  <td>
                    <div>
                      <Input
                        style={{
                          marginRight: "30px",
                          boxShadow: "none",
                          borderRadius: 0,
                        }}
                        id="cntrtNm"
                        name="cntrtNm"
                        onChange={(e) =>
                          setContractInfoParamas({
                            ...contractInfoParams,
                            [e.target.id]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </td>
                  <th
                    style={{
                      textAlign: "center",
                      backgroundColor: "#ced6e0",
                      margin: 1,
                    }}
                  >
                    계약유형코드*
                  </th>
                  <td>
                    <div>
                      <Input
                        style={{
                          marginRight: "30px",
                          boxShadow: "none",
                          borderRadius: 0,
                        }}
                        id="cntrtTcd"
                        name="cntrtTcd"
                        type="select"
                        onChange={(e) =>
                          setContractInfoParamas({
                            ...contractInfoParams,
                            [e.target.id]: e.target.value,
                          })
                        }
                      >
                        {baseCodeData.data?.slice(12, 22).map((option) => (
                          <option key={option.value} value={option.cd_v}>
                            {option.cd_v_meaning}
                          </option>
                        ))}
                      </Input>
                    </div>
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
                    계약 ID
                  </th>
                  <td>
                    <span>{contractInfoParams?.cntrtId.toString()}</span>
                  </td>
                  <th
                    style={{
                      textAlign: "center",
                      backgroundColor: "#ced6e0",
                      margin: 1,
                    }}
                  >
                    담당자*
                  </th>
                  <td>
                    <div>
                      <Input
                        id="crePersonId"
                        name="crePersonId"
                        defaultValue={nowUserNm || ""}
                        value={addMember[0]?.userNm}
                        onChange={(e) =>
                          setContractInfoParamas({
                            ...contractInfoParams,
                            [e.target.id]: e.target.value,
                          })
                        }
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
                    계약상태
                  </th>
                  <td>
                    <div>
                      <Input
                        style={{
                          marginRight: "30px",
                          boxShadow: "none",
                          borderRadius: 0,
                        }}
                        id="cntrtScd"
                        name="cntrtScd"
                        type="select"
                        onChange={(e) =>
                          setContractInfoParamas({
                            ...contractInfoParams,
                            [e.target.id]: e.target.value,
                          })
                        }
                      >
                        {baseCodeData.data?.slice(0, 1).map((option) => (
                          <option
                            key={option.cd_v}
                            value={option.cd_v}
                            selected={option.cd_v_meaning}
                            disabled
                          >
                            {option.cd_v_meaning}
                          </option>
                        ))}
                      </Input>
                    </div>
                  </td>
                  <th
                    style={{
                      textAlign: "center",
                      backgroundColor: "#ced6e0",
                      margin: 1,
                    }}
                  >
                    계약기간
                  </th>
                  <td>
                    <div style={{ display: "inline-block" }}>
                      <div>
                        <Input
                          style={{
                            marginRight: "30px",
                            boxShadow: "none",
                            borderRadius: 0,
                            display: "span",
                          }}
                          fixedHeight
                          dateFormat="yyyy-MM-dd"
                          selected={startDate}
                          selectsStart
                          type="date"
                          id="cntrtStartDate"
                          name="cntrtStartDate"
                          onChange={(e) =>
                            setContractInfoParamas({
                              ...contractInfoParams,
                              [e.target.id]: e.target.value.replaceAll("-", ""),
                            })
                          }
                        />
                      </div>
                    </div>
                    <div style={{ display: "inline-block" }}>
                      <div>
                        <Input
                          type="date"
                          style={{
                            marginRight: "30px",
                            boxShadow: "none",
                            borderRadius: 0,
                            display: "span",
                          }}
                          fixedHeight
                          dateFormat="yyyy-MM-dd"
                          id="cntrtEndDate"
                          name="cntrtEndDate"
                          onChange={(e) =>
                            setContractInfoParamas({
                              ...contractInfoParams,
                              [e.target.id]: e.target.value.replaceAll("-", ""),
                            })
                          }
                          selected={endDate}
                          minDate={new Date()}
                        />
                      </div>
                    </div>
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
                    계약통화코드*
                  </th>
                  <td>
                    <div>
                      <Input
                        style={{
                          marginRight: "30px",
                          boxShadow: "none",
                          borderRadius: 0,
                        }}
                        id="cntrtCurrCd"
                        name="cntrtCurrCd"
                        type="select"
                        onChange={(e) =>
                          setContractInfoParamas({
                            ...contractInfoParams,
                            [e.target.id]: e.target.value,
                          })
                        }
                      >
                        {baseCodeData.data?.slice(24, 38).map((option) => (
                          <option key={option.value} value={option.cd_v}>
                            {option.cd_v} [{option.cd_v_meaning}]
                          </option>
                        ))}
                      </Input>
                    </div>
                  </td>
                  <th
                    style={{
                      textAlign: "center",
                      backgroundColor: "#ced6e0",
                      margin: 1,
                    }}
                  >
                    수정사유
                  </th>
                  <td>
                    <div>
                      <Input
                        style={{
                          marginRight: "30px",
                          boxShadow: "none",
                          borderRadius: 0,
                        }}
                      />
                    </div>
                  </td>
                </tr>
                <tr></tr>
              </tbody>
            </Table>

            <Form
              className="ContractInfoForm"
              onSubmit={onSubmitInsertContractInfo}
              style={{ margin: 0, padding: 0, float: "right" }}
            >
              <div
                style={{
                  margin: "10px",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  float: "right",
                }}
              >
                <Button
                  outline
                  className="btn"
                  size="sm"
                  style={{ margin: 0, padding: 0, width: 50 }}
                >
                  저장
                </Button>
              </div>
            </Form>
          </Container>

          <Container>
            <Table bordered>
              <thead style={{ margin: 4 }}>타리프 정보</thead>
              <tbody style={{ textAlign: "center" }}>
                <tr className="table-secondary">
                  <th>일련번호</th>
                  <th>타리프 ID</th>
                  <th>타리프 설명</th>
                  <th>서비스유형명</th>
                  <th>Data Count</th>
                  <th>LCC 갯수</th>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
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
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ContractCoaRegisterModal;
