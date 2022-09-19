import { RootState } from "modules";
import { getDestInfoAsync, getLccInfoAsync } from "modules/tariff/actions";
import { DestInfoParam, LccInfoParam } from "modules/tariff/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalHeader, Table } from "reactstrap";

const SearchManager = ({
  isOpen,
  closeModal,
  onClickLcc,
}: {
  isOpen: boolean;
  closeModal: () => void;
  onClickLcc: (lccCd: string, subLccCd: string, lccCdDesc: string) => void;
}) => {
  return (
    <Modal isOpen={isOpen} toggle={closeModal} size="xl">
      <ModalHeader toggle={closeModal}>물류비계정 조회</ModalHeader>
      <ModalBody>
        <SearchManagerBody closeModal={closeModal} onClickLcc={onClickLcc} />
      </ModalBody>
    </Modal>
  );
};

const SearchManagerBody = ({
  closeModal,
  onClickLcc,
}: {
  closeModal: () => void;
  onClickLcc: (lccCd: string, subLccCd: string, lccCdDesc: string) => void;
}) => {
  const dispatch = useDispatch();

  const {
    data: lccInfoListData,
    loading: lccInfoListLoading,
    error: lccInfoListError,
  } = useSelector((state: RootState) => state.tariff.lccInfoList);

  const [lccInfo, setLccInfo] = useState<LccInfoParam>({
    lccCd: "",
    subLccCd: "",
    lccCdNm: "",
  });

  const onSubmitLccInfo = () => {
    dispatch(getLccInfoAsync.request(lccInfo));
  };

  const onSelect = (lccCd: string, subLccCd: string, lccCdDesc: string) => {
    onClickLcc(lccCd, subLccCd, lccCdDesc);
    closeModal();
  };

  useEffect(() => {
    dispatch(getLccInfoAsync.request(lccInfo));
  }, []);

  return (
    <>
      <div
        style={{
          display: "inline-block",
          margin: "10px",
          verticalAlign: "center",
          marginBottom: 20,
        }}
      >
        <span style={{ marginRight: "10px" }}>물류비계정</span>
        <input
          id="lccCd"
          name="lccCd"
          type="text"
          style={{ marginRight: "30px" }}
          onChange={(e) => setLccInfo({ ...lccInfo, lccCd: e.target.value })}
        ></input>
        <span style={{ marginRight: "10px" }}>세부물류비</span>
        <input
          id="subLccCd"
          name="subLccCd"
          type="text"
          style={{ marginRight: "30px" }}
          onChange={(e) => setLccInfo({ ...lccInfo, subLccCd: e.target.value })}
        ></input>
        <span style={{ marginRight: "10px" }}>물류비명</span>
        <input
          id="lccCdNm"
          name="lccCdNm"
          type="text"
          style={{ marginRight: "30px" }}
          onChange={(e) => setLccInfo({ ...lccInfo, lccCdNm: e.target.value })}
        ></input>
        <Button className="btn" size="sm" onClick={onSubmitLccInfo} outline>
          조회
        </Button>
      </div>
      <Table bordered className="tableStyle">
        <thead>
          <tr>
            <th>물류비계정</th>
            <th>세부물류비</th>
            <th>물류비명</th>
            <th></th>
          </tr>
        </thead>
        {lccInfoListData && (
          <tbody>
            {lccInfoListData.map((lccInfo, index) => (
              <tr key={index} aria-rowcount={index}>
                <td>{lccInfo.lccCd}</td>
                <td>{lccInfo.subLccCd}</td>
                <td>{lccInfo.lccCdNm}</td>
                <td>
                  <Button
                    size="sm"
                    onClick={() =>
                      onSelect(
                        lccInfo.lccCd,
                        lccInfo.subLccCd,
                        lccInfo.lccCdDesc
                      )
                    }
                    outline
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

export default SearchManager;
