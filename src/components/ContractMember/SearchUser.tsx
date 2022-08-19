import {
  Button,
  Container,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "modules";
import { useState, useEffect } from "react";
import { getUserMemberAsync } from "modules/userMember/actions";

const SearchUser = ({
  isOpen,
  closeModal,
  onClickUser,
  setAddMember,
  addMember,
}: {
  isOpen: boolean;
  closeModal: any;
  onClickUser: any;
  setAddMember?: any;
  addMember?: any;
}) => {
  return (
    <Modal isOpen={isOpen} toggle={closeModal} size="xl">
      <ModalHeader toggle={closeModal}>사용자 정보 조회</ModalHeader>

      <ModalBody>
        <SearchUserBody
          addMember={addMember}
          setAddMember={setAddMember}
          closeModal={closeModal}
          onClickUser={onClickUser}
        ></SearchUserBody>
      </ModalBody>
    </Modal>
  );
};

const SearchUserBody = ({
  onClickUser,
  closeModal,
  setAddMember,
  addMember,
}: {
  closeModal: any;
  onClickUser: any;
  setAddMember?: any;
  addMember?: any;
}) => {
  const dispatch = useDispatch();

  const { data: userMemberListData } = useSelector(
    (state: RootState) => state.usermember.userMemberList
  );
  const [user, setUser] = useState({
    loginId: "",
    userNm: "",
  });

  const onSubmitUserInfo = () => {
    dispatch(getUserMemberAsync.request(user));
  };

  const onSelect = (userId: string, usermemberInfo: any) => {
    onClickUser(userId);
    setAddMember([...addMember, usermemberInfo]);
    closeModal();
  };

  return (
    <>
      <div>
        <Table bordered size="sm" style={{ display: "inline" }}>
          <tbody>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  backgroundColor: "#ced6e0",
                  marginTop: 1,
                }}
              >
                사용자명
              </td>
              <td>
                <Input
                  id="userNm"
                  name="userNm"
                  type="text"
                  style={{ marginRight: "30px" }}
                  onChange={(e) => setUser({ ...user, userNm: e.target.value })}
                ></Input>
              </td>

              <td
                style={{
                  textAlign: "center",
                  backgroundColor: "#ced6e0",
                  margin: 1,
                }}
              >
                로그인ID
              </td>
              <td>
                <Input
                  id="loginId"
                  name="loginId"
                  type="text"
                  style={{ marginRight: "30px" }}
                  onChange={(e) =>
                    setUser({ ...user, loginId: e.target.value })
                  }
                ></Input>
              </td>
            </tr>
          </tbody>
        </Table>
        <Button
          onClick={onSubmitUserInfo}
          outline
          style={{ margin: 5, float: "right" }}
        >
          조회
        </Button>
      </div>

      <Table bordered style={{ marginTop: 20 }}>
        <thead style={{ textAlign: "center" }}>
          <tr className="table-secondary">
            <th>시스템사용자명</th>
            <th>로그인ID</th>
            <th>시스템사용자ID</th>
            <th>이메일</th>
            <th>직번</th>
            <th>부서명</th>
            <th></th>
          </tr>
        </thead>
        {userMemberListData && (
          <tbody>
            {userMemberListData.map((usermemberInfo, index) => (
              <tr key={index} aria-rowcount={index}>
                <td
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ced6e0",
                    margin: 1,
                  }}
                  key={usermemberInfo.userId}
                >
                  {usermemberInfo.userNm}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ced6e0",
                    margin: 1,
                  }}
                  key={usermemberInfo.userId}
                >
                  {usermemberInfo.loginId}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ced6e0",
                    margin: 1,
                  }}
                  key={usermemberInfo.userId}
                >
                  {usermemberInfo.userId}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ced6e0",
                    margin: 1,
                  }}
                  key={usermemberInfo.userId}
                >
                  {usermemberInfo.email}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ced6e0",
                    margin: 1,
                  }}
                  key={usermemberInfo.userId}
                >
                  {usermemberInfo.employeeNumber}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ced6e0",
                    margin: 1,
                  }}
                  key={usermemberInfo.userId}
                >
                  {usermemberInfo.deptNm}
                </td>
                <td>
                  <Button
                    onClick={() =>
                      onSelect(usermemberInfo.userId, usermemberInfo)
                    }
                  >
                    선택
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </>
  );
};
export default SearchUser;
