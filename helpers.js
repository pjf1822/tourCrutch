import Fuse from "fuse.js";
import Toast from "react-native-root-toast";
import { myColors, regFont } from "./theme";
import { Platform } from "react-native";

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
    zIndex: 999,
    fontSize: Platform.OS === "ios" && Platform.isPad ? 30 : 23,
    textStyle: { fontFamily: regFont.fontFamily },
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
  url = url.toLowerCase();
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  const wwwUrlRegex = /^www\.[^.]+(\.[^.]+)+$/;

  if (!urlRegex.test(url) && !wwwUrlRegex.test(url)) {
    return "notURL"; // Return a custom value indicating it's not a valid URL
  }

  if (!urlRegex.test(url)) {
    // If the URL doesn't start with a valid protocol, add "https://"
    url = `https://${url}`;
  }

  return url;
};
