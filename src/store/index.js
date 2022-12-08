import { createStore } from "vuex";
import { userService } from "@/services/UserService";
import { FriendService } from "@/services/FriendService";
import { ConversationService } from "@/services/ConversationService";

export default createStore({
  state: {
    inforMe: null,
    listFriends: null,
    listGroupChats: null,
    groupCurrent: 0,
    messageCurrent: [],
    stompClient: null,
    notifiAddFriend: null,
    idPeer: null,
    peerObject: null,
    connectPeerObject: null,
  },
  getters: {
    getConnectPeerObject: (state) => state.connectPeerObject,
    getPeerObject: (state) => state.peerObject,
    getInforMe: (state) => state.inforMe,
    getListFriends: (state) => state.listFriends,
    getListGroupChats: (state) => state.listGroupChats,
    getGroupCurrent: (state) => state.groupCurrent,
    getMessageCurrent: (state) => state.messageCurrent,
    getNotifiAddfriends: (state) => state.notifiAddFriend,
    getPeerId: (state) => state.idPeer,
  },
  mutations: {
    PEER_OBJECT(state, object) {
      state.peerObject = object;
    },
    CONNECT_PEER_OBJECT(state, object) {
      state.peerObject = object;
    },
    PEER_OPEN(state, id) {
      state.idPeer = id;
    },
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

    setListGroupChats(state, data) {
      if (data) {
        state.listGroupChats = data;
        state.groupCurrent = data[0];
      } else {
        state.listGroupChats = null;
      }
    },

    addGroupChatToGroups(state, data) {
      state.listGroupChats.push(data);
    },

    setGroupCurrent(state, data) {
      state.groupCurrent = data;
    },

    setMessageCurrent(state, data) {
      state.messageCurrent = data;
    },

    setAddMessageCurrent(state, data) {
      state.messageCurrent.push(data);
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

    async findListGroupChats({ commit }) {
      try {
        const dataRef = await ConversationService.getAllConversations();
        if (dataRef.status) {
          commit("setListGroupChats", dataRef.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
