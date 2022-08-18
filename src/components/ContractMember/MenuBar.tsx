import React, { useState, ChangeEvent } from "react";
// import './ContractMember.css';
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Input, Table } from "reactstrap";
import { postUserMemberAsync } from "modules/contractMember/actions";
import SearchUser from "./SearchUser";

interface memberProps {
  onSubmitMemberInfo: (loginId: string, userNm: string, delYn: string) => void;
  addRow: () => void;
  delRow: () => void;
  addMember: any[];
  setAddMember: any;
  delMember: any;
  temp: string;
  delRowForSearch: () => void;
  onSubmitMemberDelete: () => void;
  checked: boolean;
  excelDownload: () => void;
  data: any;
}

const MenuBar = ({
  onSubmitMemberInfo,
  delRow,
  addMember,
  setAddMember,
  onSubmitMemberDelete,
  delRowForSearch,
  delMember,
  temp,
  checked,
  excelDownload,
  data,
}: memberProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const [member, setMember] = useState({
    loginId: "",
    userNm: "",
    delYn: "",
  });

  const options = [
    { value: "", text: "ALL" },
    { value: "N", text: "N" },
    { value: "Y", text: "Y" },
  ];

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    setMember({ ...member, [e.target.id]: e.target.value });
  };

  const onExit = (e: ChangeEvent<HTMLFormElement>) => {
    //e.preventDefault();
    onSubmitMemberInfo("asdfsdf", "slslls", "member.delYn");
  };

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmitMemberInfo(member.loginId, member.userNm, member.delYn);
  };

  const [preActorId, setPreActorId] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const onClickUser = (userId: string) => {
    setPreActorId(userId);
  };

  const onSubmitUserPostInfo = () => {
    console.log("등록 눌렀을 때 check값 확인 >>>> ", !checked);
    if (checked == false) {
      alert(
        "등록할 사용자를 선택해주세요\n\n선택 경로: 행추가 > 사용자조회 > 사용자선택 > 체크박스 선택 및 등록 "
      );
    } else if (checked == true) {
      dispatch(postUserMemberAsync.request(addMember));
      alert("성공적으로 등록되었습니다! ");
      delRowForSearch();
      onSubmitMemberInfo(member.loginId, member.userNm, member.delYn);
    }
  };

  return (
    <>
      <div
        style={{
          marginRight: 50,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: 5,
        }}
      >
        <Form
          onSubmit={onSubmit}
          onClick={() => delRowForSearch()}
          style={{ margin: 3 }}
        >
          <Button
            type="submit"
            className="buttonStyle"
            useState
            size="sm"
            outline
          >
            조회
          </Button>
        </Form>
        <Button
          className="buttonStyle"
          onClick={onSubmitUserPostInfo}
          style={{ margin: 3 }}
          size="sm"
          outline
        >
          등록
        </Button>
        <Button
          onClick={() => {
            setOpenModal((openModal) => !openModal);
          }}
          style={{ margin: 3 }}
          size="sm"
          outline
        >
          행추가
        </Button>
        {openModal && (
          <SearchUser
            onClickUser={onClickUser}
            isOpen={openModal}
            closeModal={() => setOpenModal((openModal) => !openModal)}
            addMember={addMember}
            setAddMember={setAddMember}
          ></SearchUser>
        )}

        <Button
          onClick={() => delRow()}
          style={{ margin: 3 }}
          size="sm"
          outline
        >
          행삭제
        </Button>
        <Button type="submit" onClick={() => excelDownload()} size="sm" outline>
          엑셀 Export
        </Button>
        <Button
          onClick={onSubmitMemberDelete}
          style={{ margin: 3 }}
          size="sm"
          outline
        >
          삭제
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "left",
        }}
      >
        <Table bordered style={{ width: 800, marginLeft: 35 }}>
          <tr>
            <td
              style={{
                textAlign: "center",
                backgroundColor: "#ced6e0",
                margin: 1,
              }}
            >
              사용자명
            </td>
            <td>
              <Input
                style={{
                  boxShadow: "none",
                  borderRadius: 0,
                }}
                id="userNm"
                name="userNm"
                type={"text"}
                onChange={search}
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
                onChange={search}
                style={{
                  boxShadow: "none",
                  borderRadius: 0,
                }}
              ></Input>
            </td>
            <td
              style={{
                textAlign: "center",
                backgroundColor: "#ced6e0",
                margin: 1,
              }}
            >
              삭제여부
            </td>
            <td>
              <div>
                <Input
                  type="select"
                  onChange={(e) =>
                    setMember({ ...member, delYn: e.target.value })
                  }
                  id="delYn"
                  name="delYn"
                  style={{
                    boxShadow: "none",
                    borderRadius: 0,
                  }}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </Input>
              </div>
            </td>
          </tr>
        </Table>
      </div>
    </>
  );
};

export default MenuBar;
