import moment from "moment";
moment.locale("vi");

const formatDate = {
  basicFormat(date, type) {
    return moment(date).format(type);
  },

  convertToWeek(date) {
    return moment(date).fromNow();
  },
};

export default formatDate;
