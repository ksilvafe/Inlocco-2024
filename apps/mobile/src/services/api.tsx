import axios from 'axios';

//const HOST = 'http://10.0.2.2:3333';
//const HOST = 'http://localhost:3333';
//const HOST = 'https://inlocco-uploads.s3.amazonaws.com';
// const baseURL = 'https://api.inlocco.com.br:342';
const HOST = 'http://localhost:3333';
const api = axios.create({
  baseURL: `${HOST}/api/v1`,
});

export {api, HOST};
//export default api;
