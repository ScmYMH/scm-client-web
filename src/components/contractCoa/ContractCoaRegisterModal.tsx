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
import DatePicker from "react-datepicker";
const ContractCoaRegisterModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: any;
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const dateToString = (date) => {
    return (
      date.getFullYear() +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      date.getDate().toString().padStart(2, "0")
    );
  };

  const onChangeStartValidDate = (date: Date) => {
    setStartDate(date);
    console.log("startDate", startDate);
  };

  const onChangeEndValidDate = (date: Date) => {
    setEndDate(date);
    console.log("endDate", endDate);
  };

  return (
    <Modal isOpen={isOpen} toggle={closeModal} size="xl">
      <ModalHeader toggle={closeModal}>계약 등록 화면</ModalHeader>
      <ModalBody>
        <Table bordered>
          <tr>계약정보</tr>
          <tr>
            <th>물류법인</th>
            <td>
              <Input id="exampleSelect" name="corpId" type="select">
                <option>포스코</option>
                <option>포스코 ICT</option>
              </Input>
            </td>
            <th>계약유형그룹코드*</th>
            <td>
              <Input id="exampleSelect" name="corpId" type="select">
                <option>제품공통계약</option>
                <option>-</option>
              </Input>
            </td>
          </tr>
          <tr>
            <th>계약명</th>
            <td>
              <Input />
            </td>
            <th>계약유형코드*</th>
            <td>
              <Input />
            </td>
          </tr>
          <tr>
            <th>계약 ID</th>
            <td>
              <Input />
            </td>
            <th>담당자*</th>
            <td>
              <Input />
            </td>
          </tr>
          <tr>
            <th>계약상태</th>
            <td>
              <Input />
            </td>
            <th>계약기간</th>
            <td>
              <div style={{ display: "inline-block" }}>
                <Input
                  style={{ display: "span" }}
                  fixedHeight
                  dateFormat="yyyy-MM-dd"
                  selected={startDate}
                  selectsStart
                  type="date"
                />
              </div>
              <div style={{ display: "inline-block" }}>
                <Input
                  type="date"
                  style={{ display: "span" }}
                  fixedHeight
                  dateFormat="yyyy-MM-dd"
                  selected={endDate}
                  minDate={startDate}
                />
              </div>
            </td>
          </tr>
          <tr>
            <th>계약통화코드*</th>
            <td>
              <Input />
            </td>
            <th>수정사유</th>
            <td>
              <Input />
            </td>
          </tr>
        </Table>
        <hr></hr>
        <Table bordered>
          <thead>타리프 정보</thead>
          <tbody>
            <tr>
              <Input
                style={{ backgroundColor: "blue", color: "white" }}
                type="button"
                value="추가"
              ></Input>
            </tr>
            <tr>
              <th>일련번호</th>
              <th>타리프 ID</th>
              <th>타리프 설명</th>
              <th>서비스유형명</th>
              <th>Data Count</th>
              <th>LCC 갯수</th>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </ModalBody>
    </Modal>
  );
};

export default ContractCoaRegisterModal;
