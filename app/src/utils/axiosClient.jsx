import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://forms-3n00.onrender.com',
  withCredentials: true,
});

export default axiosClient;
