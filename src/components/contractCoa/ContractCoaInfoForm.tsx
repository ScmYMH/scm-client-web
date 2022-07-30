import React, { FormEvent, useState, ChangeEvent, useEffect } from "react";
import {
  Button,
  ButtonDropdown,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Form,
  Label,
  Table,
} from "reactstrap";

import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { RootState } from "modules";

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
  const [flag, setFlag] = useState(false);

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

  const dateToString = (date) => {
    return (
      date.getFullYear() +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      date.getDate().toString().padStart(2, "0")
    );
  };

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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setParmas({ ...params, [e.target.id]: e.target.value });
  };

  const onSubmitContractInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitContractCoaInfo(params);
  };

  const onChangeValidDate = (date: Date) => {
    setDate(date);
    setParmas({
      ...params,
      insDate: dateToString(date),
    });
  };

  // const clickRow = (id) => {
  //   setTariffInfoConditon({
  //     ...tariffInfoConditon,
  //     cntrtId: id,
  //   });
  //   onSubmitTariffInfo(tariffInfoConditon);
  // };
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
          <Form onSubmit={onSubmitContractInfo} className="ContractInfoForm">
            <Button size="sm">조회</Button>
          </Form>
          <Button size="sm">신규등록</Button>
          <Button size="sm">계약수정</Button>
          <Button size="sm">계약복사</Button>
        </div>
        <Table bordered>
          <tr>
            <td>물류법인</td>
            <td>
              <span>POSCO ICT</span>
            </td>
            <td>계약일자</td>
            <td>
              <DatePicker
                style={{ display: "span" }}
                flexedHeight
                dateFormat="MM/dd/yyyy"
                selected={date}
                id="insDate"
                onChange={(date: Date) => onChangeValidDate(date)}
              />
            </td>
            <td>계약상태</td>
            <td colSpan={2}>
              <select
                onChange={(e) =>
                  setParmas({ ...params, [e.target.id]: e.target.value })
                }
                id="cdvMeaning"
                name="cdvMeaning"
              >
                {contractStateOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
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
              <select
                onChange={(e) =>
                  setTariffInfoConditon({
                    ...tariffInfoConditon,
                    [e.target.id]: e.target.value,
                  })
                }
                id="svcNm"
                name="svcNm"
              >
                {serviceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </td>
            <td>상세 서비스유형</td>
            <td>
              <select
                onChange={(e) =>
                  setTariffInfoConditon({
                    ...tariffInfoConditon,
                    [e.target.id]: e.target.value,
                  })
                }
                id="detlSvcNm"
                name="detlSvcNm"
              >
                {detailServiceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
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
                    console.log(tariffInfoConditon);
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
                  <td style={{ padding: 30 }}>{data.detl_svc_nm}</td>
                  <td style={{ padding: 30 }}>{data.ins_date}</td>
                </tr>
              ))}
            </>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ContractCoaInfoForm;
