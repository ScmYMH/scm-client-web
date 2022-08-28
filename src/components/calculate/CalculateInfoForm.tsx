import { ChangeEvent, FormEvent, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { Button, Container, Form, Input, Table } from "reactstrap";
import AccountConnModal from "./AccountConnModal";

import styles from "./calculate.module.css";
import CalculateDetailModal from "./CalculateDetailModal";
import CalculateLspModal from "./CalculateLspModal";
import CalculateVslCdModal from "./CalculateVslCdModal";

export interface CalculateInfoFormProps {
  onSubmitCalculateInfo: (calSelectParams: any) => void;
  calculateInfoData : any;
  baseCodeData: any;
}

const CalculateInfoForm = ({onSubmitCalculateInfo, calculateInfoData, baseCodeData}: CalculateInfoFormProps) => {
  const [detailOpenModal, setDetailOpenModal] = useState(false);
  const [lspOpenModal, setLspOpenModal] = useState(false);
  const [actConOpenModal, setActConOpenModal] = useState(false);
  const [calSelectParams, setCalSelectParams] = useState({
    startDate: "",
    endDate: "",
    lspId: "",
    vslCd: "",
    closeNoYn: "",
    transOrderNo: "",
    cdVmeaning: "",
  });



  const closeNoYnOptions = [
    { value: "", text: "ALL" },
    { value: "N", text: "No" },
    { value: "Y", text: "Yes" }
  ];
  
  const onChangeCalInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setCalSelectParams({ ...calSelectParams, [e.target.id]: e.target.value });
  };

  const checkAccountConn = () => {
    const dialog = confirm("상신하시겠습니까?");

    if (dialog) {
      console.log("Data Saved");
      setActConOpenModal((actConOpenModal) => !actConOpenModal);
    } else {
      console.log("Data Not Saved");
    }
  };
  const onSubmitCalculateInfoList = (e: FormEvent<HTMLFormElement>) => {
    console.log("---------")
    e.preventDefault();
    onSubmitCalculateInfo(calSelectParams);
  };
console.log(baseCodeData);
  return (
    <div
      style={{
        marginTop: 30,
        marginRight: 30,
        marginBottom: 15,
        marginLeft: 30,
        height: 800,
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Form
            style={{ margin: 3 }}
            onSubmit={onSubmitCalculateInfoList}
            className="CalculateInfoForm"
          >
          <Button outline style={{ margin: 3 }} className="btn" size="sm">
            조회
          </Button>
        </Form>
        <Button outline style={{ margin: 3 }} className="btn" size="sm">
          확정 취소
        </Button>
        <Button
          outline
          style={{ margin: 3 }}
          className="btn"
          size="sm"
          onClick={checkAccountConn}
        >
          회계연결
        </Button>
        {actConOpenModal && (
          <AccountConnModal
            isOpen={actConOpenModal}
            closeModal={() =>
              setActConOpenModal((actConOpenModal) => !actConOpenModal)
            }
          ></AccountConnModal>
        )}
        <Button outline style={{ margin: 3 }} className="btn" size="sm">
          정산 집계
        </Button>
      </div>
      <div>
        <div style={{ margin: 4 }}>◎ 조회 조건</div>
        <table className={styles.calculate_select_table}>
          <tbody>
            <tr>
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "#ced6e0",
                  margin: 1,
                }}
              >
                출하일
              </th>
              <td>
                <div style={{ display: "inline-block" }}>
                  <div>
                    <Input
                      style={{
                        marginRight: "30px",
                        boxShadow: "none",
                        borderRadius: 0,
                        display: "span",
                      }}
                      fixedHeight
                      dateFormat="yyyy-MM-dd"
                      selectsStart
                      type="date"
                      id="startDate"
                      name="startDate"
                      onChange={(e) =>
                        setCalSelectParams({
                          ...calSelectParams,
                          [e.target.id]: e.target.value.replaceAll("-", ""),
                        })
                      }
                    />
                  </div>
                </div>
                <div style={{ display: "inline-block" }}>
                  <div>
                    <Input
                      type="date"
                      style={{
                        marginRight: "30px",
                        boxShadow: "none",
                        borderRadius: 0,
                        display: "span",
                      }}
                      fixedHeight
                      dateFormat="yyyy-MM-dd"
                      id="endDate"
                      name="endDate"
                      minDate={new Date()}
                      onChange={(e) =>
                        setCalSelectParams({
                          ...calSelectParams,
                          [e.target.id]: e.target.value.replaceAll("-", ""),
                        })
                      }
                    />
                  </div>
                </div>
              </td>
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "#ced6e0",
                  margin: 1,
                }}
              >
                물류실행사
              </th>
              <td>
                <Input
                  id="lspId"
                  readOnly
                  style={{
                    boxShadow: "none",
                    width: "85%",
                    display: "inline-block",
                    borderRadius: 0,
                  }}
                  onChange={onChangeCalInfo}
                />
                <HiSearch
                  style={{ marginLeft: 10, cursor: "pointer" }}
                  onClick={() => {
                    setLspOpenModal((lspOpenModal) => !lspOpenModal);
                  }}
                ></HiSearch>
                {lspOpenModal && (
                  <CalculateLspModal
                    isOpen={lspOpenModal}
                    closeModal={() =>
                      setLspOpenModal((lspOpenModal) => !lspOpenModal)
                    }
                    baseCodeData={baseCodeData}
                  ></CalculateLspModal>
                )}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "#ced6e0",
                  margin: 1,
                }}
              >
                정산상태
              </th>
              <td>
                <div>
                  <Input
                    id="closeNoYn"
                    style={{
                      marginRight: "30px",
                      boxShadow: "none",
                      borderRadius: 0,
                    }}
                    type="select"
                    onChange={onChangeCalInfo}
                  >
                    
                    {closeNoYnOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                  </Input>
                </div>
              </td>
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "#ced6e0",
                  margin: 1,
                }}
              >
                선박코드
              </th>
              <td>
                <Input
                id="vslCd"
                  readOnly
                  style={{
                    boxShadow: "none",
                    width: "85%",
                    display: "inline-block",
                    borderRadius: 0,
                  }}
                  onChange={onChangeCalInfo}
                />
                <HiSearch
                  style={{ marginLeft: 10, cursor: "pointer" }}
                  onClick={() => {
                    setLspOpenModal((lspOpenModal) => !lspOpenModal);
                  }}
                ></HiSearch>
                {lspOpenModal && (
                  <CalculateVslCdModal
                    isOpen={lspOpenModal}
                    closeModal={() =>
                      setLspOpenModal((lspOpenModal) => !lspOpenModal)
                    }
                  ></CalculateVslCdModal>
                )}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "#ced6e0",
                  margin: 1,
                }}
              >
                대권역
              </th>
              <td>
                <Input
                  id="cdVmeaning"
                  style={{
                    marginRight: "30px",
                    boxShadow: "none",
                    borderRadius: 0,
                  }}
                  type="select"
                  onChange={onChangeCalInfo}
                >
                  
                  {baseCodeData.data?.slice(79, 91).map((option) => (
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
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "#ced6e0",
                  margin: 1,
                }}
              >
                지시번호
              </th>
              <td>
                <div>
                  <Input type="text" 
                  id="transOrderNo"
                  onChange={onChangeCalInfo}/>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Button
            outline
            style={{ margin: 3 }}
            className="btn"
            size="sm"
            onClick={() => {
              setDetailOpenModal((detailOpenModal) => !detailOpenModal);
            }}
          >
            상세정보
          </Button>
          {detailOpenModal && (
            <CalculateDetailModal
              isOpen={detailOpenModal}
              closeModal={() =>
                setDetailOpenModal((detailOpenModal) => !detailOpenModal)
              }
            />
          )}
        </div>
        <div
          style={{
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
        <Table bordered style={{ marginTop: 10 }}>
          <tbody style={{ textAlign: "center" }}>
            <tr className="table-secondary">
              <th>CHK</th>
              <th>권역</th>
              <th>물류실행사ID</th>
              <th>물류 실행사명</th>
              <th>선적일자</th>
              <th>지시번호</th>
              <th>선박코드</th>
              <th>선박명</th>
              <th>coa여부</th>
              <th>확정여부</th>
              <th>회계연결여부</th>
              <th>통화</th>
              <th>정산중량</th>
              <th>정산금액</th>
              <th>회계연결금액</th>
              <th>AP 전표번호</th>
            </tr>
            <>
            {calculateInfoData.data?.map((data, index)=>(
              <tr key={index} aria-rowcount={index}>
                <td>
                  <Input type="checkbox"></Input>
                </td>
                <td>{data.nation_nm}</td>
                <td>{data.lsp_id}</td>
                <td>{data.cd_v_meaning}</td>
                <td>날짜</td>
                <td>{data.trans_order_no}</td>
                <td>{data.vsl_cd}</td>
                <td>{data.vsl_nm}</td>
                <td>
                  <Input type="checkbox"></Input>
                </td>
                <td>{data.close_no_yn}</td>
                <td>{data.acctg_yn}</td>
                <td>{data.clear_curr}</td>
                <td>{data.clear_qty}</td>
                <td>{data.clear_amt}</td>
                <td>{data.acctg_amt}</td>
                <td>EX-직번-220810(날찌)-SEQ(6자리)</td>
              </tr>
            ))}
            </>
          </tbody>
        </Table>
        </div>
      </div>
    </div>
  );
};

export default CalculateInfoForm;
