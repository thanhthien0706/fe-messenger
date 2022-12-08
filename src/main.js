import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/src/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSocketIO from "vue-3-socket.io";
import SocketIO from "socket.io-client";

import AxiosConfig from "./config/AxiosConfig";
import { AuthenService } from "./services/AuthenService";
// import getInforUser from "./base/GetInfoUser";

/* 
FORTAWEASOME CUSTOM
*/
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);
library.add(far);
library.add(fab);

/**
 * CSS CONFIG
 */
import "./assets/css/reset.css";

/**
 * COMPONENTs
 */

import Loading from "@/components/Loading.vue";
import CallVideo from "@/components/CallVideo.vue";

AxiosConfig();
AuthenService.initAuthHeader();

/**
 * BASE CONFIG
 */
// getInforUser();

/**
 * SOCKET.IO
 */

const socketConnection = SocketIO("http://localhost:3000");

createApp(App)
  .component("fa", FontAwesomeIcon)
  .component("LoadingView", Loading)
  .component("CallVideoView", CallVideo)
  .use(store)
  .use(router)
  .use(
    new VueSocketIO({
      debug: true,
      connection: socketConnection,
      vuex: {
        store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_",
      },
    })
  )
  .mount("#app");
