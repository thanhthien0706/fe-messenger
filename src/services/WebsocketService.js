import { connect } from "@/config/WebSocker";
import store from "@/store";
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
  const bodyPayload = JSON.parse(payload.body);
  switch (bodyPayload.status) {
    case "ADDFRIEND":
      acceptNotification();
      showNotification(bodyPayload);
      store.dispatch("getListNotificalAddFriend");
      break;
    case "MESSAGE":
      break;
  }
};

const sendNotifiAddFriendByUserName = (formMessage) => {
  stompClient.send("/app/private-notifi", {}, JSON.stringify(formMessage));
};

export { WebsocketService, sendNotifiAddFriendByUserName, stompClient };
