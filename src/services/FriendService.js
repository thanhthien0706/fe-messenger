import axios from "axios";
import { ref } from "vue";

const isPending = ref(null);

const FriendService = {
  async searchUser(textString) {
    isPending.value = true;
    try {
      const dataRef = await axios.get(`/friend?text_search=${textString}`);

      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      isPending.value = false;
    }
  },
};

export { FriendService, isPending };
