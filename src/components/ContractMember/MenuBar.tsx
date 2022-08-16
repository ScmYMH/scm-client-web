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
        <Form onSubmit={onSubmit} onClick={() => delRowForSearch()}>
          <Button type="submit" className="buttonStyle" useState>
            조회
          </Button>
        </Form>
        <Button className="buttonStyle" onClick={onSubmitUserPostInfo}>
          등록
        </Button>
        <Button
          onClick={() => {
            setOpenModal((openModal) => !openModal);
          }}
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

        <Button onClick={() => delRow()}>행삭제</Button>
        <Button type="submit" onClick={() => excelDownload()}>
          엑셀 Export
        </Button>
        <Button onClick={onSubmitMemberDelete}>삭제</Button>
        <Form onSubmit={onExit}>
          <Button type="submit">닫기</Button>
        </Form>
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
            <td>사용자명</td>
            <td>
              <Input
                id="userNm"
                name="userNm"
                type={"text"}
                onChange={search}
              ></Input>
            </td>
            <td>로그인ID</td>
            <td>
              <Input id="loginId" name="loginId" onChange={search}></Input>
            </td>
            <td>삭제여부</td>
            <td>
              <select
                onChange={(e) =>
                  setMember({ ...member, delYn: e.target.value })
                }
                style={{ width: "100%" }}
                id="delYn"
                name="delYn"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </Table>
      </div>
    </>
  );
};

export default MenuBar;
