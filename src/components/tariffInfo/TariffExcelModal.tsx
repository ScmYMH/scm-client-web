import { RootState } from "modules";
import {
  postTariffExcelImportAsync,
  putValCheckAsync,
} from "modules/importExcel/action";
import { getTariffCondHAsync } from "modules/tariff/actions";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import * as XLSX from "xlsx";

const TariffExcelModal = ({
  isOpen,
  closeModal,
  tariffParamData,
}: {
  isOpen: boolean;
  closeModal: any;
  tariffParamData: any;
}) => {
  console.log("excel Import 를 위한 타리프 정보 >>>> ", tariffParamData);

  // let jsonData;
  const [jsonData, setJsonData] = useState<any>();
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
        setJsonData(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const dispatch = useDispatch();

  const valiCheck = useSelector(
    (state: RootState) => state.excelImportDataInfo.excelImportInfo
  );

  useEffect(() => {
    if (valiCheck.data != null) {
      validationCheck();
    }
  }, [valiCheck.data]);

  const onSubmitExcelData = () => {
    const tariffInfo = {};

    const excelData = jsonData.map((data) => {
      return {
        dep_cd: data.출발지코드,
        dep_nm: data.출발지명,
        arr_cd: data.도착지코드,
        arr_nm: data.도착지명,
        lcc_cd: data.물류비계정,
        sub_lcc_cd: data.세부물류비,
        lcc_cd_desc: data.세부물류비설명,
        trff_stat_date: data.유효기간시작,
        trff_end_date: data.유효기간종료,
        cntrt_curr_cd: data.계약통화,
        pay_curr_cd: data.지불통화,
        prod_gcd: data.품종명,
        unit_price: data.단가,
        cal_unit_cd: data.계산단위,
        inco_cd: data.인도조건,
        cond_id: data.조건ID,
        cond_nm: data.조건명,
        cntrt_id: tariffParamData.cntrtId,
        trff_id: tariffParamData.trffId,
      };
    });

    dispatch(postTariffExcelImportAsync.request(excelData));

    if (valiCheck.loading == true) {
      validationCheck();
    }
  };

  function validationCheck() {
    if (Object(valiCheck).data === 1) {
      alert("실패: 중복된 데이터가 있습니다");
    } else if (Object(valiCheck).data === 2) {
      alert("성공적으로 등록되었습니다");
      dispatch(
        getTariffCondHAsync.request({
          cntrtId: tariffParamData?.cntrtId,
          trffId: tariffParamData?.trffId,
        })
      );
      dispatch(putValCheckAsync.request(3));
    } // Object(valiCheck).data === 3 => 조회 성공 -> 새롭게 import
  }

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
