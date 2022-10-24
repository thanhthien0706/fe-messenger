import { createStore } from "vuex";
import { userService } from "../services/UserService";

export default createStore({
  state: {
    inforUser: null,
    stompClient: null,
  },
  getters: {
    getInforUser: (state) => state.inforUser,
  },
  mutations: {
    setDataUserCurrent(state, data) {
      state.inforUser = data;
    },

    setStompClient(state, data) {
      state.stompClient = data;
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
