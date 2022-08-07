import { useState } from "react";
import { Button, Input, Table } from "reactstrap";

const TariffHeaderForm = () => {
  const [params, setParams] = useState({
    cntrtId: "", // 계약 ID -> 계약 ID를 클릭했을 떄 타리프 창이 뜨기 때문에 그 계약 ID 값 가져오기
    trffNm: "", // 타리프 ID
    trffDesc: "", // 타리프 설명
    bizTcd: "", //사업유형코드 (사업영역코드는 뭐징?)
    arApCcd: "", // 매출매입구분코드
    svcTcd: "", // 서비스유형코드
    detlSvcTcd: "", // 상세서비스유형
  });

  const bizTcdLov = [
    { value: "", text: "" },
    { value: "EX", text: "수출" },
    { value: "LD", text: "역내판매운송" },
  ];

  const arApCcdLov = [
    { value: "", text: "" },
    { value: "AR", text: "매출" },
    { value: "AP", text: "매입" },
  ];

  const svcTcdLov = [
    { value: "", text: "" },
    { value: "ROAD", text: "공로운송" },
    { value: "VSL", text: "해상운송" },
  ];

  const detlSvcTcdLov = [
    { value: "", text: "" },
    { value: "ICV", text: "ICV-국제해송(COA)" },
    { value: "NTR", text: "NTR-일반공로운송(주문기준)" },
  ];

  const onClickHeaderSave = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (params.bizTcd === "") {
      alert("사업지역을 선택해주세요");
    } else if (params.arApCcd === "") {
      alert("매입/매출을 선택해주세요");
    } else if (params.trffDesc === "") {
      alert("타리프 설명을 기입해주세요");
    } else if (params.svcTcd === "") {
      alert("서비스유형을 선택해주세요");
    } else if (params.detlSvcTcd === "") {
      alert("상세 서비스유형을 선택해주세요");
    } else {
      setParams({
        ...params,
        trffNm:
          "ALL_" + params.bizTcd + "_" + params.svcTcd + "_" + params.arApCcd,
      });
    }
  };

  return (
    <div style={{ marginLeft: 20, marginRight: 20 }}>
      <div
        style={{
          margin: "10px",
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4>타리프 헤더정보</h4>
        <Button
          size="sm"
          onClick={(e) => {
            onClickHeaderSave(e);
          }}
        >
          저장
        </Button>
      </div>
      <Table bordered>
        <tr>
          <th colSpan={1} style={{ paddingLeft: 10, paddingRight: 10 }}>
            타리프 ID
          </th>
          <td colSpan={2}>{params.trffNm}</td>
          <th colSpan={1} style={{ paddingLeft: 20, paddingRight: 10 }}>
            사업지역
          </th>
          <td colSpan={2}>
            <select
              onChange={(e) =>
                setParams({ ...params, [e.target.id]: e.target.value })
              }
              id="bizTcd"
              name="bizTcd"
              style={{ width: 230, borderWidth: "0 0px" }}
            >
              {bizTcdLov.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </td>
          <th colSpan={1} style={{ paddingLeft: 20, paddingRight: 10 }}>
            매입/매출
          </th>
          <td colSpan={2}>
            <select
              onChange={(e) =>
                setParams({ ...params, [e.target.id]: e.target.value })
              }
              id="arApCcd"
              name="arApCcd"
              style={{ width: 230 }}
            >
              {arApCcdLov.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <th colSpan={1} style={{ paddingLeft: 10, paddingRight: 10 }}>
            타리프설명
          </th>
          <td colSpan={2}>
            <Input
              type="text"
              value={params.trffDesc}
              onChange={(e) =>
                setParams({ ...params, [e.target.id]: e.target.value })
              }
              id="trffDesc"
              style={{ boxShadow: "none" }}
            ></Input>
          </td>
          <th colSpan={1} style={{ paddingLeft: 20, paddingRight: 10 }}>
            서비스유형
          </th>
          <td colSpan={2}>
            <select
              onChange={(e) =>
                setParams({ ...params, [e.target.id]: e.target.value })
              }
              id="svcTcd"
              name="svcTcd"
              style={{ width: 230 }}
            >
              {svcTcdLov.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </td>
          <th colSpan={1} style={{ paddingLeft: 20, paddingRight: 10 }}>
            상세 서비스유형
          </th>
          <td colSpan={2}>
            <select
              onChange={(e) =>
                setParams({ ...params, [e.target.id]: e.target.value })
              }
              id="detlSvcTcd"
              name="detlSvcTcd"
              style={{ width: 230 }}
            >
              {detlSvcTcdLov.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </td>
        </tr>
      </Table>
    </div>
  );
};

export default TariffHeaderForm;
