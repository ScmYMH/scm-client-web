import { ContractInfoDefinition } from "api/contractCoaAxios";
import { AsyncState } from "lib/reducerUtils";
import { RootState } from "modules";
import { baseCodeAsync } from "modules/contractCoa/action";
import { postTariffHeaderAsync } from "modules/tariff/actions";
import { CodeDefinition, TariffHeaderParam } from "modules/tariff/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Modal, Table } from "reactstrap";

const TariffInfoForm = ({
  isSave,
  isSaveTrue,
  tariffParams,
  codeDefList,
}: {
  isSave: boolean;
  isSaveTrue: () => void;
  tariffParams: TariffHeaderParam;
  codeDefList: Array<CodeDefinition> | null;
}) => {
  const dispatch = useDispatch();
  const {
    data: tariffHeaderData,
    loading: tariffHeaderLoading,
    error: tariffHeaderError,
  } = useSelector((state: RootState) => state.tariff.tariffHeader);

  const [params, setParams] = useState<TariffHeaderParam>({
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

  const onClickHeaderSave = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (isSave) {
      alert("이미 저장되어 있는 타리프 헤더정보입니다.");
    } else {
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
        const data = {
          ...params,
          trffNm:
            "ALL_" + params.bizTcd + "_" + params.svcTcd + "_" + params.arApCcd,
        };
        setParams(data);
        dispatch(postTariffHeaderAsync.request(data));
      }
    }
  };

  useEffect(() => {
    if (tariffParams.trffId !== 0) {
      if (tariffParams.bizTcd === "수출") {
        tariffParams.bizTcd = "EX";
      } else if (tariffParams.bizTcd === "역내판매운송") {
        tariffParams.bizTcd = "LD";
      }
      if (tariffParams.svcTcd === "공로운송") {
        tariffParams.svcTcd = "ROAD";
      } else if (tariffParams.svcTcd === "해상운송") {
        tariffParams.svcTcd = "VSL";
      }
      if (tariffParams.detlSvcTcd === "ICV-국제해송(COA)") {
        tariffParams.detlSvcTcd = "ICV";
      } else if (tariffParams.detlSvcTcd === "NTR-일반공로운송(주문기준)") {
        tariffParams.detlSvcTcd = "NTR";
      }
      setParams(tariffParams);
      isSaveTrue();
    }
  }, []);

  return (
    <>
      <div style={{ marginLeft: 20, marginRight: 20 }}>
        <div
          style={{
            margin: "10px",
            marginTop: "10px",
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
              사업유형
            </th>
            <td colSpan={2}>
              <select
                onChange={(e) =>
                  setParams({ ...params, [e.target.id]: e.target.value })
                }
                id="bizTcd"
                name="bizTcd"
                style={{ width: 230 }}
                value={params.bizTcd}
                key={params.bizTcd}
              >
                <option key={""} value={""}></option>
                {codeDefList
                  ?.filter((data) => data.cd_tp === "BIZ_TCD")
                  .map((option) => (
                    <option key={option.cd_v} value={option.cd_v}>
                      {option.cd_v_meaning}
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
                value={params.arApCcd}
              >
                <option key={""} value={""}></option>
                {codeDefList
                  ?.filter((data) => data.cd_tp === "AR_AP_CCD")
                  .map((option) => (
                    <option key={option.cd_v} value={option.cd_v}>
                      {option.cd_v_meaning}
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
                value={params.svcTcd}
              >
                <option key={""} value={""}></option>
                {codeDefList
                  ?.filter((data) => data.cd_tp === "SVC_TCD")
                  .map((option) => (
                    <option key={option.cd_v} value={option.cd_v}>
                      {option.cd_v_meaning}
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
                  setParams({
                    ...params,
                    [e.target.id]: e.target.value.slice(0, 3),
                  })
                }
                id="detlSvcTcd"
                name="detlSvcTcd"
                style={{ width: 230 }}
                value={params.detlSvcTcd}
              >
                <option key={""} value={""}></option>
                {codeDefList
                  ?.filter((data) => data.cd_tp === "DETL_SVC_TCD")
                  .map((option) => (
                    <option key={option.cd_v} value={option.cd_v}>
                      {option.cd_v + "-" + option.cd_v_meaning}
                    </option>
                  ))}
              </select>
            </td>
          </tr>
        </Table>
      </div>
    </>
  );
};

export default TariffInfoForm;
