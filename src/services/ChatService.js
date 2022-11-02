import axios from "axios";
import { ref } from "vue";

const isPending = ref(null);

const mainUrl = "chat";

const ChatService = {
  async getGroupChat() {
    isPending.value = true;
    try {
      const dataRef = await axios.get(`${mainUrl}/group-chat`);
      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      isPending.value = false;
    }
  },
};

export { ChatService, isPending };
