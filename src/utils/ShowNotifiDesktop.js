const acceptNotification = () => {
  if (!window.Notification) {
    alert("Trình duyệt của bạn không hỗ trợ chức năng này.");
  } else {
    Notification.requestPermission(function () {});
  }
};

const showNotification = () => {
  let notify;
  if (Notification.permission == "default") {
    alert(
      "Bạn phải cho phép thông báo trên trình duyệt mới có thể hiển thị nó."
    );
  }
  // Ngược lại đã cho phép
  else {
    // Tạo thông báo
    notify = new Notification(
      "Bạn có một thông báo mới từ Freetuts", // Tiêu đề thông báo
      {
        body: "Freetuts vừa đăng một bài viết mới.", // Nội dung thông báo
        icon: "https://freetuts.net/public/logo/icon.png", // Hình ảnh
        tag: "https://freetuts.net/", // Đường dẫn
      }
    );
  }

  // Thực hiện khi nhấp vào thông báo
  notify.onclick = function () {
    window.location.href = this.tag; // Di chuyển đến trang cho url = tag
  };
};

export { acceptNotification, showNotification };
