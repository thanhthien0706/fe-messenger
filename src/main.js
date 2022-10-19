import "bootstrap/dist/css/bootstrap.min.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
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

AxiosConfig();
AuthenService.initAuthHeader();

/**
 * BASE CONFIG
 */
// getInforUser();

createApp(App)
  .component("fa", FontAwesomeIcon)
  .component("LoadingView", Loading)
  .use(store)
  .use(router)
  .mount("#app");

import "bootstrap/dist/js/bootstrap.js";
