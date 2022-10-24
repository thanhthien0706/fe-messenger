import { connect } from "@/config/WebSocker";
import {
  acceptNotification,
  showNotification,
} from "../utils/ShowNotifiDesktop";

let stompClient;
let newMyInfor;

const WebsocketService = (myInfor) => {
  try {
    newMyInfor = myInfor;
    stompClient = connect();
    stompClient.connect({}, onConnected, onError);
  } catch (error) {
    console.log(error.message);
  }
};

const onConnected = () => {
  try {
    stompClient.subscribe(
      "/user/" + newMyInfor.username + "/private-notifi",
      onNotifiPrivateReceiced
    );
  } catch (error) {
    console.log(error.message);
  }
};

const onError = (err) => {
  console.log(err);
};

const onNotifiPrivateReceiced = (payload) => {
  console.log(payload);
  acceptNotification();
  showNotification();
};

export { WebsocketService, stompClient };
