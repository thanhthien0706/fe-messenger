<template>
  <div class="box-content-child">
    <h6 class="pb-4">Lời mời kết bạn(0)</h6>
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
                :src="item.requester.avatar"
                class="rounded-circle"
                style="width: 80px; height: 80px"
              />
            </div>
          </div>
          <div class="col-md-8">
            <p class="font-weight-bold mb-2">Thanh Thien</p>
            <p class="font-weight-nomal">"thien"</p>
          </div>
          <div class="col-md-2">
            <div class="box-btn d-flex flex-column justify-content-center">
              <button class="btn btn-primary">Đồng ý</button>
              <button class="btn btn-link">Bỏ qua</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div v-else>
    <p class="text-center">Không có lời kết bạn nào</p>
  </div> -->
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
    this.getAllNotifiFriend;
  },
  methods: {
    async getAllNotifiFriend() {
      try {
        const dataRef = await FriendService.getAllNotifiFriend();

        console.log("da vao");
        if (dataRef.status) {
          this.notifiAddfriend = dataRef.data;
          console.log(this.notifiAddfriend);
        } else {
          throw new Error("Error Get All Notification Add Friend");
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  computed: {},
};
</script>
