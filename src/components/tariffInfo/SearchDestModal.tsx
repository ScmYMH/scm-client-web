import { RootState } from "modules";
import { getDestInfoAsync } from "modules/tariff/actions";
import { DestInfo, DestInfoParam } from "modules/tariff/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalHeader, Table } from "reactstrap";

const SearchManager = ({
  isOpen,
  closeModal,
  onClickNode,
  nodeNm,
  whatNode,
}: {
  isOpen: boolean;
  closeModal: () => void;
  onClickNode: (nodeCd: string, nodeDesc: string) => void;
  nodeNm: any;
  whatNode: string;
}) => {
  return (
    <Modal isOpen={isOpen} toggle={closeModal} size="xl">
      <ModalHeader toggle={closeModal}>목적지 조회</ModalHeader>
      <ModalBody>
        <SearchManagerBody
          closeModal={closeModal}
          onClickNode={onClickNode}
          nodeNm={nodeNm}
          whatNode={whatNode}
        />
      </ModalBody>
    </Modal>
  );
};

const SearchManagerBody = ({
  closeModal,
  onClickNode,
  nodeNm,
  whatNode,
}: {
  closeModal: () => void;
  onClickNode: (nodeCd: string, nodeDesc: string) => void;
  nodeNm: any;
  whatNode: string;
}) => {
  const dispatch = useDispatch();

  const {
    data: destInfoListData,
    loading: destInfoListLoading,
    error: destInfoListError,
  } = useSelector((state: RootState) => state.tariff.destInfoList);

  const [destInfoState, setDestInfoState] = useState(destInfoListData);

  const [nodeInfo, setNodeInfo] = useState<DestInfoParam>({
    nodeCd: "",
    nodeDesc: "",
    nationNm: "",
    nationCd: "",
  });

  const onSubmitNodeInfo = () => {
    if (destInfoListData !== null) {
      const temp = destInfoListData.filter((destInfo) => {
        if (
          destInfo.nodeCd.includes(nodeInfo.nodeCd) &&
          destInfo.nodeDesc.includes(nodeInfo.nodeDesc) &&
          destInfo.nationCd.includes(nodeInfo.nationCd) &&
          destInfo.nationNm.includes(nodeInfo.nationNm)
        )
          return true;
      });
      setDestInfoState(temp);
    }
  };

  const onSelect = (nodeCd: string, nodeDesc: string) => {
    onClickNode(nodeCd, nodeDesc);
    closeModal();
  };

  useEffect(() => {
    dispatch(getDestInfoAsync.request());
  }, []);
  useEffect(() => {
    setDestInfoState(destInfoListData);
  }, [destInfoListData]);

  return (
    <>
      <div
        style={{
          display: "inline-block",
          margin: "10px",
          verticalAlign: "center",
        }}
      >
        <span style={{ marginRight: "10px" }}>목적지명</span>
        <input
          id="nodeDesc"
          name="nodeDesc"
          type="text"
          style={{ width: "170px", marginRight: "20Px" }}
          onChange={(e) =>
            setNodeInfo({ ...nodeInfo, nodeDesc: e.target.value })
          }
        ></input>
        <span style={{ marginRight: "10px" }}>목적지코드</span>
        <input
          id="nodeCd"
          name="nodeCd"
          type="text"
          style={{ width: "150px", marginRight: "20px" }}
          onChange={(e) => setNodeInfo({ ...nodeInfo, nodeCd: e.target.value })}
        ></input>
        <span style={{ marginRight: "10px" }}>국가명</span>
        <input
          id="nationNm"
          name="nationNm"
          type="text"
          style={{ width: "170px", marginRight: "20px" }}
          onChange={(e) =>
            setNodeInfo({ ...nodeInfo, nationNm: e.target.value })
          }
        ></input>
        <span style={{ marginRight: "10px" }}>국가코드</span>
        <input
          id="nationCd"
          name="nationCd"
          type="text"
          style={{ width: "150px", marginRight: "40px" }}
          onChange={(e) =>
            setNodeInfo({ ...nodeInfo, nationCd: e.target.value })
          }
        ></input>
        <Button className="btn" onClick={onSubmitNodeInfo} size="sm">
          조회
        </Button>
      </div>
      <Table bordered className="tableStyle">
        <thead>
          <tr>
            <th>목적지코드</th>
            <th>목적지명</th>
            <th>국가명</th>
            <th>국가코드</th>
            <th></th>
          </tr>
        </thead>
        {destInfoState && (
          <tbody>
            {destInfoState.map((destInfo, index) => (
              <tr key={index} aria-rowcount={index}>
                <td>{destInfo.nodeCd}</td>
                <td>{destInfo.nodeDesc}</td>
                <td>{destInfo.nationNm}</td>
                <td>{destInfo.nationCd}</td>
                <td>
                  <Button
                    size="sm"
                    onClick={() => onSelect(destInfo.nodeCd, destInfo.nodeDesc)}
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
