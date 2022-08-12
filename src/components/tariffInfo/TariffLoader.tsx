import Header from "./Header";
import { useEffect, useState } from "react";
import TariffCondHForm from "./TariffCondHForm";
import TariffInfoForm from "./TariffInfoForm";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { TariffInfoParam } from "modules/tariff/types";

const TariffLoader = ({
  isOpen,
  closeModal,
  tariffParams,
}: {
  isOpen: boolean;
  closeModal: () => void;
  tariffParams: TariffInfoParam;
}) => {
  const [isSave, setIsSave] = useState(false);

  useEffect(() => {
    setIsSave(false);
  }, []); // 모달창 띄울때마다 isSave false로 바꿔주기

  return (
    <Modal isOpen={isOpen} toggle={closeModal} fullscreen>
      <ModalHeader toggle={closeModal}>타리프 등록</ModalHeader>
      <ModalBody>
        <TariffInfoForm
          isSaveTrue={() => setIsSave(true)}
          tariffParams={tariffParams}
        ></TariffInfoForm>
        <TariffCondHForm
          isSave={isSave}
          cntrtId={tariffParams.cntrtId}
        ></TariffCondHForm>
      </ModalBody>
    </Modal>
  );
};

export default TariffLoader;
