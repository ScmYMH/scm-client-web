import { RootState } from "modules";
import {
  getCodeDefAsync,
  getTariffHeaderAsync,
  postTariffHeaderAsync,
  putTariffHeaderAsync,
} from "modules/tariff/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Table } from "reactstrap";
import styles from "./tariff.module.css";

const TariffInfoForm = ({
  isSave,
  isSaveTrue,
  isSaveFalse,
}: {
  isSave: boolean;
  isSaveTrue: () => void;
  isSaveFalse: () => void;
}) => {
  const dispatch = useDispatch();
  const { data: codeDefList } = useSelector(
    (state: RootState) => state.tariff.codeDefList
  );
  const {
    data: tariffHeaderData,
    loading: tariffHeaderLoading,
    error: tariffHeaderError,
  } = useSelector((state: RootState) => state.tariff.tariffHeader);

  const {
    data: tariffParamData,
    loading: tariffParamLoading,
    error: tariffParamError,
  } = useSelector((state: RootState) => state.tariff.tariffParam);

  const [params, setParams] = useState<any>(tariffHeaderData);
  const [isModify, setIsModify] = useState<boolean>(false);

  const onClickHeaderSave = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (isSave) {
      alert("이미 저장되어 있는 타리프 헤더정보입니다.");
    } else if (isSave === false && isModify === false) {
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
        isSaveTrue();
        setIsModify(true);
      }
    } else if (isSave === false && isModify === true) {
      // 헤더정보 수정되게
      const data = {
        ...params,
        trffNm:
          "ALL_" + params.bizTcd + "_" + params.svcTcd + "_" + params.arApCcd,
      };
      setParams(data);
      dispatch(putTariffHeaderAsync.request(data));
      isSaveTrue();
    }
  };

  useEffect(() => {
    dispatch(getCodeDefAsync.request(""));
    setParams(tariffHeaderData);
    if (tariffParamData?.trffId !== 0) {
      // 이미 있는 정보
      isSaveTrue();
      setIsModify(true);
    } else {
      // 새로 등록
      setIsModify(false);
    }
  }, []);

  console.log("============ params : ===========", params);
  useEffect(() => {
    setParams(tariffHeaderData);
  }, [tariffHeaderData]);

  return (
    <>
      <div style={{ marginLeft: 20, marginRight: 20 }}>
        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h4 style={{ fontWeight: "bold", color: "#003366" }}>
            ◎ 타리프 헤더정보
          </h4>
          <Button
            size="sm"
            onClick={(e) => {
              onClickHeaderSave(e);
            }}
            outline
          >
            저장
          </Button>
        </div>
        <Table bordered className={styles.tariff_table}>
          <tr>
            <th
              colSpan={1}
              style={{
                paddingLeft: 10,
                textAlign: "center",
                backgroundColor: "#ced6e0",
                margin: 1,
              }}
            >
              타리프 ID
            </th>
            <td colSpan={2} style={{ height: 50, paddingLeft: 7 }}>
              {params?.trffNm}
            </td>
            <th
              colSpan={1}
              style={{
                paddingRight: 10,
                textAlign: "center",
                backgroundColor: "#ced6e0",
                margin: 1,
              }}
            >
              사업유형
            </th>
            <td colSpan={2}>
              <div>
                <Input
                  type="select"
                  onChange={(e) => {
                    setParams({ ...params, [e.target.id]: e.target.value });
                    isSaveFalse();
                  }}
                  id="bizTcd"
                  name="bizTcd"
                  style={{ width: 230, boxShadow: "none", borderRadius: 0 }}
                  value={params?.bizTcd}
                  key={params?.bizTcd}
                >
                  <option key="default" value="default">
                    선택
                  </option>
                  {codeDefList
                    ?.filter((data) => data.cd_tp === "BIZ_TCD")
                    .map((option) => (
                      <option key={option.cd_v} value={option.cd_v}>
                        {option.cd_v_meaning}
                      </option>
                    ))}
                </Input>
              </div>
            </td>
            <th
              colSpan={1}
              style={{
                paddingLeft: 20,
                paddingRight: 10,
                textAlign: "center",
                backgroundColor: "#ced6e0",
                margin: 1,
              }}
            >
              매입/매출
            </th>
            <td colSpan={2}>
              <div>
                <Input
                  onChange={(e) => {
                    setParams({ ...params, [e.target.id]: e.target.value });
                    isSaveFalse();
                  }}
                  id="arApCcd"
                  name="arApCcd"
                  style={{ width: 230, boxShadow: "none", borderRadius: 0 }}
                  value={params?.arApCcd}
                  type="select"
                >
                  <option key="default" value="default">
                    선택
                  </option>
                  {codeDefList
                    ?.filter((data) => data.cd_tp === "AR_AP_CCD")
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
              colSpan={1}
              style={{
                paddingLeft: 10,
                textAlign: "center",
                backgroundColor: "#ced6e0",
                margin: 1,
              }}
            >
              타리프설명
            </th>
            <td colSpan={2}>
              <div style={{ padding: 3, paddingLeft: 5, width: 350 }}>
                <Input
                  type="text"
                  value={params?.trffDesc}
                  onChange={(e) => {
                    setParams({ ...params, [e.target.id]: e.target.value });
                    isSaveFalse();
                  }}
                  id="trffDesc"
                  style={{ boxShadow: "none", borderRadius: 0 }}
                ></Input>
              </div>
            </td>
            <th
              colSpan={1}
              style={{
                paddingRight: 10,
                textAlign: "center",
                backgroundColor: "#ced6e0",
                margin: 1,
              }}
            >
              서비스유형
            </th>
            <td colSpan={2}>
              <div>
                <Input
                  onChange={(e) => {
                    setParams({ ...params, [e.target.id]: e.target.value });
                    isSaveFalse();
                  }}
                  id="svcTcd"
                  name="svcTcd"
                  style={{ width: 230, boxShadow: "none", borderRadius: 0 }}
                  value={params?.svcTcd}
                  type="select"
                >
                  <option key="default" value="default">
                    선택
                  </option>
                  {codeDefList
                    ?.filter((data) => data.cd_tp === "SVC_TCD")
                    .map((option) => (
                      <option key={option.cd_v} value={option.cd_v}>
                        {option.cd_v_meaning}
                      </option>
                    ))}
                </Input>
              </div>
            </td>
            <th
              colSpan={1}
              style={{
                paddingLeft: 20,
                paddingRight: 10,
                textAlign: "center",
                backgroundColor: "#ced6e0",
                margin: 1,
              }}
            >
              상세 서비스유형
            </th>
            <td colSpan={2}>
              <div>
                <Input
                  onChange={(e) => {
                    setParams({
                      ...params,
                      [e.target.id]: e.target.value.slice(0, 3),
                    });
                    isSaveFalse();
                  }}
                  id="detlSvcTcd"
                  name="detlSvcTcd"
                  style={{ width: 230, boxShadow: "none", borderRadius: 0 }}
                  value={params?.detlSvcTcd}
                  type="select"
                >
                  <option key="default" value="default">
                    선택
                  </option>
                  {codeDefList
                    ?.filter((data) => data.cd_tp === "DETL_SVC_TCD")
                    .map((option) => (
                      <option key={option.cd_v} value={option.cd_v}>
                        {option.cd_v + "-" + option.cd_v_meaning}
                      </option>
                    ))}
                </Input>
              </div>
            </td>
          </tr>
        </Table>
      </div>
    </>
  );
};

export default TariffInfoForm;
