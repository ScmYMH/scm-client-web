import Sidebar from "components/sidebar/Sidebar";
import Header from "components/header/Header";
import {
  baseCodeAsync,
  contractInfoAsync,
  delContractCodeAsync,
  tariffInfoAsync,
} from "modules/contractCoa/action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import ContractCoaInfoForm from "./ContractCoaInfoForm";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

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
      <Header />
      <Card>
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
