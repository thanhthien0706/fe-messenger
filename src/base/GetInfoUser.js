import store from "../store";

const getInforUser = async () => {
  const checkUser = store.state.inforUser == null ? true : false;
  if (checkUser) {
    const ref = await store.dispatch("getDataUser");
    if (ref.status) {
      store.commit("setDataUserCurrent", ref.data);
    }
  }
};

export default getInforUser;
