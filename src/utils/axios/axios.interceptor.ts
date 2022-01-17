import axios from 'axios';

export default axios.create({
  withCredentials: true,
  headers: { accept: 'application/json' },
});
