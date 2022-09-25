import React, { useEffect, useState } from "react";
import { Button, Card, Input, Table } from "reactstrap";
import {
  delCntrtChgInfoAsync,
  getContractListAsync,
  postCntrtChgInfoAsync,
  putCntrtChgInfoAsync,
} from "modules/changeManager/actions";
import { RootState } from "modules";
import {
  CntrtChangeInfoConfirm,
  ManagerChangeInfo,
} from "modules/changeManager/types";
import { useDispatch, useSelector } from "react-redux";
import SearchManagerModal from "./SearchManagerModal";

import styles from "./changemanager.module.css";
import { HiSearch } from "react-icons/hi";

const ChangeManagerForm = () => {
  const dispatch = useDispatch();

  const {
    data: commonInfoListData,
    loading: commonInfoListLoading,
    error: commonInfoListError,
  } = useSelector((state: RootState) => state.changeManager.commonInfoList);

  const {
    data: cntrtChangeInfoListData,
    loading: cntrtChangeInfoListLoading,
    error: cntrtChangeInfoListError,
  } = useSelector(
    (state: RootState) => state.changeManager.cntrtChangeInfoList
  );

  const [preActorNm, setPreActorNm] = useState("");
  const [aftActorNm, setAftActorNm] = useState("");

  const [isCurrent, setIsCurrent] = useState(true); // true면 현 담당자, false면 인수 담당자

  const [mngChgInfo, setMngChgInfo] = useState<ManagerChangeInfo>({
    cntrtId: [],
    preActorId: "",
    aftActorId: "",
    validDate: "",
    reasonDesc: "",
  });

  const [checkList, setCheckList] = useState<CntrtChangeInfoConfirm>({
    seqNoArray: [],
    cntrtChangeInfoList: null,
  });

  const [allCommonInfoChecked, setAllCommonInfoChecked] = useState(false);
  const [allCntrtChgInfoChecked, setAllCntrtChgInfoChecked] = useState(false);

  const [date, setDate] = useState("");
  const [todayState, setTodayState] = useState(new Date());

  const [openPreModal, setOpenPreModal] = useState(false);
  const [openAftModal, setOpenAftModal] = useState(false);

  const dateToString = (date) => {
    return (
      date.getFullYear() +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      date.getDate().toString().padStart(2, "0")
    );
  };

  const leftPad = (value) => {
    if (value >= 10) {
      return value;
    }
    return `0${value}`;
  };

  const toStringByFormatting = (source, delimiter = "-") => {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());

    return [year, month, day].join(delimiter);
  };

  const onClickMember = (memId: string, memNm: string) => {
    if (isCurrent) {
      // 현 담당자인 경우
      setPreActorNm(memNm);
      setMngChgInfo({ ...mngChgInfo, preActorId: memId });
    } else {
      // 인수 담당자인 경우
      if (memNm === preActorNm) {
        alert("현 담당자와 같습니다. 다시 선택해 주십시오.");
      } else {
        setAftActorNm(memNm);
        setMngChgInfo({ ...mngChgInfo, aftActorId: memId });
      }
    }
  };

  const onChangeCommonInfoCheckBox = (
    e: React.ChangeEvent<HTMLInputElement>,
    paramCntrtId: string
  ) => {
    if (mngChgInfo.cntrtId.find((id) => id === paramCntrtId)) {
      // 있으면 체크가 되어있다는 뜻 => 배열에서 cntrtId 빼기
      const index = mngChgInfo.cntrtId.indexOf(paramCntrtId);
      mngChgInfo.cntrtId.splice(index, 1);
      setMngChgInfo({
        ...mngChgInfo,
        cntrtId: mngChgInfo.cntrtId,
      });
    } else {
      // 체크 안되어 있는 상태 => 배열에 체크한 cntrtId 넣기
      const newCntrtId = [...mngChgInfo.cntrtId, paramCntrtId];
      setMngChgInfo({
        ...mngChgInfo,
        cntrtId: newCntrtId,
      });
    }
  };

  const onChangeCntrtChagneInfoCheckBox = (
    e: React.ChangeEvent<HTMLInputElement>,
    paramSeqNo: number
  ) => {
    if (checkList.seqNoArray.find((id) => id === paramSeqNo)) {
      // 있으면 체크가 되어있다는 뜻 => 배열에서 seqNo 빼기
      const index = checkList.seqNoArray.indexOf(paramSeqNo);
      checkList.seqNoArray.splice(index, 1);
      setCheckList({ ...checkList, seqNoArray: checkList.seqNoArray });
    } else {
      // 체크 안되어 있는 상태 => 배열에 체크한 seqNo 넣기
      const newCntrtId = [...checkList.seqNoArray, paramSeqNo];
      setCheckList({ ...checkList, seqNoArray: newCntrtId });
    }
  };

  const onChangeValidDate = (date: string) => {
    const today = dateToString(new Date());
    if (date < today) {
      alert("오늘보다 이전날짜는 선택할 수 없습니다.");
    } else {
      setDate(date);
      setMngChgInfo({
        ...mngChgInfo,
        validDate: date,
      });
    }
  };

  const onClickApply = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (mngChgInfo.preActorId === "") {
      alert("현 담당자를 선택해주세요");
    } else if (preActorNm.length !== 3) {
      alert("현 담당자를 선택해주세요");
    } else if (mngChgInfo.aftActorId === "") {
      alert("인수 담당자를 선택해주세요");
    } else if (aftActorNm.length !== 3) {
      alert("인수 담당자를 선택해주세요");
    } else if (mngChgInfo.validDate === "") {
      alert("변경 유효 일자를 선택해주세요");
    } else if (mngChgInfo.reasonDesc === "") {
      alert("변경 사유를 입력하세요");
    } else {
      dispatch(postCntrtChgInfoAsync.request(mngChgInfo));
    }
  };

  const onClickConfrim = () => {
    dispatch(putCntrtChgInfoAsync.request(checkList));

    setCheckList({ ...checkList, seqNoArray: [] });
    alert("담당자 변경 확정되었습니다.");
  };

  const onClickCancel = () => {
    let isFail = false;
    checkList.seqNoArray.map((seqNo) => {
      checkList.cntrtChangeInfoList
        ?.filter((cntrtChangeInfo) => seqNo === cntrtChangeInfo.seqNo)
        .map((cntrtChangeInfo) => {
          if (isFail) return;
          if (cntrtChangeInfo.cmptYn === "확정") {
            alert("이미 확정된 계약이 포함되어 있습니다. 다시 선택해 주세요.");
            isFail = true;
          }
        });
    });

    if (isFail) return;

    dispatch(delCntrtChgInfoAsync.request(checkList));
    setCheckList({ ...checkList, seqNoArray: [] });
  };

  useEffect(() => {
    if (mngChgInfo.preActorId !== "")
      dispatch(getContractListAsync.request(mngChgInfo.preActorId));
    setMngChgInfo({
      ...mngChgInfo,
      cntrtId: [],
      aftActorId: "",
      validDate: "",
      reasonDesc: "",
    });
    setAftActorNm("");
  }, [mngChgInfo.preActorId]);

  useEffect(() => {
    setCheckList({
      ...checkList,
      cntrtChangeInfoList: cntrtChangeInfoListData,
    });
  }, [cntrtChangeInfoListData]);

  return (
    <div style={{ margin: "2rem" }}>
      <Table bordered className={styles.chgmng_table}>
        <tbody style={{ textAlign: "left" }}>
          <tr>
            <th
              style={{
                textAlign: "center",
                backgroundColor: "#ced6e0",
                width: "10rem",
                verticalAlign: "middle",
              }}
            >
              현 담당자
            </th>
            <td style={{ width: "33rem" }}>
              <Input
                style={{
                  boxShadow: "none",
                  borderRadius: 0,
                  width: "15rem",
                  display: "inline-block",
                }}
                value={preActorNm}
                type={"text"}
                onChange={(e) => setPreActorNm(e.target.value)}
              ></Input>
              <HiSearch
                style={{ cursor: "pointer", marginLeft: "1rem" }}
                onClick={() => {
                  setOpenPreModal((openPreModal) => !openPreModal);
                  setIsCurrent(true);
                }}
              ></HiSearch>

              {openPreModal && (
                <SearchManagerModal
                  onClickMember={onClickMember}
                  isOpen={openPreModal}
                  closeModal={() =>
                    setOpenPreModal((openPreModal) => !openPreModal)
                  }
                  preActorNm={preActorNm}
                  aftActorNm={aftActorNm}
                  isCurrent={isCurrent}
                />
              )}
            </td>
            <th
              style={{
                textAlign: "center",
                backgroundColor: "#ced6e0",
                width: "10rem",
                verticalAlign: "middle",
              }}
            >
              인수 담당자
            </th>
            <td style={{ width: "33rem" }}>
              <Input
                style={{
                  boxShadow: "none",
                  borderRadius: 0,
                  width: "15rem",
                  display: "inline-block",
                }}
                value={aftActorNm}
                type={"text"}
                onChange={(e) => setAftActorNm(e.target.value)}
              ></Input>
              <HiSearch
                style={{ cursor: "pointer", marginLeft: "1rem" }}
                onClick={() => {
                  setOpenAftModal((openAftModal) => !openAftModal);
                  setIsCurrent(false);
                }}
              ></HiSearch>
              {openAftModal && (
                <SearchManagerModal
                  onClickMember={onClickMember}
                  isOpen={openAftModal}
                  closeModal={() =>
                    setOpenAftModal((openAftModal) => !openAftModal)
                  }
                  preActorNm={preActorNm}
                  aftActorNm={aftActorNm}
                  isCurrent={isCurrent}
                />
              )}
            </td>
          </tr>
          <tr>
            <th
              style={{
                textAlign: "center",
                backgroundColor: "#ced6e0",
                width: "10rem",
                verticalAlign: "middle",
              }}
            >
              변경 발효 일자
            </th>
            <td colSpan={3}>
              {" "}
              <Input
                id="validDate"
                name="validDate"
                type="date"
                selected={date}
                min={toStringByFormatting(new Date())}
                dateFormat="yyyy-MM-dd"
                style={{
                  boxShadow: "none",
                  height: "2.5rem",
                  width: "15rem",
                  borderRadius: 0,
                }}
                onChange={(e) => {
                  onChangeValidDate(e.target.value.replaceAll("-", ""));
                }}
              ></Input>
            </td>
          </tr>
          <tr>
            <th
              rowSpan={2}
              style={{
                textAlign: "center",
                backgroundColor: "#ced6e0",
                margin: "1rem",
                width: "10rem",
                verticalAlign: "middle",
              }}
            >
              변경 사유
            </th>
            <td colSpan={3} rowSpan={2}>
              <Input
                id="reasonDesc"
                name="textarea"
                type="textarea"
                style={{ width: "62rem", borderRadius: 0 }}
                value={mngChgInfo.reasonDesc}
                onChange={(e) =>
                  setMngChgInfo({
                    ...mngChgInfo,
                    reasonDesc: e.target.value,
                  })
                }
              />
            </td>
          </tr>
        </tbody>
      </Table>

      <div
        style={{
          margin: "0.9rem",
          marginTop: "3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: "bold", color: "#003366" }}>
          ◎ 대상계약리스트
        </div>
        <Button
          size="sm"
          outline
          onClick={(e) => {
            onClickApply(e);
          }}
        >
          적용
        </Button>
      </div>
      <div
        style={{
          maxHeight: "13rem",
          overflowY: "auto",
        }}
      >
        <Table
          bordered
          className={styles.chgmng_table}
          style={{ height: "3rem" }}
        >
          <thead style={{ textAlign: "center" }}>
            <tr className="table-secondary">
              <th style={{ width: "1rem" }}></th>
              <th style={{ width: "15rem" }}>계약 ID</th>
              <th>계약명</th>
              <th style={{ width: "8rem" }}>계약상태</th>
              <th style={{ width: "8rem" }}>계약 시작</th>
              <th style={{ width: "8rem" }}>계약 종료</th>
            </tr>
          </thead>
          <tbody>
            {commonInfoListData?.map((commonInfo, index) => (
              <tr key={index}>
                <th scope="row" style={{ textAlign: "center", width: "1rem" }}>
                  <Input
                    type="checkbox"
                    onChange={(e) =>
                      onChangeCommonInfoCheckBox(e, commonInfo.cntrtId)
                    }
                    checked={
                      mngChgInfo.cntrtId.find((id) => id == commonInfo.cntrtId)
                        ? true
                        : false
                    }
                  />
                </th>
                <td
                  style={{
                    textAlign: "right",
                    paddingRight: "1rem",
                    width: "15rem",
                  }}
                >
                  {commonInfo.cntrtId}
                </td>
                <td style={{ paddingLeft: "1rem" }}>{commonInfo.cntrtNm}</td>
                <td style={{ textAlign: "center", width: "12rem" }}>
                  {commonInfo.cntrtScd}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    width: "12rem",
                  }}
                >
                  {commonInfo.cntrtStartDate.slice(0, 4) +
                    "-" +
                    commonInfo.cntrtStartDate.slice(4, 6) +
                    "-" +
                    commonInfo.cntrtStartDate.slice(6)}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    width: "12rem",
                  }}
                >
                  {commonInfo.cntrtEndDate.slice(0, 4) +
                    "-" +
                    commonInfo.cntrtEndDate.slice(4, 6) +
                    "-" +
                    commonInfo.cntrtEndDate.slice(6)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div
        style={{
          margin: "0.9rem",
          marginTop: "3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: "bold", color: "#003366" }}>
          ◎ 재할당 계약
        </div>
        <div>
          <Button
            size="sm"
            onClick={onClickConfrim}
            style={{ marginLeft: "1rem" }}
            outline
          >
            확정
          </Button>
          <Button
            size="sm"
            onClick={onClickCancel}
            style={{ marginLeft: "1rem" }}
            outline
          >
            취소
          </Button>
        </div>
      </div>
      <div
        style={{
          maxHeight: "13rem",
          overflowY: "auto",
        }}
      >
        <Table
          bordered
          className={styles.chgmng_table}
          style={{ height: "3rem", whiteSpace: "nowrap" }}
        >
          <thead style={{ textAlign: "center" }}>
            <tr className="table-secondary">
              <th style={{ width: "1rem" }}></th>
              <th style={{ width: "15rem" }}>계약 ID</th>
              <th style={{ width: "20rem" }}>계약명</th>
              <th style={{ width: "7rem" }}>현담당자</th>
              <th style={{ width: "7rem" }}>인수담당자</th>
              <th style={{ width: "12rem" }}>변경발효일자</th>
              <th style={{ width: "5rem" }}>변경확정여부</th>
              <th>변경사유</th>
            </tr>
          </thead>
          <tbody>
            {cntrtChangeInfoListData?.map((cntrtChangeInfo, index) => (
              <tr key={index} style={{ whiteSpace: "nowrap" }}>
                <th scope="row" style={{ textAlign: "center", width: "1rem" }}>
                  <Input
                    type="checkbox"
                    // onChange={(e) =>
                    // 	onChangeCntrtChagneInfoCheckBox(e, cntrtChangeInfo.seqNo)
                    // }
                    onChange={(e) =>
                      onChangeCntrtChagneInfoCheckBox(e, cntrtChangeInfo.seqNo)
                    }
                    checked={
                      checkList.seqNoArray.find(
                        (id) => id == cntrtChangeInfo.seqNo
                      )
                        ? true
                        : false
                    }
                  />
                </th>
                <td
                  style={{
                    textAlign: "right",
                    paddingRight: "1rem",
                    width: "15rem",
                  }}
                >
                  {cntrtChangeInfo.cntrtId}
                </td>
                <td style={{ paddingLeft: "1rem", width: "20rem" }}>
                  {cntrtChangeInfo.cntrtNm}
                </td>
                <td style={{ textAlign: "center", width: "7rem" }}>
                  {cntrtChangeInfo.preActorNm}
                </td>
                <td style={{ textAlign: "center", width: "7rem" }}>
                  {cntrtChangeInfo.aftActorNm}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    width: "12rem",
                  }}
                >
                  {cntrtChangeInfo.validDate.slice(0, 4) +
                    "-" +
                    cntrtChangeInfo.validDate.slice(4, 6) +
                    "-" +
                    cntrtChangeInfo.validDate.slice(6)}
                </td>
                <td style={{ textAlign: "center", width: "5rem" }}>
                  {cntrtChangeInfo.cmptYn}
                </td>
                <td style={{ paddingLeft: "1rem" }}>
                  {cntrtChangeInfo.reasonDesc}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ChangeManagerForm;
