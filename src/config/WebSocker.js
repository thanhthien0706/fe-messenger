// import store from "../store";

import { over } from "stompjs";
import SockJS from "sockjs-client";

const connect = () => {
  let sock = new SockJS("http://localhost:8082/ws");
  return over(sock);
};

export { connect };
