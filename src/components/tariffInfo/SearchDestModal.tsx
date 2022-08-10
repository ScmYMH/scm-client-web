import { RootState } from "modules";
import { getDestInfoAsync } from "modules/tariff/actions";
import { DestInfoParam } from "modules/tariff/types";
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
      <ModalHeader toggle={closeModal}>계약 담당자 조회</ModalHeader>
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

  const [nodeInfo, setNodeInfo] = useState<DestInfoParam>({
    nodeCd: "",
    nodeDesc: "",
    nationNm: "",
  });

  const onSubmitNodeInfo = () => {
    dispatch(getDestInfoAsync.request(nodeInfo));
  };

  const onSelect = (nodeCd: string, nodeDesc: string) => {
    onClickNode(nodeCd, nodeDesc);
    closeModal();
  };

  useEffect(() => {
    // if (whatNode === "departCond") {
    //   // 출발지 cond 선택하는 경우
    //   dispatch(
    //     getContractMemberAsync.request({
    //       ...nodeInfo,
    //       nodeDesc: nodeNm.departNodeNm,
    //     })
    //   );
    // } else if (whatNode === "arrivalCond") {
    //   // 도착지 cond 선택하는 경우
    //   dispatch(
    //     getContractMemberAsync.request({
    //       ...nodeInfo,
    //       nodeDesc: nodeNm.arrivalNodeNm,
    //     })
    //   );
    // }
    dispatch(getDestInfoAsync.request(nodeInfo));
  }, []);

  return (
    <>
      <div
        style={{
          display: "inline-block",
          margin: "10px",
          verticalAlign: "center",
        }}
      >
        <span style={{ marginRight: "10px" }}>노드명</span>
        <input
          id="nodeDesc"
          name="nodeDesc"
          type="text"
          style={{ marginRight: "30px" }}
          onChange={(e) =>
            setNodeInfo({ ...nodeInfo, nodeDesc: e.target.value })
          }
        ></input>
        <span style={{ marginRight: "10px" }}>노드코드</span>
        <input
          id="nodeCd"
          name="nodeCd"
          type="text"
          style={{ marginRight: "30px" }}
          onChange={(e) => setNodeInfo({ ...nodeInfo, nodeCd: e.target.value })}
        ></input>
        <span style={{ marginRight: "10px" }}>국가</span>
        <input
          id="nationCd"
          name="nationCd"
          type="text"
          style={{ marginRight: "30px" }}
          onChange={(e) =>
            setNodeInfo({ ...nodeInfo, nationNm: e.target.value })
          }
        ></input>
        <Button className="btn" size="sm" onClick={onSubmitNodeInfo}>
          조회
        </Button>
      </div>
      <Table bordered className="tableStyle">
        <thead>
          <tr>
            <th>노드코드</th>
            <th>노드명</th>
            <th>국가</th>
            <th></th>
          </tr>
        </thead>
        {destInfoListData && (
          <tbody>
            {destInfoListData.map((destInfo, index) => (
              <tr key={index} aria-rowcount={index}>
                <td>{destInfo.nodeCd}</td>
                <td>{destInfo.nodeDesc}</td>
                <td>{destInfo.nationNm}</td>
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
