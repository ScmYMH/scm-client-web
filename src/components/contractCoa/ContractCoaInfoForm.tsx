import React, { FormEvent, useState, ChangeEvent } from "react";
import { Button, Input, Form, Table } from "reactstrap";
import ContractCoaRegisterModal from "./ContractCoaRegisterModal";
import ContractChangeInfoModal from "./ContractChangeInfoModal";
import { useDispatch } from "react-redux";
import TariffLoader from "components/tariffInfo/TariffLoader";
import {
  getTariffHeaderAsync,
  saveTariffParamAsync,
} from "modules/tariff/actions";
import { TariffParam } from "modules/tariff/types";
import ContractCoaCopyModal from "./ContractCoaCopyModal";
import ContractCoaUpdateModal from "./ContractCoaUpdateModal";

interface onSubmitContractInfoProps {
  onSubmitContractCoaInfo: (params: any) => void;
  onSubmitTariffInfo: (params: any) => void;
  onSubmitDelContractCoaInfo: (params: any) => void;
  contractInfodata: any;
  tariffData: any;
}
export interface DesignProps {
  id: string;
  name: string;
  type: string;
}
const ContractCoaInfoForm = ({
  onSubmitContractCoaInfo,
  onSubmitTariffInfo,
  contractInfodata,
  tariffData,
  onSubmitDelContractCoaInfo,
}: onSubmitContractInfoProps) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [cntrtRegisterModal, setCntrtRegisterOpenModal] = useState(false);
  const [cntrtUpdModal, setCntrtUpdModal] = useState(false);
  const [cntrtCopyModal, setCntrtCopyModal] = useState(false);

  const [contractChangeInfoModal, setContractChangeInfoModal] = useState(false);
  const [params, setParmas] = useState({
    cntrtId: "",
    cntrtNm: "",
    insDate: "",
    cdvMeaning: "",
  });

  const [updParams, setUpdParmas] = useState({
    data: {
      cntrtId: "",
      cntrtNm: "",
      insDate: "",
      cdvMeaning: "",
      ins_person_id: "",
      user_nm: "",
    },
  });

  const nowUserId = localStorage.getItem("userId");
  const nowUserNm = localStorage.getItem("userNm");

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [tariffInfoConditon, setTariffInfoConditon] = useState({
    cntrtId: "",
    svcNm: "",
    detlSvcNm: "",
  });

  const contractStateOptions = [
    { value: "", text: "전체" },
    { value: "Termination", text: "Termination" },
    { value: "Validity", text: "Validity" },
  ];

  const serviceOptions = [
    { value: "", text: "전체" },
    { value: "공로운송", text: "공로운송" },
    { value: "하역", text: "하역" },
    { value: "해상운송", text: "해상운송" },
  ];

  const detailServiceOptions = [
    { value: "", text: "전체" },
    { value: "공로운송", text: "공로운송" },
    { value: "연안해송", text: "연안해송" },
    { value: "수출해송", text: "수출해송" },
  ];

  const dateToString = (date) => {
    return (
      date.getFullYear() +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      date.getDate().toString().padStart(2, "0")
    );
  };

  const [openTariffModal, setOpenTariffModal] = useState(false);

  const [tariffParams, setTariffParams] = useState<TariffParam>({
    cntrtId: "", // 계약 ID
    trffId: 0, // 타리프 ID
    cntrtStatDate: "",
    cntrtEndDate: "", // 유효기간
    cntrtCurrCd: "", // 계약 통화 코드
  });

  const onClickTariffModal = () => {
    setOpenTariffModal((openTariffModal) => !openTariffModal);
    console.log("tariffParams : ", tariffParams);
    dispatch(saveTariffParamAsync.request(tariffParams));
    dispatch(
      getTariffHeaderAsync.request({
        cntrtId: tariffParams.cntrtId,
        trffId: tariffParams.trffId,
      })
    );
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setParmas({ ...params, [e.target.id]: e.target.value });
  };

  const onSubmitContractInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitContractCoaInfo(params);
    tariffData.data = [];
  };

  const onSubmitDeleteContractInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      nowUserId == updParams.data.ins_person_id ||
      nowUserNm == updParams.data.user_nm
    ) {
      onSubmitDelContractCoaInfo(tariffInfoConditon.cntrtId);
      alert("삭제되었습니다.");
    } else {
      alert("계약 담당자만 삭제 할 수 있습니다.");
    }
  };

  const checkOnlyOne = (checkThis) => {
    const checkboxes = document.getElementsByName("cntrtId") as any | null;

    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      }
    }
  };

  return (
    <>
      <div
        style={{
          marginTop: 30,
          marginRight: 30,
          marginBottom: 15,
          marginLeft: 30,
          height: 800,
        }}
      >
        <div
          style={{
            margin: "5px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Form
            style={{ margin: 3 }}
            onSubmit={onSubmitContractInfo}
            className="ContractInfoForm"
          >
            <Button size="sm" outline>
              조회
            </Button>
          </Form>
          <Button
            outline
            style={{ margin: 3 }}
            className="btn"
            size="sm"
            onClick={() => {
              setCntrtRegisterOpenModal(
                (cntrtRegisterModal) => !cntrtRegisterModal
              );
            }}
          >
            신규등록
          </Button>
          {cntrtRegisterModal && (
            <ContractCoaRegisterModal
              isOpen={cntrtRegisterModal}
              closeModal={() =>
                setCntrtRegisterOpenModal(
                  (cntrtRegisterModal) => !cntrtRegisterModal
                )
              }
              tariffInfoConditon={tariffInfoConditon}
            />
          )}
          <Button
            outline
            style={{ margin: 3 }}
            size="sm"
            onClick={() => {
              if (isChecked === true) {
                if (
                  nowUserId == updParams.data.ins_person_id ||
                  nowUserNm == updParams.data.user_nm
                ) {
                  setCntrtUpdModal((cntrtUpdModal) => !cntrtUpdModal);
                } else {
                  alert("계약 담당자만 수정할 수 있습니다.");
                }
              } else {
                alert("수정하고자 하는 계약을 체크 해주세요.");
              }
            }}
          >
            계약수정
          </Button>
          {cntrtUpdModal && (
            <ContractCoaUpdateModal
              isOpen={cntrtUpdModal}
              closeModal={() => {
                setCntrtUpdModal((cntrtUpdModal) => !cntrtUpdModal);
              }}
              updParams={updParams}
              tariffData={tariffData.data}
            />
          )}
          <Button
            outline
            style={{ margin: 3 }}
            size="sm"
            onClick={() => {
              if (isChecked === true) {
                setCntrtCopyModal((cntrtCopyModal) => !cntrtCopyModal);
              } else {
                alert("복사하고자 하는 계약을 체크 해주세요.");
              }
            }}
          >
            계약복사
          </Button>
          {cntrtCopyModal && (
            <ContractCoaCopyModal
              isOpen={cntrtCopyModal}
              closeModal={() =>
                setCntrtCopyModal((cntrtCopyModal) => !cntrtCopyModal)
              }
              updParams={updParams}
              tariffData={tariffData.data}
            />
          )}
          <Button
            outline
            style={{ margin: 3 }}
            size="sm"
            type="submit"
            onClick={() => {
              setContractChangeInfoModal(
                (contractChangeInfoModal) => !contractChangeInfoModal
              );
            }}
          >
            계약변경이력
          </Button>

          {contractChangeInfoModal && (
            <ContractChangeInfoModal
              isOpen={contractChangeInfoModal}
              closeModal={() =>
                setContractChangeInfoModal(
                  (contractChangeInfoModal) => !contractChangeInfoModal
                )
              }
              updParams={updParams}
            />
          )}
          <Form
            style={{ margin: 3 }}
            className="ContractInfoForm"
            onSubmit={onSubmitDeleteContractInfo}
          >
            <Button outline size="sm">
              계약 삭제
            </Button>
          </Form>
        </div>
        <div style={{ marginTop: 30 }}>
          <Table bordered>
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
                  <span>POSCO ICT</span>
                </td>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ced6e0",
                    margin: 1,
                  }}
                >
                  계약일자
                </th>
                <td>
                  <div>
                    <Input
                      type="date"
                      style={{
                        display: "span",
                        boxShadow: "none",
                        borderRadius: 0,
                      }}
                      selected={date}
                      id="insDate"
                      name="insDate"
                      onChange={(e) => {
                        setParmas({
                          ...params,
                          [e.target.id]: e.target.value.replaceAll("-", ""),
                        });
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
                  계약상태
                </th>
                <td colSpan={3}>
                  <div>
                    <Input
                      onChange={(e) =>
                        setParmas({ ...params, [e.target.id]: e.target.value })
                      }
                      id="cdvMeaning"
                      name="cdvMeaning"
                      type="select"
                      style={{
                        boxShadow: "none",
                        borderRadius: 0,
                      }}
                    >
                      {contractStateOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.text}
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
                  계약ID
                </th>
                <td>
                  <div>
                    <Input
                      type="text"
                      onChange={onChange}
                      id="cntrtId"
                      style={{
                        boxShadow: "none",
                        borderRadius: 0,
                      }}
                    ></Input>
                  </div>
                </td>
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
                      type="text"
                      onChange={onChange}
                      id="cntrtNm"
                      style={{
                        boxShadow: "none",
                        borderRadius: 0,
                      }}
                    ></Input>
                  </div>
                </td>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ced6e0",
                    margin: 1,
                  }}
                >
                  서비스유형
                </th>
                <td>
                  <div>
                    <Input
                      onChange={(e) =>
                        setTariffInfoConditon({
                          ...tariffInfoConditon,
                          [e.target.id]: e.target.value,
                        })
                      }
                      id="svcNm"
                      name="svcNm"
                      type="select"
                      style={{
                        boxShadow: "none",
                        borderRadius: 0,
                      }}
                    >
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.text}
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
                  상세 서비스유형
                </th>
                <td>
                  <div>
                    <Input
                      onChange={(e) =>
                        setTariffInfoConditon({
                          ...tariffInfoConditon,
                          [e.target.id]: e.target.value,
                        })
                      }
                      type="select"
                      id="detlSvcNm"
                      name="detlSvcNm"
                      style={{
                        boxShadow: "none",
                        borderRadius: 0,
                      }}
                    >
                      {detailServiceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </Input>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div
          style={{
            margin: "10px",
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: "bold", color: "#003366" }}>◎ 계약목록</div>
        </div>
        <div
          style={{
            maxHeight: "40%",
            overflowY: "auto",
          }}
        >
          <Table striped hover bordered>
            <thead style={{ textAlign: "center" }}>
              <tr className="table-secondary">
                <th style={{ paddingBottom: 25 }} rowSpan={2}></th>
                <th style={{ paddingBottom: 25 }} rowSpan={2}>
                  계약명
                </th>
                <th style={{ paddingBottom: 25 }} rowSpan={2}>
                  계약상태
                </th>
                <th colSpan={2}>기간</th>
                <th style={{ paddingBottom: 25 }} rowSpan={2}>
                  담당자
                </th>
                <th style={{ paddingBottom: 25 }} rowSpan={2}>
                  계약 ID
                </th>
              </tr>
              <tr className="table-secondary">
                <th>시작</th>
                <th>마감</th>
              </tr>
            </thead>
            <tbody>
              <>
                {contractInfodata?.map((data, index) => (
                  <tr key={index} aria-rowcount={index}>
                    <th scope="row" style={{ textAlign: "center", width: 50 }}>
                      <Input
                        type="checkbox"
                        value={data}
                        id="cntrtId"
                        name="cntrtId"
                        onChange={(e) => {
                          checkOnlyOne(e.target);
                          setIsChecked(true);
                          setUpdParmas({
                            ...updParams,
                            data: data,
                          });
                        }}
                        onMouseDown={(e) => {
                          setTariffInfoConditon({
                            ...tariffInfoConditon,
                            cntrtId: data.cntrt_id,
                          });
                        }}
                        onClick={() => {
                          onSubmitTariffInfo(tariffInfoConditon);
                        }}
                      />
                    </th>
                    <td
                      style={{ padding: 30 }}
                      onMouseDown={(e) => {
                        setTariffInfoConditon({
                          ...tariffInfoConditon,
                          cntrtId: data.cntrt_id,
                        });
                        setTariffParams({
                          ...tariffParams,
                          cntrtStatDate: data.cntrt_start_date,
                          cntrtEndDate: data.cntrt_end_date,
                          cntrtCurrCd: data.cntrt_curr_cd,
                        });
                      }}
                      onClick={() => {
                        onSubmitTariffInfo(tariffInfoConditon);
                      }}
                    >
                      {data.cntrt_nm}
                    </td>
                    <td
                      style={{ padding: 30 }}
                      onMouseDown={(e) => {
                        setTariffInfoConditon({
                          ...tariffInfoConditon,
                          cntrtId: data.cntrt_id,
                        });
                        setTariffParams({
                          ...tariffParams,
                          cntrtStatDate: data.cntrt_start_date,
                          cntrtEndDate: data.cntrt_end_date,
                          cntrtCurrCd: data.cntrt_curr_cd,
                        });
                      }}
                      onClick={() => {
                        onSubmitTariffInfo(tariffInfoConditon);
                      }}
                    >
                      {data.cd_v_meaning}
                    </td>
                    <td
                      style={{ padding: 30 }}
                      onMouseDown={(e) => {
                        setTariffInfoConditon({
                          ...tariffInfoConditon,
                          cntrtId: data.cntrt_id,
                        });
                        setTariffParams({
                          ...tariffParams,
                          cntrtStatDate: data.cntrt_start_date,
                          cntrtEndDate: data.cntrt_end_date,
                          cntrtCurrCd: data.cntrt_curr_cd,
                        });
                      }}
                      onClick={() => {
                        onSubmitTariffInfo(tariffInfoConditon);
                      }}
                    >
                      {data.cntrt_start_date}
                    </td>
                    <td style={{ padding: 30 }}>{data.cntrt_end_date}</td>
                    <td style={{ padding: 30 }}>{data.user_nm}</td>
                    <td style={{ padding: 30 }}>{data.cntrt_id}</td>
                  </tr>
                ))}
              </>
            </tbody>
          </Table>
        </div>
        <div
          style={{
            margin: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: "bold", color: "#003366", marginTop: 30 }}>
            ◎ 타리프 정보
          </div>
        </div>
        <div
          style={{
            position: "relative",
            maxHeight: "200px",
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
                        cntrtId: tariffInfoConditon.cntrtId, // 계약 ID
                        trffId: data.trff_id, // 타리프 ID
                      });
                    }}
                    onClick={onClickTariffModal}
                  >
                    <th scope="row">
                      <Input type="checkbox" />
                    </th>
                    <td style={{ padding: 30 }}>{data.trff_nm}</td>
                    <td style={{ padding: 30 }}>{data.trff_desc}</td>
                    <td style={{ padding: 30 }}>{data.biz_nm}</td>
                    <td style={{ padding: 30 }}>{data.svc_nm}</td>
                    <td style={{ padding: 30 }}>
                      {data.detl_svc_tcd}-{data.detl_svc_nm}
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
                      />
                    )}
                  </tr>
                ))}
              </>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ContractCoaInfoForm;
