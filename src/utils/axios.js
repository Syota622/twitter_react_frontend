import axios from 'axios';

// axiosインスタンスを作成
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default instance;
