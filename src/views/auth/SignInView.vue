<template>
  <div class="layout">
    <div class="container d-flex flex-column">
      <div
        class="row align-items-center justify-content-center no-gutters min-vh-100"
      >
        <div class="col-12 col-md-5 col-lg-4 py-8 py-md-11">
          <!-- Heading -->
          <h1 class="font-bold text-center">Đăng nhâp</h1>

          <!-- Text -->
          <p class="text-center mb-6">Chào mừng bạn tới kênh chat</p>

          <!-- Form -->
          <form class="mb-6">
            <!-- Email -->
            <div class="form-group">
              <label for="email" class="sr-only">Email Address</label>
              <input
                type="email"
                class="form-control form-control-lg"
                id="email"
                placeholder="Enter your email"
              />
            </div>

            <!-- Password -->
            <div class="form-group">
              <label for="password" class="sr-only">Password</label>
              <input
                type="password"
                class="form-control form-control-lg"
                id="password"
                placeholder="Enter your password"
              />
            </div>

            <!-- <div class="form-group d-flex justify-content-between">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  checked=""
                  id="checkbox-remember"
                />
                <label class="custom-control-label" for="checkbox-remember"
                  >Remember me</label
                >
              </div>
              <a href="password-reset.html"></a>
            </div> -->

            <!-- Submit -->
            <button class="btn btn-lg btn-block btn-primary" type="submit">
              Đăng nhập
            </button>
          </form>

          <div class="d-flex align-items-center justify-content-between">
            <!-- Text -->
            <a
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#modalForgotPassword"
              >Quên mật khẩu</a
            >

            <!-- Text -->
            <p class="text-center">
              Bạn chưa có tài khoản
              <router-link to="/dang-ki">Đăng kí</router-link>.
            </p>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div
        class="modal fade"
        id="modalForgotPassword"
        tabindex="-1"
        aria-hidden="true"
        aria-labelledby="modalForgotPassword"
        data-bs-backdrop="static"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Nhập email</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <input
                type="text"
                class="form-control"
                placeholder="Nhập ở đây"
              />
            </div>
            <div class="modal-footer">
              <button
                type="button "
                class="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              <button type="button" class="btn btn-primary btn-sm">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- / .row -->
    </div>
  </div>
  <!-- .layout -->
</template>

<script>
export default {
  name: "SigninView",
};
</script>

<style src="@/assets\css\template.min.css"></style>
