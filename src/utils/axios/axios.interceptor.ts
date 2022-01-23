import axios from 'axios';

export default axios.create({
  withCredentials: true,
  headers: { accept: 'application/json' },
  baseURL: 'http://localhost:3000',
});
