import axios from "axios";

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
};

export { userService };
