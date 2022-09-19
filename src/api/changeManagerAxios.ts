import axios from "axios";
import {
  CntrtChangeInfo,
  CommonInfo,
  ManagerChangeInfo,
} from "modules/changeManager/types";

export async function getContractList(crePersonId: string) {
  const response = await axios.get<Array<CommonInfo>>(
    `http://3.37.155.50:8000/contract/manager/cntrtlist/${crePersonId}`,
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  return response.data;
}

export async function postCntrtChgInfo(managerChangeInfo: ManagerChangeInfo) {
  const response = await axios.post<Array<CntrtChangeInfo>>(
    `http://3.37.155.50:8000/contract/manager/chginfo`,
    managerChangeInfo,
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  return response.data;
}

export async function putCntrtChgInfo(seqNoArray: number[]) {
  const response = await axios.put<boolean>(
    `http://3.37.155.50:8000/contract/manager/chginfo`,
    seqNoArray,
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  return response.data;
}

export async function delCntrtChgInfo(seqNoParam: string) {
  const response = await axios.delete<boolean>(
    `http://3.37.155.50:8000/contract/manager/chginfo/${seqNoParam}`,
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  return response.data;
}
