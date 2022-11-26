import axios from "axios";

function configAxios() {
  axios.defaults.baseURL = "http://localhost:3000";
}

export default configAxios;
