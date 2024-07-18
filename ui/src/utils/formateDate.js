import moment from "moment";
const formatDate = (isoDate, show = "default") => {
  if (show === "time") {
    return moment(isoDate).format("h:mm A");
  } else if (show === "date") {
    return moment(isoDate).format("dddd, MMMM Do YYYY");
  }
  return moment(isoDate).format("dddd, MMMM Do YYYY, h:mm A");
};

export default formatDate;
