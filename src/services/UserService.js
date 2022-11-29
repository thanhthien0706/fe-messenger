import axios from "axios";
import { ref } from "vue";

const isPending = ref(null);

const mainUrl = "/user";

const userService = {
  async getMe() {
    try {
      const dataRef = await axios.get(`${mainUrl}/me`);
      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async searchUser(textString) {
    isPending.value = true;
    try {
      const dataRef = await axios.get(`${mainUrl}/find?search=${textString}`);

      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      isPending.value = false;
    }
  },
};

export { userService, isPending };
