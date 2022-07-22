import axios from 'axios';
import { authHeader } from './authHeader';

const API_URL = 'http://localhost:9000/';

export const getUserBoard = () => {
    return axios.get(API_URL + 'user');
}