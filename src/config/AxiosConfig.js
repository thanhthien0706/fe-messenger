import axios from "axios";

function configAxios() {
  // axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.baseURL = "https://api-dacs4.vercel.app/";
}

export default configAxios;
