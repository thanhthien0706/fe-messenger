import axios from "axios";

function configAxios() {
  axios.defaults.baseURL = "http://localhost:3000";
  // axios.defaults.baseURL = "http://api-chat-dacs4.onrender.com/";
}

export default configAxios;
