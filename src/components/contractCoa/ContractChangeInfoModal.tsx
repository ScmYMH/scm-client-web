import { useEffect, useState } from "react";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  Label,
  InputGroup,
  InputGroupText,
} from "reactstrap";

const ContractChangeInfoModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: any;
}) => {
  return (
    <Modal isOpen={isOpen} toggle={closeModal} size="xl">
      <ModalHeader toggle={closeModal}>계약 변경 이력</ModalHeader>
      <ModalBody>
        <Table bordered>
          <thead style={{ textAlign: "center" }}>
            <tr className="table-secondary">
              <th>일련번호법인</th>
              <th>수정사유</th>
              <th>수정일시</th>
              <th>수정자 명</th>
            </tr>
          </thead>
        </Table>
      </ModalBody>
    </Modal>
  );
};

export default ContractChangeInfoModal;
