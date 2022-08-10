import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

const TariffExcelModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: any;
}) => {
  return (
    <Modal isOpen={isOpen} toggle={closeModal} size="xl">
      <ModalHeader toggle={closeModal}>
        엑셀 업로드
        <Button style={{ position: "absolute", right: 0, marginRight: "50px" }}>
          ADD
        </Button>
        <Button
          style={{ position: "absolute", right: 0, marginRight: "120px" }}
        >
          저장
        </Button>
      </ModalHeader>
      <ModalBody></ModalBody>
    </Modal>
  );
};

export default TariffExcelModal;
