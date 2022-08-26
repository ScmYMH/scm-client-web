import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { Button, Container, Form, Input, Table } from "reactstrap";
import AccountConnModal from "./AccountConnModal";

import styles from "./calculate.module.css";
import CalculateDetailModal from "./CalculateDetailModal";
import CalculateLspModal from "./CalculateLspModal";
import CalculateVslCdModal from "./CalculateVslCdModal";

const CalculateInfoForm = () => {
  const [detailOpenModal, setDetailOpenModal] = useState(false);
  const [lspOpenModal, setLspOpenModal] = useState(false);
  const [actConOpenModal, setActConOpenModal] = useState(false);

  const checkAccountConn = () => {
    const dialog = confirm("상신하시겠습니까?");

    if (dialog) {
      console.log("Data Saved");
      setActConOpenModal((actConOpenModal) => !actConOpenModal);
    } else {
      console.log("Data Not Saved");
    }
  };

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
        <Button outline style={{ margin: 3 }} className="btn" size="sm">
          조회
        </Button>
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
                      id="calStartDate"
                      name="calStartDate"
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
                      id="calEndDate"
                      name="calEndDate"
                      minDate={new Date()}
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
                  readOnly
                  style={{
                    boxShadow: "none",
                    width: "85%",
                    display: "inline-block",
                    borderRadius: 0,
                  }}
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
                    style={{
                      marginRight: "30px",
                      boxShadow: "none",
                      borderRadius: 0,
                    }}
                    type="select"
                  />
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
                  readOnly
                  style={{
                    boxShadow: "none",
                    width: "85%",
                    display: "inline-block",
                    borderRadius: 0,
                  }}
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
                  style={{
                    marginRight: "30px",
                    boxShadow: "none",
                    borderRadius: 0,
                  }}
                  type="select"
                ></Input>
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
                  <Input type="text" />
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
            <tr>
              <td>
                <Input type="checkbox"></Input>
              </td>
              <td>일본</td>
              <td>101114</td>
              <td>신성해운(주) / Shinsung Shipping Co., Ltd.-본사</td>
              <td>7/3/2022</td>
              <td>4220624003</td>
              <td>1M270</td>
              <td>MIRAI ASTRO</td>
              <td>
                <Input type="checkbox"></Input>
              </td>
              <td>N</td>
              <td>Y</td>
              <td>USD</td>
              <td>2446716</td>
              <td>89060.46</td>
              <td>89060.46</td>
              <td>EX-직번-220810(날찌)-SEQ(6자리)</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CalculateInfoForm;
