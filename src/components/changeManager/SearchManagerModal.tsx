import { RootState } from "modules";
import { getContractMemberAsync } from "modules/contractMember/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
} from "reactstrap";

const SearchManager = ({
  isOpen,
  closeModal,
  onClickMember,
  preActorNm,
  aftActorNm,
  isCurrent,
}: {
  isOpen: boolean;
  closeModal: any;
  onClickMember: any;
  preActorNm: string;
  aftActorNm: string;
  isCurrent: boolean;
}) => {
  return (
    <Modal isOpen={isOpen} toggle={closeModal} size="xl">
      <ModalHeader toggle={closeModal}>계약 담당자 조회</ModalHeader>
      <ModalBody>
        <SearchManagerBody
          onClickMember={onClickMember}
          closeModal={closeModal}
          preActorNm={preActorNm}
          aftActorNm={aftActorNm}
          isCurrent={isCurrent}
        />
      </ModalBody>
    </Modal>
  );
};

const SearchManagerBody = ({
  onClickMember,
  closeModal,
  preActorNm,
  aftActorNm,
  isCurrent,
}: {
  onClickMember: any;
  closeModal: any;
  preActorNm: string;
  aftActorNm: string;
  isCurrent: boolean;
}) => {
  const dispatch = useDispatch();

  const {
    data: contractMemberListData,
    loading: contractMemberListLoading,
    error: contractMemberListError,
  } = useSelector(
    (state: RootState) => state.contractmember.contractMemberList
  );

  const [member, setMember] = useState({
    loginId: "",
    userNm: "",
    delYn: "",
  });

  const onSubmitMemberInfo = () => {
    dispatch(getContractMemberAsync.request(member));
  };

  const onSelect = (memId: string, memNm: string) => {
    onClickMember(memId, memNm);
    closeModal();
  };

  useEffect(() => {
    if (isCurrent) {
      setMember({ ...member, userNm: preActorNm });
      dispatch(
        getContractMemberAsync.request({ ...member, userNm: preActorNm })
      );
    } else {
      setMember({ ...member, userNm: aftActorNm });
      dispatch(
        getContractMemberAsync.request({ ...member, userNm: aftActorNm })
      );
    }
  }, []);

  return (
    <>
      <div className="row" style={{ marginTop: 10, marginBottom: 50 }}>
        <div
          style={{
            width: " 600px",
            display: "table",
            tableLayout: "fixed",
          }}
        >
          <Table
            bordered
            style={{
              display: "table-cell",
            }}
          >
            <tr>
              <tbody>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ced6e0",
                    margin: 1,
                  }}
                >
                  사용자명
                </th>
                <td>
                  <Input
                    style={{
                      boxShadow: "none",
                      borderRadius: 0,
                    }}
                    id="userNm"
                    name="userNm"
                    type="text"
                    value={member.userNm}
                    onChange={(e) =>
                      setMember({ ...member, userNm: e.target.value })
                    }
                  ></Input>
                </td>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ced6e0",
                    margin: 1,
                  }}
                >
                  로그인ID
                </th>
                <td>
                  <Input
                    style={{
                      boxShadow: "none",
                      borderRadius: 0,
                    }}
                    id="loginId"
                    name="loginId"
                    type="text"
                    onChange={(e) =>
                      setMember({ ...member, loginId: e.target.value })
                    }
                  ></Input>
                </td>
              </tbody>
            </tr>
          </Table>
        </div>
        <div
          style={{
            width: "100px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button className="btn" outline onClick={onSubmitMemberInfo}>
            조회
          </Button>
        </div>
      </div>
      <Table bordered className="tableStyle">
        <thead>
          <tr style={{ textAlign: "center" }} className="table-secondary">
            <th>로그인ID</th>
            <th>사용자명</th>
            <th>EMAIL</th>
            <th>EMPLOYEE_NUMBER</th>
            <th>부서</th>
            <th>등록일</th>
            <th>삭제일</th>
            <th>삭제여부</th>
            <th></th>
          </tr>
        </thead>
        {contractMemberListData && (
          <tbody>
            {contractMemberListData.map(
              (contractmemberInfo, index) =>
                contractmemberInfo.delYn === "N" && (
                  <tr key={index} aria-rowcount={index}>
                    <td style={{ textAlign: "center" }}>
                      {contractmemberInfo.loginId}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {contractmemberInfo.userNm}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {contractmemberInfo.email}
                    </td>
                    <td style={{ textAlign: "right", paddingRight: 20 }}>
                      {contractmemberInfo.employeeNumber}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {contractmemberInfo.deptNm}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {contractmemberInfo.insDate}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {contractmemberInfo.updDate}
                    </td>

                    <td style={{ textAlign: "center" }}>
                      {contractmemberInfo.delYn}
                    </td>
                    <td>
                      <Button
                        onClick={() =>
                          onSelect(
                            contractmemberInfo.userId,
                            contractmemberInfo.userNm
                          )
                        }
                        style={{ backgroundColor: "grey" }}
                      >
                        선택
                      </Button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        )}
      </Table>
    </>
  );
};

export default SearchManager;
