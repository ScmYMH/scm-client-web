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
  updateContractCodeAsync,
} from "modules/contractCoa/action";
import axios from "axios";
import { ModalTitle } from "react-bootstrap";
import { HiSearch } from "react-icons/hi";
import SearchUser from "components/ContractMember/SearchUser";
import TariffLoader from "components/tariffInfo/TariffLoader";
import styles from "./coa.module.css";
import {
  getTariffHeaderAsync,
  resetTariffHeaderAsync,
  saveTariffParamAsync,
} from "modules/tariff/actions";
import { TariffParam } from "modules/tariff/types";

interface ContractCoaUpdateModalProps {
  closeModal: any;
  isOpen: boolean;
  updParams: any;
  tariffInfoConditon: any;
  onSubmitTariffInfo: (params: any) => void;
  regiChkFlag:any;
  setRegiChkFlag:any;
}

const ContractCoaUpdateModal = ({
  isOpen,
  closeModal,
  updParams,
  tariffInfoConditon,
  onSubmitTariffInfo,
  regiChkFlag,
  setRegiChkFlag,
}: ContractCoaUpdateModalProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [preActorId, setPreActorId] = useState("");
  const [addMember, setAddMember] = useState<any>([]);
  const [cntrtSaveChkFlag, setCntrtSaveChkFlag] = useState(false);

  const onClickUser = (userId: string) => {
    setPreActorId(userId);
    setContractInfoParamas({
      ...contractInfoParams,
      crePersonId: userId,
    });
  };

  const baseCodeData = useSelector(
    (state: RootState) => state.baseCode.baseCode
  );

  const updCntrtInfoDate = useSelector(
    (state: RootState) => state.updateContractInfo.updateContractInfo
  );

  const nowUserId = localStorage.getItem("userId");
  const nowUserNm = localStorage.getItem("userNm");

  const [contractInfoParams, setContractInfoParamas] = useState({
    cntrtId: updParams.data.cntrt_id,
    cntrtCurrCd: updParams.data.cntrt_curr_cd,
    cntrtNm: updParams.data.cntrt_nm,
    cntrtScd: "60",
    cntrtStartDate: updParams.data.cntrt_start_date,
    cntrtEndDate: updParams.data.cntrt_end_date,
    cntrtTcd: "109031",
    crePersonId: nowUserId, // 담당자 명
    insPersonId: nowUserId,
    updPersonId: nowUserId,
    cntrtTypGcd: "1090",
    cntrtEditComment: "",
  });

  const [openTariffModal, setOpenTariffModal] = useState(false);
  const [openNewTariffModal, setOpenNewTariffModal] = useState(false);

  const tariffData: any = useSelector(
    (state: RootState) => state.tariffInfo.tariffInfo
  );

  const [tariffParams, setTariffParams] = useState<TariffParam>({
    cntrtId: "", // 계약 ID
    trffId: 0, // 타리프 ID
    cntrtStatDate: "",
    cntrtEndDate: "", // 유효기간
    cntrtCurrCd: "", // 계약 통화 코드
  });

  const onClickTariffModal = () => {
    setOpenTariffModal((openTariffModal) => !openTariffModal);
    dispatch(saveTariffParamAsync.request(tariffParams));
    dispatch(
      getTariffHeaderAsync.request({
        cntrtId: tariffParams.cntrtId,
        trffId: tariffParams.trffId,
      })
    );
  };

  const onClickNewTariffModal = () => {
    setOpenNewTariffModal((openTariffModal) => !openTariffModal);
    dispatch(
      saveTariffParamAsync.request({
        ...tariffParams,
        cntrtId: contractInfoParams.cntrtId, // 계약 ID
        cntrtStatDate: contractInfoParams.cntrtStartDate,
        cntrtEndDate: contractInfoParams.cntrtEndDate,
        cntrtCurrCd: contractInfoParams.cntrtCurrCd,
      })
    );
    dispatch(
      resetTariffHeaderAsync.request({
        cntrtId: contractInfoParams.cntrtId,
        trffId: 0,
        trffNm: "",
        trffDesc: "",
        bizTcd: "",
        arApCcd: "",
        svcTcd: "",
        detlSvcTcd: "",
      })
    );
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(baseCodeAsync.request(""));
  }, []);

  useEffect(() => {
    onSubmitTariffInfo(tariffInfoConditon);
  }, [openTariffModal]);

  const onSubmitInsertContractInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contractInfoParams.cntrtEditComment == "") {
      alert("수정 사유를 작성 해주세요.");
    } else {
      dispatch(updateContractCodeAsync.request(contractInfoParams));
      alert("수정이 완료되었습니다.");
      setCntrtSaveChkFlag(true);
      setRegiChkFlag(!regiChkFlag);
    }
  };

  function leftPad(value) {
    if (value >= 10) {
      return value;
    }

    return `0${value}`;
  }

  function toStringByFormatting(source, delimiter = "-") {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());

    return [year, month, day].join(delimiter);
  }

  function stringToDate(date_str) {
    const yyyyMMdd = String(date_str);
    const sYear = yyyyMMdd.substring(0, 4);
    const sMonth = yyyyMMdd.substring(4, 6);
    const sDate = yyyyMMdd.substring(6, 8);

    return new Date(Number(sYear), Number(sMonth) - 1, Number(sDate));
  }
  return (
    <>
      <Modal isOpen={isOpen} toggle={closeModal} size="xl">
        <Container>
          <ModalHeader toggle={closeModal}>
            <ModalTitle>계약 수정</ModalTitle>
          </ModalHeader>
        </Container>
        <ModalBody>
          <Container>
            <div style={{ margin: 4 }}>◎ 계약정보</div>
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
                        id="cntrtTypGcd"
                        name="cntrtTypGcd"
                        type="select"
                        onChange={(e) =>
                          setContractInfoParamas({
                            ...contractInfoParams,
                            [e.target.id]: e.target.value,
                          })
                        }
                        style={{
                          boxShadow: "none",
                          borderRadius: 0,
                        }}
                      >
                        {baseCodeData.data
                          ?.filter((data) => data.cd_tp === "CNTRT_TYP_GCD")
                          .map((option) => (
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
                        id="cntrtNm"
                        name="cntrtNm"
                        defaultValue={updParams.data.cntrt_nm}
                        onChange={(e) =>
                          setContractInfoParamas({
                            ...contractInfoParams,
                            [e.target.id]: e.target.value,
                          })
                        }
                        style={{
                          boxShadow: "none",
                          borderRadius: 0,
                        }}
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
                        id="cntrtTcd"
                        name="cntrtTcd"
                        type="select"
                        onChange={(e) =>
                          setContractInfoParamas({
                            ...contractInfoParams,
                            [e.target.id]: e.target.value,
                          })
                        }
                        style={{
                          boxShadow: "none",
                          borderRadius: 0,
                        }}
                      >
                        <option>공통단가-국제해송 COA</option>
                        <option>----</option>
                        {baseCodeData.data
                          ?.filter((data) => data.cd_tp === "CNTRT_TCD")
                          .map((option) => (
                            <option key={option.cd_v} value={option.cd_v} defaultValue={updParams.data?.cntrt_tcd}>
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
                    <Input
                      type="text"
                      id="cntrtId"
                      name="cntrtId"
                      value={updParams?.data.cntrt_id}
                      disabled
                      style={{
                        boxShadow: "none",
                        borderRadius: 0,
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
                    담당자*
                  </th>
                  <td>
                    <div>
                      <Input
                        id="crePersonId"
                        name="crePersonId"
                        defaultValue={updParams?.data.user_nm}
                        value={addMember[addMember.length - 1]?.userNm}
                        onChange={(e) =>
                          setContractInfoParamas({
                            ...contractInfoParams,
                            [e.target.id]: e.target.value,
                          })
                        }
                        readOnly
                        style={{
                          boxShadow: "none",
                          borderRadius: 0,
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
                        id="cntrtScd"
                        name="cntrtScd"
                        type="select"
                        onChange={(e) =>
                          setContractInfoParamas({
                            ...contractInfoParams,
                            [e.target.id]: e.target.value,
                          })
                        }
                        style={{
                          boxShadow: "none",
                          borderRadius: 0,
                        }}
                      >
                        {baseCodeData.data
                          ?.filter((data) => data.cd_tp === "CNTRT_SCD")
                          .map((option) => (
                            <option
                              key={option.cd_v}
                              value={option.cd_v}
                              selected={option.cd_v_meaning}
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
                          selected={startDate}
                          type="date"
                          id="cntrtStartDate"
                          name="cntrtStartDate"
                          defaultValue={toStringByFormatting(
                            stringToDate(updParams?.data.cntrt_start_date)
                          )}
                          onChange={(e) =>
                            setContractInfoParamas({
                              ...contractInfoParams,
                              [e.target.id]: e.target.value.replaceAll("-", ""),
                            })
                          }
                          style={{
                            boxShadow: "none",
                            borderRadius: 0,
                            display: "span",
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ display: "inline-block" }}>
                      <Input
                        type="date"
                        style={{
                          boxShadow: "none",
                          borderRadius: 0,
                          display: "span",
                        }}
                        id="cntrtEndDate"
                        name="cntrtEndDate"
                        defaultValue={toStringByFormatting(
                          stringToDate(updParams?.data.cntrt_end_date)
                        )}
                        onChange={(e) =>
                          setContractInfoParamas({
                            ...contractInfoParams,
                            [e.target.id]: e.target.value.replaceAll("-", ""),
                          })
                        }
                        selected={endDate}
                      />
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
                        id="cntrtCurrCd"
                        name="cntrtCurrCd"
                        type="select"
                        onChange={(e) =>
                          setContractInfoParamas({
                            ...contractInfoParams,
                            [e.target.id]: e.target.value,
                          })
                        }
                        style={{
                          boxShadow: "none",
                          borderRadius: 0,
                        }}
                      >
                        <option selected>{updParams.data.cntrt_curr_cd}</option>
                        {baseCodeData.data
                          ?.filter((data) => data.cd_tp === "CURR_CD")
                          .map((option) => (
                            <option key={option.cd_v} value={option.cd_v}>
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
                        type="textarea"
                        id="cntrtEditComment"
                        name="cntrtEditComment"
                        onChange={(e) =>
                          setContractInfoParamas({
                            ...contractInfoParams,
                            [e.target.id]: e.target.value,
                          })
                        }
                        style={{
                          boxShadow: "none",
                          borderRadius: 0,
                        }}
                      />
                    </div>
                  </td>
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
              <Form
                className="ContractInfoForm"
                onSubmit={onSubmitInsertContractInfo}
                style={{ margin: 0, padding: 0, float: "right" }}
              >
                <Button
                  outline
                  className="btn"
                  size="sm"
                  style={{ margin: 0, padding: 0, width: 50 }}
                >
                  수정
                </Button>
              </Form>
            </div>
          </Container>

          <Container id="tariffList">
            <div
              style={{
                maxHeight: "600px",
                overflowY: "auto",
              }}
            >
              <Table striped hover bordered>
                <thead style={{ textAlign: "center" }}>
                  <tr className="table-secondary">
                    <th></th>
                    <th>타리프 ID</th>
                    <th>타리프설명</th>
                    <th>사업유형</th>
                    <th>서비스유형</th>
                    <th>상세서비스유형</th>
                    <th>등록일</th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {tariffData.data?.map((data, index) => (
                      <tr
                        key={index}
                        aria-rowcount={index}
                        onMouseDown={(e) => {
                          setTariffParams({
                            ...tariffParams,
                            cntrtId: contractInfoParams.cntrtId, // 계약 ID
                            trffId: data.trff_id, // 타리프 ID
                            cntrtStatDate: contractInfoParams.cntrtStartDate,
                            cntrtEndDate: contractInfoParams.cntrtEndDate,
                            cntrtCurrCd: contractInfoParams.cntrtCurrCd,
                          });
                        }}
                        onClick={onClickTariffModal}
                      >
                        <th scope="row">
                          <Input type="checkbox" />
                        </th>
                        <td style={{ padding: 10 }}>{data.trff_nm}</td>
                        <td style={{ padding: 10 }}>{data.trff_desc}</td>
                        <td style={{ padding: 10 }}>{data.biz_nm}</td>
                        <td style={{ padding: 10 }}>{data.svc_nm}</td>
                        <td style={{ padding: 10 }}>
                          {data.detl_svc_tcd} - {data.svc_nm}
                        </td>
                        <td style={{ padding: 10 }}>{data.ins_date}</td>
                        {openTariffModal && (
                          <TariffLoader
                            isOpen={openTariffModal}
                            closeModal={() => {
                              setOpenTariffModal(
                                (openTariffModal) => !openTariffModal
                              );
                              onSubmitTariffInfo(tariffInfoConditon);
                            }}
                          />
                        )}
                      </tr>
                    ))}
                  </>
                </tbody>
              </Table>
            </div>
            <div
              style={{
                margin: "10px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {cntrtSaveChkFlag ? (
                <Button
                  outline
                  className="btn"
                  size="sm"
                  style={{ margin: 0, padding: 0, width: 50 }}
                  onClick={onClickNewTariffModal}
                >
                  추가
                </Button>
              ) : (
                <Button
                  outline
                  className="btn"
                  size="sm"
                  style={{ margin: 0, padding: 0, width: 50 }}
                  onClick={() => {
                    alert("계약 수정을 저장해주세요.");
                  }}
                >
                  추가
                </Button>
              )}

              {openNewTariffModal && (
                <TariffLoader
                  isOpen={openNewTariffModal}
                  closeModal={() => {
                    setOpenNewTariffModal(
                      (openNewTariffModal) => !openNewTariffModal
                    );
                    onSubmitTariffInfo(tariffInfoConditon);
                  }}
                />
              )}
            </div>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ContractCoaUpdateModal;
