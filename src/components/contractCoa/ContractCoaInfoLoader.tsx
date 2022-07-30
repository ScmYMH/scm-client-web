import { contractInfoAsync, tariffInfoAsync } from "modules/contractCoa/action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import ContractCoaInfoForm from "./ContractCoaInfoForm";

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
  const onSubmitTariffInfo = (params: any) => {
    dispatch(tariffInfoAsync.request(params));
  };

  return (
    <>
      <ContractCoaInfoForm
        onSubmitContractCoaInfo={onSubmitContractCoaInfo}
        onSubmitTariffInfo={onSubmitTariffInfo}
        contractInfodata={data}
        tariffData={tariffData}
      />
    </>
  );
};

export default ContractCoaInfoLoader;
