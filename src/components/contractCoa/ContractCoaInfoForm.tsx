import React, { FormEvent, useState, ChangeEvent, useEffect } from "react";
import { Button, Input, Form, Table } from "reactstrap";

import DatePicker from "react-datepicker";
import { RootState } from "modules";
import { NonceProvider } from "react-select";
import ContractCoaRegisterModal from "./ContractCoaRegisterModal";
import ContractChangeInfoModal from "./ContractChangeInfoModal";
import { baseCodeAsync } from "modules/contractCoa/action";
import { useDispatch, useSelector } from "react-redux";
import { baseCode } from "modules/contractCoa/reducer";
import TariffLoader from "components/tariffInfo/TariffLoader";
import { TariffInfoParam } from "modules/tariff/types";
import ContractCoaUpdateModal from "./ContractCoaUpdateModal";
import ContractCoaCopyModal from "./ContractCoaCopyModal";

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
    },
  });

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

  const [openTariffModal, setOpenTariffModal] = useState(false);

  const [tariffParams, setTariffParams] = useState<TariffInfoParam>({
    cntrtId: "", // 계약 ID
    trffNm: "", // 타리프 NM
    trffDesc: "", // 타리프 설명
    bizTcd: "", //사업유형코드 (사업영역코드는 뭐징?)
    arApCcd: "", // 매출매입구분코드
    svcTcd: "", // 서비스유형코드
    detlSvcTcd: "", // 상세서비스유형
  });

  const dateToString = (date) => {
    return (
      date.getFullYear() +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      date.getDate().toString().padStart(2, "0")
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
    onSubmitDelContractCoaInfo(tariffInfoConditon.cntrtId);
    alert("삭제되었습니다.");
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
          marginTop: 0,
          marginRight: 30,
          marginBottom: 15,
          marginLeft: 30,
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
            />
          )}
          <Button
            outline
            style={{ margin: 3 }}
            size="sm"
            onClick={() => {
              setCntrtUpdModal((cntrtUpdModal) => !cntrtUpdModal);
            }}
          >
            계약수정
          </Button>
          {cntrtUpdModal && (
            <ContractCoaUpdateModal
              isOpen={cntrtUpdModal}
              closeModal={() =>
                setCntrtUpdModal((cntrtUpdModal) => !cntrtUpdModal)
              }
              updParams={updParams}
              tariffData={tariffData.data}
            />
          )}
          <Button
            outline
            style={{ margin: 3 }}
            size="sm"
            onClick={() => {
              setCntrtCopyModal((cntrtCopyModal) => !cntrtCopyModal);
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
        <div>
          <Table bordered>
            <tbody>
              <tr>
                <td
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ced6e0",
                    margin: 1,
                  }}
                >
                  물류법인
                </td>
                <td>
                  <span>POSCO ICT</span>
                </td>
                <td
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ced6e0",
                    margin: 1,
                  }}
                >
                  계약일자
                </td>
                <td>
                  <div>
                    <Input
                      type="date"
                      style={{
                        display: "span",
                        boxShadow: "none",
                        borderRadius: 0,
                      }}
                      flexedHeight
                      dateFormat="MM/dd/yyyy"
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
                <td
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ced6e0",
                    margin: 1,
                  }}
                >
                  계약상태
                </td>
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
                <td
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ced6e0",
                    margin: 1,
                  }}
                >
                  계약ID
                </td>
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
                <td
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ced6e0",
                    margin: 1,
                  }}
                >
                  계약명
                </td>
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
                <td
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ced6e0",
                    margin: 1,
                  }}
                >
                  서비스유형
                </td>
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
                <td
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ced6e0",
                    margin: 1,
                  }}
                >
                  상세 서비스유형
                </td>
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
            maxHeight: "400px",
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
            margin: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: "bold", color: "#003366" }}>
            ◎ 타리프 정보
          </div>
        </div>
        <div
          style={{
            maxHeight: "400px",
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
                        trffNm: data.trff_nm, // 타리프 NM
                        trffDesc: data.trff_desc, // 타리프 설명
                        bizTcd: data.biz_nm, //사업유형코드 (사업영역코드는 뭐징?)
                        arApCcd: "AP", // 매출매입구분코드
                        svcTcd: data.svc_nm, // 서비스유형코드
                        detlSvcTcd: data.detl_svc_nm, // 상세서비스유형
                      });
                    }}
                    onClick={() => {
                      setOpenTariffModal((openTariffModal) => !openTariffModal);
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
        </div>
      </div>
    </>
  );
};

export default ContractCoaInfoForm;
