import { FormEvent, useEffect, useRef, useState } from "react";

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
  Form,
} from "reactstrap";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "modules";
import {
  baseCodeAsync,
  insertContractCodeAsync,
} from "modules/contractCoa/action";

interface ContractCoaRegisterModalProps {
  closeModal: any;
  isOpen: boolean;
}

const ContractCoaRegisterModal = ({
  isOpen,
  closeModal,
}: ContractCoaRegisterModalProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const baseCodeData = useSelector(
    (state: RootState) => state.baseCode.baseCode
  );
  const [contractInfoParams, setContractInfoParamas] = useState({
    cntrtCurrCd: "USD",
    cntrtNm: "",
    cntrtScd: "60",
    cntrtStartDate: "",
    cntrtEndDate: "",
    cntrtTcd: "109031",
    crePersonId: "", // 담당자 명
    insPersonId: "mh.kim",
    updPersonId: "202207130004",
    cntrtTypGcd: "1090",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(baseCodeAsync.request(""));
  }, []);
  console.log(contractInfoParams);

  const onSubmitInsertContractInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contractInfoParams.cntrtNm == "") {
      alert("계약 명을 작성 해주세요.");
    } else if (contractInfoParams.crePersonId == "") {
      alert("담당자명을 작성 해주세요.");
    } else if (contractInfoParams.cntrtStartDate == "") {
      alert("계약 시작 기간을 작성 해주세요.");
    } else if (contractInfoParams.cntrtEndDate == "") {
      alert("계약 종료 기간을 작성 해주세요.");
    } else {
      dispatch(insertContractCodeAsync.request(contractInfoParams));
    }
  };

  Modal;
  return (
    <>
      <Modal isOpen={isOpen} toggle={closeModal} size="xl">
        <ModalHeader toggle={closeModal}>
          <div>계약 등록 화면</div>
        </ModalHeader>
        <ModalBody>
          <div style={{}}>
            <div>
              <Form
                className="ContractInfoForm"
                onSubmit={onSubmitInsertContractInfo}
              >
                계약정보
                <Button style={{ marginLeft: "80%" }} className="btn" size="sm">
                  신규등록
                </Button>
              </Form>
            </div>
          </div>
          <Table bordered>
            <tr>
              <th>물류법인</th>
              <td>
                <Input
                  id="coprId"
                  name="coprId"
                  type="select"
                  onChange={(e) =>
                    setContractInfoParamas({
                      ...contractInfoParams,
                      [e.target.id]: e.target.value,
                    })
                  }
                >
                  {baseCodeData.data?.slice(8, 9).map((option) => (
                    <option
                      key={option.cd_v}
                      value={option.cd_v}
                      selected={option.cd_v_meaning}
                      disabled
                    >
                      {option.cd_v_meaning}
                    </option>
                  ))}
                </Input>
              </td>
              <th>계약유형그룹코드*</th>
              <td>
                <Input
                  id="cntrtTypGcd"
                  name="cntrtTypGcd"
                  type="select"
                  onChange={(e) =>
                    setContractInfoParamas({
                      ...contractInfoParams,
                      [e.target.id]: e.target.value,
                    })
                  }
                >
                  {baseCodeData.data?.slice(10, 12).map((option) => (
                    <option key={option.cd_v} value={option.cd_v}>
                      {option.cd_v_meaning}
                    </option>
                  ))}
                </Input>
              </td>
            </tr>
            <tr>
              <th>계약명</th>
              <td>
                <Input
                  id="cntrtNm"
                  name="cntrtNm"
                  onChange={(e) =>
                    setContractInfoParamas({
                      ...contractInfoParams,
                      [e.target.id]: e.target.value,
                    })
                  }
                />
              </td>
              <th>계약유형코드*</th>
              <td>
                <Input
                  id="cntrtTcd"
                  name="cntrtTcd"
                  type="select"
                  onChange={(e) =>
                    setContractInfoParamas({
                      ...contractInfoParams,
                      [e.target.id]: e.target.value,
                    })
                  }
                >
                  {baseCodeData.data?.slice(12, 22).map((option) => (
                    <option key={option.value} value={option.cd_v}>
                      {option.cd_v_meaning}
                    </option>
                  ))}
                </Input>
              </td>
            </tr>
            <tr>
              <th>계약 ID</th>
              <td>
                <Input
                  id="cntrtId"
                  name="cntrtId"
                  disabled
                  onChange={(e) =>
                    setContractInfoParamas({
                      ...contractInfoParams,
                      [e.target.id]: e.target.value,
                    })
                  }
                />
              </td>
              <th>담당자*</th>
              <td>
                <Input
                  id="crePersonId"
                  name="crePersonId"
                  onChange={(e) =>
                    setContractInfoParamas({
                      ...contractInfoParams,
                      [e.target.id]: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <th>계약상태</th>
              <td>
                <Input
                  id="cntrtScd"
                  name="cntrtScd"
                  type="select"
                  onChange={(e) =>
                    setContractInfoParamas({
                      ...contractInfoParams,
                      [e.target.id]: e.target.value,
                    })
                  }
                >
                  {baseCodeData.data?.slice(0, 1).map((option) => (
                    <option
                      key={option.cd_v}
                      value={option.cd_v}
                      selected={option.cd_v_meaning}
                      disabled
                    >
                      {option.cd_v_meaning}
                    </option>
                  ))}
                </Input>
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
                    id="cntrtStartDate"
                    name="cntrtStartDate"
                    onChange={(e) =>
                      setContractInfoParamas({
                        ...contractInfoParams,
                        [e.target.id]: e.target.value.replaceAll("-", ""),
                      })
                    }
                  />
                </div>
                <div style={{ display: "inline-block" }}>
                  <Input
                    type="date"
                    style={{ display: "span" }}
                    fixedHeight
                    dateFormat="yyyy-MM-dd"
                    id="cntrtEndDate"
                    name="cntrtEndDate"
                    onChange={(e) =>
                      setContractInfoParamas({
                        ...contractInfoParams,
                        [e.target.id]: e.target.value.replaceAll("-", ""),
                      })
                    }
                    selected={endDate}
                    minDate={new Date()}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>계약통화코드*</th>
              <td>
                <Input
                  id="cntrtCurrCd"
                  name="cntrtCurrCd"
                  type="select"
                  onChange={(e) =>
                    setContractInfoParamas({
                      ...contractInfoParams,
                      [e.target.id]: e.target.value,
                    })
                  }
                >
                  {baseCodeData.data?.slice(24, 38).map((option) => (
                    <option key={option.value} value={option.cd_v}>
                      {option.cd_v_meaning}
                    </option>
                  ))}
                </Input>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "50px",
              color: "white",
            }}
          >
            <Input type="button" value="추가"></Input>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ContractCoaRegisterModal;
