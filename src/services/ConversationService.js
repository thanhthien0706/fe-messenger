import axios from "axios";
import { ref } from "vue";

const isPending = ref(null);

const mainUrl = "/conversation";

const ConversationService = {
  async getAllConversations() {
    isPending.value = true;
    try {
      const dataRef = await axios.get(`${mainUrl}/all`);
      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      isPending.value = false;
    }
  },

  async createConversation(idUser1) {
    try {
      const dataRef = await axios.post(`${mainUrl}/create`, {
        idUser1: idUser1,
      });
      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async joinGroup(idUser, idConvertion) {
    try {
      const dataRef = await axios.post(`${mainUrl}/joinGroupChat`, {
        idUser: idUser,
        idConversation: idConvertion,
      });
      return dataRef.data;
    } catch (err) {
      console.log(err.message);
    }
  },
};

export { ConversationService, isPending };
