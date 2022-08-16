import { RootState } from "modules";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContractMemberAsync,
  getContractMemberAsync,
  postUserMemberAsync,
} from "modules/contractMember/actions";
import { Card, Table } from "reactstrap";
import MenuBar from "./MenuBar";
import Header from "./header/Header";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const CommonInfoList = () => {
  const { data } = useSelector(
    (state: RootState) => state.contractmember.contractMemberList
  );
  const [isAdd, setIsAdd] = useState<any[]>([]);
  const [addMember, setAddMember] = useState<any>([]);
  const [delMember, setDelMem] = useState<any>("");
  const [checked, setChecked] = useState(false);
  let temp = "";

  const dispatch = useDispatch();
  const onSubmitMemberInfo = (loginId: any, userNm: any, delYn: any) => {
    const params = {
      loginId: loginId,
      userNm: userNm,
      delYn: delYn,
    };

    dispatch(getContractMemberAsync.request(params));
  };

  const onChangeManagerCheckBox = (delMember: any) => {
    temp = delMember;
  };

  const onSubmitMemberDelete = () => {
    if (temp.length == 0) {
      alert("삭제할 계약담당자를 선택해주세요");
    } else {
      dispatch(deleteContractMemberAsync.request(temp));
      alert("성공적으로 삭제되었습니다!");
      onSubmitMemberInfo("", "", "");
    }
  };

  //엑셀 구현
  const excelFileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const excelFileExtension = ".xlsx";
  const excelFileName = "작성자";

  const excelDownload = (excelData: any) => {
    const ws = XLSX.utils.aoa_to_sheet([
      [
        "사용자이름",
        "로그인ID",
        "이메일",
        "직번",
        "부서",
        "등록일",
        "삭제일",
        "삭제여부",
      ],
    ]);
    excelData.map((exportData: any) => {
      XLSX.utils.sheet_add_aoa(
        ws,
        [
          [
            exportData.userNm,
            exportData.loginId,
            exportData.email,
            exportData.employeeNumber,
            exportData.deptNm,
            exportData.insDate,
            exportData.updDate,
            exportData.delYn,
          ],
        ],
        { origin: -1 }
      );
      ws["!cols"] = [{ wpx: 200 }, { wpx: 200 }];
      return false;
    });
    const wb: any = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelButter = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelFile = new Blob([excelButter], { type: excelFileType });
    FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
  };

  return (
    <>
      <div>
        <header>
          <div
            style={{
              marginTop: 0,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 0,
            }}
          >
            <div
              style={{
                margin: "0",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <h5>계약 담당자 등록</h5>
            </div>
          </div>
        </header>
      </div>
      <Card>
        <MenuBar
          onSubmitMemberInfo={onSubmitMemberInfo}
          addRow={() => setIsAdd([...addMember, {}])}
          delRow={() => {
            //const tmp = [...addMember];
            //addMember.pop();
            setIsAdd(addMember.pop());
          }}
          delRowForSearch={() => {
            const tmp = [...addMember];
            addMember.splice(0);
            setIsAdd(addMember);
          }}
          addMember={addMember}
          setAddMember={setAddMember}
          delMember={delMember}
          temp={temp}
          onSubmitMemberDelete={onSubmitMemberDelete}
          checked={checked}
          excelDownload={() => excelDownload(data)}
          data={data}
        ></MenuBar>
        <div
          style={{
            maxHeight: "600px",
            overflowY: "auto",
            width: 1600,
            margin: " 0 auto",
            marginTop: 150,
            marginBottom: 50,
          }}
        >
          <Table bordered>
            <thead>
              <tr className="table-secondary">
                <th></th>
                <th>사용자명</th>
                <th>로그인ID</th>
                <th>EMAIL</th>
                <th>직번</th>
                <th>부서</th>
                <th>등록일</th>
                <th>삭제일</th>
                <th>삭제여부</th>
              </tr>
            </thead>
            {data && (
              <tbody>
                <>
                  {data.map((contractmemberInfo, index) => (
                    <tr key={index} aria-rowcount={index}>
                      <td>
                        <input
                          type={"checkbox"}
                          id={contractmemberInfo.userId}
                          onChange={() =>
                            onChangeManagerCheckBox(contractmemberInfo.userId)
                          }
                        ></input>
                      </td>
                      <td key={contractmemberInfo.userId}>
                        {contractmemberInfo.userNm}
                      </td>
                      <td key={contractmemberInfo.userId}>
                        {contractmemberInfo.loginId}
                      </td>
                      <td key={contractmemberInfo.userId}>
                        {contractmemberInfo.email}
                      </td>
                      <td
                        style={{ textAlign: "right" }}
                        key={contractmemberInfo.userId}
                      >
                        {contractmemberInfo.employeeNumber}
                      </td>
                      <td key={contractmemberInfo.userId}>
                        {contractmemberInfo.deptNm}
                      </td>
                      <td
                        style={{ textAlign: "right" }}
                        key={contractmemberInfo.userId}
                      >
                        {contractmemberInfo.insDate}
                      </td>
                      <td
                        style={{ textAlign: "right" }}
                        key={contractmemberInfo.userId}
                      >
                        {contractmemberInfo.updDate}
                      </td>
                      <td key={contractmemberInfo.userId}>
                        {contractmemberInfo.delYn}
                      </td>
                    </tr>
                  ))}

                  {/* {isAdd.map((i) => (
								<AddTable />
							))} */}

                  {addMember.map((data, index) => (
                    <tr key={index} aria-rowcount={index}>
                      <td>
                        <input
                          type={"checkbox"}
                          onChange={() => setChecked(true)}
                        ></input>
                      </td>
                      <td key={data.userId}>{data.userNm}</td>
                      <td key={data.userId}>{data.loginId}</td>
                      <td key={data.userId}>{data.email}</td>
                      <td style={{ textAlign: "right" }} key={data.userId}>
                        {data.employeeNumber}
                      </td>
                      <td key={data.userId}>{data.deptNm}</td>
                      <td style={{ textAlign: "right" }} key={data.userId}>
                        {data.insDate}
                      </td>
                      <td style={{ textAlign: "right" }} key={data.userId}>
                        {data.updDate}
                      </td>
                      <td key={data.userId}>{data.delYn}</td>
                    </tr>
                  ))}
                </>
              </tbody>
            )}
          </Table>
        </div>
      </Card>
    </>
  );
};

export default CommonInfoList;
