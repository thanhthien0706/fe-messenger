import { createStore } from "vuex";
import { userService } from "@/services/UserService";

export default createStore({
  state: {
    inforMe: null,
    stompClient: null,
    notifiAddFriend: null,
  },
  getters: {
    getInforMe: (state) => state.inforMe,
    getNotifiAddfriends: (state) => state.notifiAddFriend,
  },
  mutations: {
    setDataMe(state, data) {
      if (data) {
        state.inforMe = data;
      } else {
        state.inforMe = null;
      }
    },
  },
  actions: {
    async getMe({ commit }) {
      try {
        const dataRef = await userService.getMe();
        if (dataRef.status) {
          commit("setDataMe", dataRef.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
