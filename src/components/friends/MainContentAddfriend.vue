<template>
  <div
    class="box-content-child"
    v-if="notifiAddfriend.length != 0 && notifiAddfriend != null"
  >
    <h6 class="pb-4">Lời mời kết bạn({{ notifiAddfriend.length }})</h6>
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
            <p class="font-weight-bold mb-2">{{ item.requester.fullName }}</p>
            <p class="font-weight-nomal">"{{ item.description }}"</p>
          </div>
          <div class="col-md-2">
            <div class="box-btn d-flex flex-column justify-content-center">
              <button
                class="btn btn-primary"
                @click="handleAccessAddfriend(item.requester.id, true)"
              >
                Đồng ý
              </button>
              <button
                class="btn btn-link"
                @click="handleAccessAddfriend(item.requester.id, false)"
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
import { mapGetters } from "vuex";
import { FriendService } from "@/services/FriendService";

export default {
  name: "MainContentAddfriend",
  data: () => {
    return {};
  },
  created() {
    this.onHandleListAddfriend();
  },
  methods: {
    async onHandleListAddfriend() {
      await this.$store.dispatch("getListNotificalAddFriend");
    },
    async handleAccessAddfriend(id, status) {
      try {
        const ref = await FriendService.handleAccessAddFriend(id, status);

        if (ref.status) {
          this.onHandleListAddfriend();
        }

        console.log(ref);
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  computed: {
    ...mapGetters({
      notifiAddfriend: "getNotifiAddfriends",
    }),
  },
};
</script>
