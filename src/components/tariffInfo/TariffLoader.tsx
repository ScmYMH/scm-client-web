import Header from "./Header";
import { useEffect, useState } from "react";
import TariffCondHForm from "./TariffCondHForm";
import TariffInfoForm from "./TariffInfoForm";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { TariffHeaderParam } from "modules/tariff/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "modules";
import { getCodeDefAsync } from "modules/tariff/actions";

const TariffLoader = ({
  isOpen,
  closeModal,
  tariffParams,
}: {
  isOpen: boolean;
  closeModal: () => void;
  tariffParams: TariffHeaderParam;
}) => {
  const [isSave, setIsSave] = useState(false);
  const dispatch = useDispatch();

  const codeDefList = useSelector(
    (state: RootState) => state.tariff.codeDefList
  );

  useEffect(() => {
    setIsSave(false);
    dispatch(getCodeDefAsync.request(""));
  }, []); // 모달창 띄울때마다 isSave false로 바꿔주기

  return (
    <Modal isOpen={isOpen} toggle={closeModal} fullscreen>
      <ModalHeader toggle={closeModal}>타리프 등록</ModalHeader>
      <ModalBody>
        <TariffInfoForm
          isSaveTrue={() => setIsSave(true)}
          isSave={isSave}
          tariffParams={tariffParams}
          codeDefList={codeDefList.data}
        ></TariffInfoForm>
        <TariffCondHForm
          isSave={isSave}
          cntrtId={tariffParams.cntrtId}
          trffId={tariffParams.trffId}
          codeDefList={codeDefList.data}
        ></TariffCondHForm>
      </ModalBody>
    </Modal>
  );
};

export default TariffLoader;
