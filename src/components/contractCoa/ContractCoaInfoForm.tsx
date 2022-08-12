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

interface onSubmitContractInfoProps {
  onSubmitContractCoaInfo: (params: any) => void;
  onSubmitTariffInfo: (params: any) => void;
  contractInfodata: any;
  tariffData: any;
}

const ContractCoaInfoForm = ({
  onSubmitContractCoaInfo,
  onSubmitTariffInfo,
  contractInfodata,
  tariffData,
}: onSubmitContractInfoProps) => {
  const [date, setDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [contractChangeInfoModal, setContractChangeInfoModal] = useState(false);

  const [params, setParmas] = useState({
    cntrtId: "",
    cntrtNm: "",
    insDate: "",
    cdvMeaning: "",
  });

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

  const onChangeValidDate = (date: Date) => {
    setDate(date);
    setParmas({
      ...params,
      insDate: dateToString(date),
    });
  };

  return (
    <>
      <div style={{ margin: 30 }}>
        <div
          style={{
            margin: "10px",
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
              setOpenModal((openModal) => !openModal);
            }}
          >
            신규등록
          </Button>

          {openModal && (
            <ContractCoaRegisterModal
              isOpen={openModal}
              closeModal={() => setOpenModal((openModal) => !openModal)}
            />
          )}
          <Button style={{ margin: 3 }} size="sm">
            계약수정
          </Button>
          <Button style={{ margin: 3 }} size="sm">
            계약복사
          </Button>
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
            <td colSpan={2}>
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
                  <tr
                    key={index}
                    aria-rowcount={index}
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
                    <td style={{ padding: 30 }}>{data.cntrt_nm}</td>
                    <td style={{ padding: 30 }}>{data.cd_v_meaning}</td>
                    <td style={{ padding: 30 }}>{data.cntrt_start_date}</td>
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
                    <td style={{ padding: 30 }}>{data.detl_svc_nm}</td>
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
