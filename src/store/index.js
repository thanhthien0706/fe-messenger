import { createStore } from "vuex";
import { userService } from "../services/UserService";
import { FriendService } from "@/services/FriendService";

export default createStore({
  state: {
    inforUser: null,
    stompClient: null,
    notifiAddFriend: null,
  },
  getters: {
    getInforUser: (state) => state.inforUser,
    getNotifiAddfriends: (state) => state.notifiAddFriend,
  },
  mutations: {
    setDataUserCurrent(state, data) {
      state.inforUser = data;
    },

    setStompClient(state, data) {
      state.stompClient = data;
    },

    setListNotifiAddFriend(state, data) {
      console.log("Nhan data", data);
      state.notifiAddFriend = data;
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

    async getListNotificalAddFriend({ commit }) {
      try {
        const resData = await FriendService.getListNotificalAddFriend();
        console.log("Data addfriend", resData);
        if (resData.status) {
          commit("setListNotifiAddFriend", resData.data);
          return resData;
        } else {
          commit("setListNotifiAddFriend", null);
          return null;
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  modules: {},
});
