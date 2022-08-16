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
import { TariffInfoParam } from "modules/tariff/types";

interface ContractCoaUpdateModalProps {
  closeModal: any;
  isOpen: boolean;
  updParams: any;
  tariffData: any;
}

const ContractCoaUpdateModal = ({
  isOpen,
  closeModal,
  updParams,
  tariffData,
}: ContractCoaUpdateModalProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [preActorId, setPreActorId] = useState("");
  const [addMember, setAddMember] = useState<any>([]);
  const [openTariffModal, setOpenTariffModal] = useState(false);

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

  const [contractInfoParams, setContractInfoParamas] = useState({
    cntrtId: updParams.data.cntrt_id,
    cntrtCurrCd: "USD",
    cntrtNm: updParams.data.cntrt_nm,
    cntrtScd: "60",
    cntrtStartDate: updParams.data.cntrt_start_date,
    cntrtEndDate: updParams.data.cntrt_end_date,
    cntrtTcd: "109031",
    crePersonId: preActorId, // 담당자 명
    insPersonId: preActorId,
    updPersonId: addMember[addMember.length - 1]?.userId,
    cntrtTypGcd: "1090",
    cntrtEditComment: "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(baseCodeAsync.request(""));
  }, []);

  const onSubmitInsertContractInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("update");
    if (contractInfoParams.cntrtEditComment == "") {
      alert("수정 사유를 작성 해주세요.");
    } else {
      dispatch(updateContractCodeAsync.request(contractInfoParams));
      alert("수정이 완료되었습니다.");
      closeModal();
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

  const [tariffParams, setTariffParams] = useState<TariffInfoParam>({
    cntrtId: "", // 계약 ID
    trffNm: "", // 타리프 NM
    trffDesc: "", // 타리프 설명
    bizTcd: "", //사업유형코드 (사업영역코드는 뭐징?)
    arApCcd: "", // 매출매입구분코드
    svcTcd: "", // 서비스유형코드
    detlSvcTcd: "", // 상세서비스유형
  });

  console.log("tariffData>>>>", tariffData);
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
                    defaultValue={updParams.data.cntrt_nm}
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
                  <span>{updParams?.data.cntrt_id}</span>
                </td>
                <th>담당자*</th>
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
                    {baseCodeData.data?.slice(0, 2).map((option) => (
                      <option
                        key={option.cd_v}
                        value={option.cd_v}
                        selected={option.cd_v_meaning}
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
                      defaultValue={toStringByFormatting(
                        stringToDate(updParams?.data.cntrt_start_date)
                      )}
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
                  />
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
                        수정
                      </Button>
                    </div>
                  </Form>
                </td>
              </tr>
            </Table>
          </Container>

          <Container>
            <Table striped hover bordered>
              <thead style={{ textAlign: "center" }}>
                <tr>
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
                  {tariffData?.map((data, index) => (
                    <tr
                      key={index}
                      aria-rowcount={index}
                      onMouseDown={(e) => {
                        setTariffParams({
                          ...tariffParams,
                          cntrtId: data.cntrtId, // 계약 ID
                          trffNm: data.trff_nm, // 타리프 NM
                          trffDesc: data.trff_desc, // 타리프 설명
                          bizTcd: data.biz_nm, //사업유형코드 (사업영역코드는 뭐징?)
                          arApCcd: "AP", // 매출매입구분코드
                          svcTcd: data.svc_nm, // 서비스유형코드
                          detlSvcTcd: data.detl_svc_nm, // 상세서비스유형
                        });
                      }}
                      onClick={() => {
                        setOpenTariffModal(
                          (openTariffModal) => !openTariffModal
                        );
                      }}
                    >
                      <th scope="row">
                        <Input type="checkbox" />
                      </th>
                      <td style={{ padding: 30 }}>{data.trff_nm}</td>
                      <td style={{ padding: 30 }}>{data.trff_desc}</td>
                      <td style={{ padding: 30 }}>{data.biz_nm}</td>
                      <td style={{ padding: 30 }}>{data.svc_nm}</td>
                      <td style={{ padding: 30 }}>
                        {data.detl_svc_tcd} - {data.svc_nm}
                      </td>
                      <td style={{ padding: 30 }}>{data.ins_date}</td>
                      {openTariffModal && (
                        <TariffLoader
                          isOpen={openTariffModal}
                          closeModal={() =>
                            setOpenTariffModal(
                              (openTariffModal) => !openTariffModal
                            )
                          }
                          tariffParams={tariffParams}
                        />
                      )}
                    </tr>
                  ))}
                </>
              </tbody>
            </Table>
            {/* <Table bordered>
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
              >
                추가
              </Button>
            </div> */}
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ContractCoaUpdateModal;
