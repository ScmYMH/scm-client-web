import { Button, Container, Form, Input, Table } from "reactstrap";

import styles from "./calculate.module.css";

const CalculateInfoForm = () => {
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
        <Form style={{ margin: 3 }}>
          <Button size="sm" outline>
            이거
          </Button>
        </Form>
        <Button outline style={{ margin: 3 }} className="btn" size="sm">
          찾았어?
        </Button>
        <Button outline style={{ margin: 3 }} className="btn" size="sm">
          확정 취소
        </Button>
        <Button outline style={{ margin: 3 }} className="btn" size="sm">
          회계연결
        </Button>
      </div>
      <div>
        <div style={{ margin: 4 }}>◎ 조회 조건</div>
        <Table bordered className={styles.calculate_select_table}>
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
                <div>
                  <Input
                    style={{
                      marginRight: "30px",
                      boxShadow: "none",
                      borderRadius: 0,
                      width: 300,
                    }}
                    type="select"
                  ></Input>
                </div>
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
                <div>
                  <Input
                    style={{
                      marginRight: "30px",
                      boxShadow: "none",
                      borderRadius: 0,
                    }}
                    type="select"
                  ></Input>
                </div>
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
                선박명
              </th>
              <td>
                <div>
                  <Input type="text" />
                </div>
              </td>
            </tr>
          </tbody>
        </Table>

        <Table bordered style={{ marginTop: 50 }}>
          <thead style={{ margin: 4 }}>◎ 상세 정보</thead>
          <tbody style={{ textAlign: "center" }}>
            <tr className="table-secondary">
              <th>CHK</th>
              <th>권역</th>
              <th>타리프 설명</th>
              <th>물류실행사ID</th>
              <th>물류 실행사명</th>
              <th>선적일자</th>
              <th>지시번호</th>
              <th>선박코드</th>
              <th>확정여부</th>
              <th>회계연결여부</th>
              <th>통화</th>
              <th>정산중량</th>
              <th>정산금액</th>
              <th>회계연결금액</th>
              <th>AP 전표번호</th>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CalculateInfoForm;
