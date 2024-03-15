// axios.js
import axios from 'axios';

// axiosインスタンスを作成
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// リクエストインターセプターを追加
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

export default instance;
