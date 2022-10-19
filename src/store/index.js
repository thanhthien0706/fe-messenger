import { createStore } from "vuex";
import { userService } from "../services/UserService";

export default createStore({
  state: {
    inforUser: null,
  },
  getters: {},
  mutations: {
    setDataUserCurrent(state, data) {
      state.inforUser = data;
    },
  },
  actions: {
    async getDataUser({ commit }) {
      const resData = await userService.getMe();
      if (resData.status) {
        commit("setDataUserCurrent", resData.data);
        return resData;
      } else {
        commit("setDataUserCurrent", null);
        return null;
      }
    },
  },
  modules: {},
});
