import axios from "axios";

function configAxios() {
  axios.defaults.baseURL = "http://localhost:8082/api/v1";
}

export default configAxios;
