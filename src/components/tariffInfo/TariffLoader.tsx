import Header from "./Header";
import { useEffect, useState } from "react";
import TariffCondHForm from "./TariffCondHForm";
import TariffInfoForm from "./TariffInfoForm";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "modules";
import { getCodeDefAsync } from "modules/tariff/actions";

const TariffLoader = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
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
          isSaveFalse={() => setIsSave(false)}
          isSave={isSave}
        ></TariffInfoForm>
        <TariffCondHForm isSave={isSave}></TariffCondHForm>
      </ModalBody>
    </Modal>
  );
};

export default TariffLoader;
