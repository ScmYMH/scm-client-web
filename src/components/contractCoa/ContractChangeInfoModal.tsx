import { getContractChangeInfoListApi } from "api/contractCoaChangeAxios";
import { RootState } from "modules";
import { contractChangeInfoAsync } from "modules/contractChangeCoa/action";
import { useDispatch, useSelector } from "react-redux";

import { Button, Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { useEffect } from "react";

interface ContractChangeInfoModalProps {
  isOpen: boolean;
  closeModal: any;
  updParams: any;
}

const ContractChangeInfoModal = ({
  isOpen,
  closeModal,
  updParams,
}: ContractChangeInfoModalProps) => {
  const dispatch = useDispatch();

  const { data: contractChangeData } = useSelector(
    (state: RootState) => state.contractChangeInfo.contractChangeInfoList
  );

  useEffect(() => {
    dispatch(contractChangeInfoAsync.request(updParams.data.cntrt_id));
  }, []);

  return (
    <>
      {console.log(
        "디스패치에서 받았을 때 타입 확인 >>>",
        typeof contractChangeData
      )}
      {console.log("디스패치 쏘는지 확인 >>>>>>>>>>>>>> ", contractChangeData)}
      <Modal isOpen={isOpen} toggle={closeModal} size="xl">
        <ModalHeader toggle={closeModal}>계약 변경 이력</ModalHeader>
        <ModalBody>
          <Table bordered>
            <thead>
              <tr>
                <th>일련번호</th>
                <th>수정사유</th>
                <th>수정일시</th>
                <th>수정자 명</th>
              </tr>
            </thead>
            {contractChangeData && (
              <tbody>
                {Object.values(contractChangeData).map((data, index) => (
                  <tr key={index} aria-rowcount={index}>
                    <td>{data.cntrt_log_seq_no}</td>
                    <td>{data.cntrt_edit_comment}</td>
                    <td>
                      {data.upd_date} {data.upd_time}
                    </td>
                    <td>{data.user_nm}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ContractChangeInfoModal;
