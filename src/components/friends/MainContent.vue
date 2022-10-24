<template>
  <div class="main main-visible">
    <div class="chat dropzone-form-js">
      <!-- Chat: body -->
      <div class="chat-body">
        <!-- Chat: Header -->
        <div class="chat-header border-bottom py-4 py-lg-6 px-lg-8">
          <div class="container-xxl">
            <div class="row align-items-center">
              <!-- Close chat(mobile) -->
              <div class="col-3 d-xl-none">
                <ul class="list-inline mb-0">
                  <li class="list-inline-item">
                    <a class="text-muted px-0" href="#" data-chat="open">
                      <i class="icon-md fe-chevron-left"></i>
                    </a>
                  </li>
                </ul>
              </div>

              <!-- Chat photo -->
              <div class="col-6 col-xl-6">
                <div class="media text-center text-xl-left">
                  <div class="avatar avatar-sm d-none d-lg-inline-block mr-5">
                    <i
                      class="fe-user-plus ml-auto"
                      v-if="nameTabChoose == 'list'"
                    ></i>
                    <i class="fe-users ml-auto" v-else></i>
                  </div>

                  <div class="media-body align-self-center text-truncate">
                    <h3
                      class="text-truncate mb-n1"
                      v-if="nameTabChoose == 'list'"
                    >
                      Danh sách kết bạn
                    </h3>

                    <h3 class="text-truncate mb-n1" v-else>Danh sách nhóm</h3>
                  </div>
                </div>
              </div>
            </div>
            <!-- .row -->
          </div>
        </div>
        <!-- Chat: Header -->

        <!-- Chat: Content-->
        <div class="chat-content px-lg-8">
          <div class="container-xxl py-6F py-lg-6">
            <MainContentAddfriendVue v-if="nameTabChoose == 'list'" />
          </div>
        </div>
        <!-- Chat: Content -->
      </div>
      <!-- Chat: body -->
    </div>
  </div>
</template>

<script>
import MainContentAddfriendVue from "./MainContentAddfriend.vue";

export default {
  name: "MainContentFriends",
  components: { MainContentAddfriendVue },
  props: ["nameTabChoose"],
};
</script>
