import store from "../store";

async function checkLogin({ next, router }) {
  try {
    const token = localStorage.getItem("userToken");
    const getUserData = store.state.inforUser;
    if (token && token !== "") {
      if (getUserData != null) {
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

export { checkLogin };
