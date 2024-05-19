import axios from "axios";

const HOST = "https://nominatim.openstreetmap.org";
const openstreetmap = axios.create({
  baseURL: `${HOST}`,
});

export { openstreetmap, HOST };
//export default api;
