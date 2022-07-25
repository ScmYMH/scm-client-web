import { ContractMemberInfo } from 'api/contractMemberAxios';
import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';

export const GET_CONTRACT_MEMBER = 'contractmember/GET_CONTRACT_MEMBER';
export const GET_CONTRACT_MEMBER_SUCCESS = 'contractmember/GET_CONTRACT_MEMBER_SUCCESS';
export const GET_CONTRACT_MEMBER_ERROR = 'contractmember/GET_CONTRACT_MEMBER_ERROR';

export const getContractMemberAsync = createAsyncAction(
	GET_CONTRACT_MEMBER,
	GET_CONTRACT_MEMBER_SUCCESS,
	GET_CONTRACT_MEMBER_ERROR,
)<string, Array<ContractMemberInfo>, AxiosError>();
