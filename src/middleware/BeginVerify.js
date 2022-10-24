import store from "../store";
import { AuthenService } from "../services/AuthenService";

async function checkLogin({ next, router }) {
  try {
    const token = localStorage.getItem("userToken");
    const getUserData = store.state.inforUser;
    if (token && token !== "") {
      if (getUserData == null) {
        await store.dispatch("getDataUser");
      }
      return next();
    } else {
      return router.push({ name: "signin-page" });
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function checkEntityResetPassword({ next, router, to }) {
  if (to.query.token) {
    try {
      const ref = await AuthenService.changePassword(to.query.token);
      if (ref.status) {
        return next();
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return router.push({ name: "signin-page" });
}

export { checkLogin, checkEntityResetPassword };
