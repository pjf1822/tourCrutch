import Fuse from "fuse.js";
import Toast from "react-native-root-toast";
import { myColors } from "./theme";

export const showToast = (toastMessage, success, position) => {
  let backgroundColor;
  let textColor;

  if (success === true) {
    backgroundColor = myColors.beige;
    textColor = myColors.black;
  } else if (success === false) {
    backgroundColor = myColors.red;
    textColor = myColors.white;
  } else {
    backgroundColor = myColors.pink;
  }
  let toast = Toast.show(toastMessage, {
    duration: Toast.durations.LONG,
    position: position === "top" ? Toast.positions.TOP : Toast.positions.BOTTOM,
    backgroundColor: backgroundColor,
    textColor: textColor,
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
