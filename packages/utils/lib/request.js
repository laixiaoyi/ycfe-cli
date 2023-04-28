import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:7001';

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
});

const onSuccess = response => Promise.resolve(response.data);
const onFailed = error => Promise.reject(new Error(error));
service.interceptors.response.use(onSuccess, onFailed);

export default service;