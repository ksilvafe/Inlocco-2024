import axios from 'axios';

//const HOST = 'http://10.0.2.2:3333';
//const HOST = 'http://localhost:3333';
//const HOST = 'https://inlocco-uploads.s3.amazonaws.com';
const HOST = 'https://api.inlocco.com.br:342/uploads';
const baseURL = 'https://api.inlocco.com.br:342';
const api = axios.create({
  baseURL: `${baseURL}/api/v1`,
});

export {api, HOST};
//export default api;
