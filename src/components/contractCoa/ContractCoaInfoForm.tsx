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
import ContractCoaUpdateModal from "./ContractCoaUpdateModal";
import ContractCoaCopyModal from "./ContractCoaCopyModal";

interface onSubmitContractInfoProps {
  onSubmitContractCoaInfo: (params: any) => void;
  onSubmitTariffInfo: (params: any) => void;
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
            <Button size="sm">조회</Button>
          </Form>
          <Button
            style={{ margin: 3 }}
            className="btn"
            size="sm"
            onClick={() => {
              setCntrtRegisterOpenModal((cntrtRegisterModal) => !cntrtRegisterModal);
            }}
          >
            신규등록
          </Button>
          {cntrtRegisterModal && (
            <ContractCoaRegisterModal
              isOpen={cntrtRegisterModal}
              closeModal={() => setCntrtRegisterOpenModal((cntrtRegisterModal) => !cntrtRegisterModal)}
            />
          )}
          <Button
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
              closeModal={() => setCntrtUpdModal((cntrtUpdModal) => !cntrtUpdModal)}
              updParams={updParams}
            />
          )}
          <Button style={{ margin: 3 }} size="sm" onClick={() => {
              setCntrtCopyModal((cntrtCopyModal) => !cntrtCopyModal);
            }}>
            계약복사
          </Button>
          {cntrtCopyModal && (
            <ContractCoaCopyModal
              isOpen={cntrtCopyModal}
              closeModal={() => setCntrtCopyModal((cntrtCopyModal) => !cntrtCopyModal)}
              updParams={updParams}
            />
          )}
          <Button
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
        </div>

        <Table bordered>
          <tr>
            <td>물류법인</td>
            <td>
              <span>POSCO ICT</span>
            </td>
            <td>계약일자</td>
            <td>
              <Input
                type="date"
                style={{ display: "span" }}
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
            </td>
            <td>계약상태</td>
            <td colSpan={3}>
              <Input
                onChange={(e) =>
                  setParmas({ ...params, [e.target.id]: e.target.value })
                }
                id="cdvMeaning"
                name="cdvMeaning"
                type="select"
              >
                {contractStateOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </Input>
            </td>
          </tr>
          <tr>
            <td>계약ID</td>
            <td>
              <Input type="text" onChange={onChange} id="cntrtId"></Input>
            </td>
            <td>계약명</td>
            <td>
              <Input type="text" onChange={onChange} id="cntrtNm"></Input>
            </td>
            <td>서비스유형</td>
            <td>
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
              >
                {serviceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </Input>
            </td>
            <td>상세 서비스유형</td>
            <td>
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
              >
                {detailServiceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </Input>
            </td>
          </tr>
        </Table>
        <div
          style={{
            margin: "10px",
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>계약목록</div>
        </div>
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          <Table striped hover bordered>
            <thead style={{ textAlign: "center" }}>
              <tr>
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
              <tr>
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
                          setIsChecked(true);
                          // onChangeCheck(e, data.cntrt_id);
                          setUpdParmas({
                            ...updParams,
                            data: data,
                          });
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
          <div>타리프 정보</div>
        </div>
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
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
                {tariffData.data?.map((data, index) => (
                  <tr key={index} aria-rowcount={index}>
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
