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
import TariffLoader from "components/tariffInfo/TariffLoader";
import { TariffHeaderParam } from "modules/tariff/types";
import { baseCode } from "modules/contractCoa/reducer";
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

  const [openNewTariffModal, setNewOpenTariffModal] = useState(false);

  const [tariffParams, setTariffParams] = useState<TariffHeaderParam>({
    cntrtId: "", // 계약 ID -> 계약 ID를 클릭했을 떄 타리프 창이 뜨기 때문에 그 계약 ID 값 가져오기
    trffId: 0, // 타리프 ID
    trffNm: "", // 타리프 NM
    trffDesc: "", // 타리프 설명
    bizTcd: "", //사업유형코드 (사업영역코드는 뭐징?)
    arApCcd: "", // 매출매입구분코드
    svcTcd: "", // 서비스유형코드
    detlSvcTcd: "", // 상세서비스유형
    cntrt_end_date: "", // 유효기간
  });

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
    crePersonId: "", // 담당자 명
    insPersonId: "mh.kim",
    updPersonId: "202207130004",
    cntrtTypGcd: "1090",
  });

  const dispatch = useDispatch();

  const getContractId = async () => {
    await axios.get(`http://localhost:9999/coa/newcntrtid`).then((res) =>
      setContractInfoParamas({
        ...contractInfoParams,
        cntrtId: res.data,
      })
    );
  };

  useEffect(() => {
    dispatch(baseCodeAsync.request(""));
    getContractId();
    baseCodeData.data?.map((option) => {
      console.log(
        "cd_tp : " +
          option.cd_tp +
          ", cd_tp_meaning : " +
          option.cd_tp_meaning +
          ", cd_v : " +
          option.cd_v +
          ", cd_v_meaning: ",
        option.cd_v_meaning
      );
    });
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
        {/* <div className="modal-header">
          <h5>계약</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "95%",
            }}
          >
            <div>계약 등록 화면</div>
            <Form
              className="ContractInfoForm"
              onSubmit={onSubmitInsertContractInfo}
            >
              <Button className="btn" size="sm">
                신규등록
              </Button>
            </Form>
          </div>
          <Button
            className="btn-close"
            onClick={() => {
              closeModal();
            }}
          ></Button>
        </div> */}
        <ModalBody>
          <Container>
            <div style={{ margin: 4 }}>계약정보</div>
            <Table bordered>
              <tr>
                <th>물류법인</th>
                <td>
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
                </td>
                <th>계약유형그룹코드*</th>
                <td>
                  <Input
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
                </td>
              </tr>
              <tr>
                <th>계약명</th>
                <td>
                  <Input
                    id="cntrtNm"
                    name="cntrtNm"
                    onChange={(e) =>
                      setContractInfoParamas({
                        ...contractInfoParams,
                        [e.target.id]: e.target.value,
                      })
                    }
                  />
                </td>
                <th>계약유형코드*</th>
                <td>
                  <Input
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
                </td>
              </tr>
              <tr>
                <th>계약 ID</th>
                <td>
                  <span>{contractInfoParams?.cntrtId.toString()}</span>
                </td>
                <th>담당자*</th>
                <td>
                  <div>
                    <Input
                      id="crePersonId"
                      name="crePersonId"
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
                <th>계약상태</th>
                <td>
                  <Input
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
                </td>
                <th>계약기간</th>
                <td>
                  <div style={{ display: "inline-block" }}>
                    <Input
                      style={{ display: "span" }}
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
                  <div style={{ display: "inline-block" }}>
                    <Input
                      type="date"
                      style={{ display: "span" }}
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
                </td>
              </tr>
              <tr>
                <th>계약통화코드*</th>
                <td>
                  <Input
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
                </td>
                <th>수정사유</th>
                <td>
                  <Input />
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ margin: 0, padding: 0 }}>
                  <Form
                    className="ContractInfoForm"
                    onSubmit={onSubmitInsertContractInfo}
                    style={{ margin: 0, padding: 0 }}
                  >
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
                        저장
                      </Button>
                    </div>
                  </Form>
                </td>
              </tr>
            </Table>
          </Container>

          <Container>
            <Table bordered>
              <thead style={{ margin: 4 }}>타리프 정보</thead>
              <tbody>
                <tr>
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
                onClick={() => {
                  setNewOpenTariffModal(
                    (newOpenTariffModal) => !newOpenTariffModal
                  );
                  setTariffParams({
                    ...tariffParams,
                    cntrtId: contractInfoParams.cntrtId, // 계약 ID
                  });
                }}
              >
                추가
              </Button>
              {openNewTariffModal && (
                <TariffLoader
                  isOpen={openNewTariffModal}
                  closeModal={() =>
                    setNewOpenTariffModal(
                      (openNewTariffModal) => !openNewTariffModal
                    )
                  }
                  tariffParams={tariffParams}
                />
              )}
            </div>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ContractCoaRegisterModal;
