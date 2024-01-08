import Fuse from "fuse.js";
import Toast from "react-native-root-toast";
import { myColors } from "./theme";

export const showToast = (toastMessage, success, position) => {
  let backgroundColor;

  if (success === true) {
    backgroundColor = myColors.sand;
  } else if (success === false) {
    backgroundColor = myColors.blue;
  } else {
    backgroundColor = myColors.darkBlue;
  }
  let toast = Toast.show(toastMessage, {
    duration: Toast.durations.LONG,
    position: position === "top" ? Toast.positions.TOP : Toast.positions.BOTTOM,
    backgroundColor: backgroundColor,
    textColor: "white",
    opacity: 1,
    fontSize: 23,
  });
};

export const filterVenues = (venues, search) => {
  const fuse = new Fuse(venues, {
    keys: ["name", "address"],
    minMatchCharLength: 1,
    includeScore: true,
    threshold: 0.3,
  });

  return search ? fuse.search(search) : venues || [];
};

export const isValidUrl = (url) => {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
};
