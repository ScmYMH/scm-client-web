import {
  contractInfoAsync,
  delContractCodeAsync,
  tariffInfoAsync,
} from "modules/contractCoa/action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import ContractCoaInfoForm from "./ContractCoaInfoForm";
import { Card } from "react-bootstrap";

const ContractCoaInfoLoader = () => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.contractInfo.contractInfo
  );

  const tariffData = useSelector(
    (state: RootState) => state.tariffInfo.tariffInfo
  );

  const dispatch = useDispatch();

  const onSubmitContractCoaInfo = (params: any) => {
    dispatch(contractInfoAsync.request(params));
  };

  const onSubmitDelContractCoaInfo = (cntrt_id: string) => {
    dispatch(delContractCodeAsync.request(cntrt_id));
  };

  const onSubmitTariffInfo = (params: any) => {
    dispatch(tariffInfoAsync.request(params));
  };

  return (
    <>
      <div>
        <header>
          <div
            style={{
              marginTop: 0,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: "2em",
            }}
          >
            <div
              style={{
                margin: "0",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <h5 style={{ fontWeight: "bold", color: "#003366" }}>
                ● 계약 등록
              </h5>
            </div>
          </div>
        </header>
      </div>
      <Card style={{ marginLeft:"2em", minHeight: "900px", width:"1300px" }}>
        <ContractCoaInfoForm
          onSubmitContractCoaInfo={onSubmitContractCoaInfo}
          onSubmitTariffInfo={onSubmitTariffInfo}
          contractInfodata={data}
          tariffData={tariffData}
          onSubmitDelContractCoaInfo={onSubmitDelContractCoaInfo}
        />
      </Card>
    </>
  );
};

export default ContractCoaInfoLoader;
