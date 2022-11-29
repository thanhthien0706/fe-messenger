<template>
  <div class="box-content-child" v-if="notifiAddfriend">
    <h6 class="pb-4">
      Lời mời kết bạn({{ notifiAddfriend ? notifiAddfriend.length : 0 }})
    </h6>
    <div class="d-flex flex-column">
      <div class="box">
        <div
          class="py-4 px-2 mb-6 row border border-secondary rounded mx-auto align-items-center"
          v-for="item in notifiAddfriend"
          :key="item.id"
          style="width: '100%'"
        >
          <div class="col-md-2">
            <div class="d-flex justify-content-center">
              <img
                :src="item.dataRequester.avatar"
                class="rounded-circle"
                style="width: 80px; height: 80px"
              />
            </div>
          </div>
          <div class="col-md-8">
            <p class="font-weight-bold mb-2">
              {{ item.dataRequester.local.fullname }}
            </p>
            <p class="font-weight-nomal">"{{ item.description }}"</p>
          </div>
          <div class="col-md-2">
            <div class="box-btn d-flex flex-column justify-content-center">
              <button
                class="btn btn-primary"
                @click="onHandleAddFriend(item.dataRequester._id, true)"
              >
                Đồng ý
              </button>
              <button
                class="btn btn-link"
                @click="onHandleAddFriend(item.dataRequester._id, false)"
              >
                Bỏ qua
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-center">Không có lời kết bạn nào</p>
  </div>
</template>

<script>
import { FriendService } from "@/services/FriendService";

export default {
  name: "MainContentAddfriend",
  setup() {},
  data: () => {
    return {
      notifiAddfriend: null,
    };
  },
  created() {
    this.getAllNotifiFriend();
  },
  methods: {
    async getAllNotifiFriend() {
      try {
        const dataRef = await FriendService.getListNotificalAddFriend();

        if (dataRef && dataRef.status) {
          this.notifiAddfriend = dataRef.data;
        } else {
          this.notifiAddfriend = null;
          throw new Error("Error Get All Notification Add Friend");
        }
      } catch (error) {
        console.log(error.message);
      }
    },

    async onHandleAddFriend(id, status) {
      try {
        await FriendService.handleAccessAddFriend(id, status);
        this.getAllNotifiFriend();
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  computed: {},
};
</script>
