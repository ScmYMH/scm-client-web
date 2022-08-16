import { postExcelImport } from "api/excelImportAxios";
import { postTariffExcelImportAsync } from "modules/importExcel/action";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import * as XLSX from "xlsx";

const TariffExcelModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: any;
}) => {
  let jsonData;

  const [excelData, setExcelData] = useState<any>([]);
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
        jsonData = json;
        console.log("파일 json 변환 확인 >>>> ", json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const dispatch = useDispatch();

  const onSubmitExcelData = () => {
    console.log("디스패치할 때 json 값 확인 >>> ", jsonData);
    dispatch(postTariffExcelImportAsync.request(jsonData));
  };

  return (
    <Modal isOpen={isOpen} toggle={closeModal} size="m">
      <ModalHeader toggle={closeModal}>
        엑셀 업로드
        <Button
          style={{ position: "absolute", right: 0, marginRight: "50px" }}
          onClick={onSubmitExcelData}
        >
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
