import { useRef } from "react";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import * as XLSX from "xlsx";

const TariffExcelModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: any;
}) => {
  //Excel to Json
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        console.log(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
      console.log(reader.readAsArrayBuffer(e.target.files[0]));
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={closeModal} size="m">
      <ModalHeader toggle={closeModal}>
        엑셀 업로드
        <Button style={{ position: "absolute", right: 0, marginRight: "50px" }}>
          Import
        </Button>
      </ModalHeader>
      <ModalBody>
        <Input
          type="file"
          id="excel_import"
          accept=".xlsx"
          onChange={readUploadFile}
        />
      </ModalBody>
    </Modal>
  );
};

export default TariffExcelModal;
