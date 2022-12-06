import axios from "axios";
import { ref } from "vue";

const isPending = ref(null);

const mainUrl = "/message";

const messageService = {
  async getListMessage(idConversation) {
    isPending.value = true;
    try {
      const dataRef = await axios.get(
        `${mainUrl}?conversationId=${idConversation}`
      );

      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      isPending.value = false;
    }
  },
};

export { messageService, isPending };
