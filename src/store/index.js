import { createStore } from "vuex";
import { userService } from "@/services/UserService";
import { FriendService } from "@/services/FriendService";

export default createStore({
  state: {
    inforMe: null,
    listFriends: null,
    stompClient: null,
    notifiAddFriend: null,
  },
  getters: {
    getInforMe: (state) => state.inforMe,
    getListFriends: (state) => state.listFriends,
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
    setListFriends(state, data) {
      if (data) {
        state.listFriends = data;
      } else {
        state.listFriends = null;
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

    async getListFriends({ commit }) {
      try {
        const dataRef = await FriendService.getListFriends();
        if (dataRef.status) {
          commit("setListFriends", dataRef.data[0].dataFriends);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
