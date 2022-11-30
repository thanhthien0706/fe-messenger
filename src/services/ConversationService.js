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
};

export { ConversationService, isPending };
