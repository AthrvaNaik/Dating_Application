import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend server URL
  withCredentials: true, // Ensures cookies are sent with the request
});
