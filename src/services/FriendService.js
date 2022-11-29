import axios from "axios";
import { ref } from "vue";

const isPending = ref(null);

const mainUrl = "/friend";

const FriendService = {
  async addFriend(formInfor) {
    try {
      const dataRef = await axios.post(`${mainUrl}/send-invitation`, formInfor);

      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async getListNotificalAddFriend() {
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
