const acceptNotification = () => {
  if (!window.Notification) {
    alert("Trình duyệt của bạn không hỗ trợ chức năng này.");
  } else {
    Notification.requestPermission(function () {});
  }
};

const showNotification = (bodyMessage) => {
  let notify;
  if (Notification.permission == "default") {
    alert(
      "Bạn phải cho phép thông báo trên trình duyệt mới có thể hiển thị nó."
    );
  } else {
    notify = new Notification("Bạn có một thông báo mới từ Messenger", {
      body: `${bodyMessage.username} gửi lời mời kết bạn đến bạn`,
      icon: bodyMessage.thumbnail,
      tag: "https://freetuts.net/",
    });
  }

  notify.onclick = function () {
    window.location.href = this.tag;
  };
};

export { acceptNotification, showNotification };
