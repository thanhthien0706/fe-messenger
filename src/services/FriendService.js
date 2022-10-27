import axios from "axios";
import { ref } from "vue";

const isPending = ref(null);

const mainUrl = "/friend";

const FriendService = {
  async searchUser(textString) {
    isPending.value = true;
    try {
      const dataRef = await axios.get(`${mainUrl}?text_search=${textString}`);

      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      isPending.value = false;
    }
  },

  async addFriend(formInfor) {
    try {
      const dataRef = await axios.post(`${mainUrl}/add-friend`, formInfor);

      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async getListNotificalAddFriend() {
    try {
      const dataRef = await axios.get(`${mainUrl}/list-addfriend`);

      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async handleAccessAddFriend(idFriend, status) {
    try {
      const dataRef = await axios.post(
        `${mainUrl}/response-addfriend?id-friend=${idFriend}&status=${status}`
      );

      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    }
  },
};

export { FriendService, isPending };
