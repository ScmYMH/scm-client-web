import { ContractMemberInfo } from 'api/contractMemberAxios';
import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import { UserMemberInfo } from 'api/userMember';

export const GET_CONTRACT_MEMBER = 'contractmember/GET_CONTRACT_MEMBER';
export const GET_CONTRACT_MEMBER_SUCCESS = 'contractmember/GET_CONTRACT_MEMBER_SUCCESS';
export const GET_CONTRACT_MEMBER_ERROR = 'contractmember/GET_CONTRACT_MEMBER_ERROR';

export const POST_USER_LIST = 'contractmember/POST_USER_LIST';
export const POST_USER_LIST_SUCCESS = 'contractmember/POST_USER_LIST_SUCCESS';
export const POST_USER_LIST_ERROR = 'contractmember/POST_USER_LIST_ERROR';

export const DELETE_CONTRACT_MEMBER = 'contractmember/DELETE_CONTRACT_MEMBER';
export const DELETE_CONTRACT_MEMBER_SUCCESS = 'contractmember/DELETE_CONTRACT_MEMBER_SUCCESS';
export const DELETE_CONTRACT_MEMBER_ERROR = 'contractmember/DELETE_CONTRACT_MEMBER_ERROR';

export const getContractMemberAsync = createAsyncAction(
	GET_CONTRACT_MEMBER,
	GET_CONTRACT_MEMBER_SUCCESS,
	GET_CONTRACT_MEMBER_ERROR,
)<any, Array<ContractMemberInfo>, AxiosError>();

export const postUserMemberAsync = createAsyncAction(POST_USER_LIST, POST_USER_LIST_SUCCESS, POST_USER_LIST_ERROR)<
	any[],
	Array<ContractMemberInfo>,
	AxiosError
>();

export const deleteContractMemberAsync = createAsyncAction(
	DELETE_CONTRACT_MEMBER,
	DELETE_CONTRACT_MEMBER_SUCCESS,
	DELETE_CONTRACT_MEMBER_ERROR,
)<any, String, AxiosError>();
