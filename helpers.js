import Fuse from "fuse.js";
import Toast from "react-native-root-toast";
import { myColors } from "./theme";
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
    // fontSize: 23,
    zIndex: 999,
    fontSize: Platform.OS === "ios" && Platform.isPad ? 30 : 23,
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
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlRegex.test(url);
};

export const stateOptions = [
  { label: "Select State", value: "" },
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];

export const transformVenueData = (venueData) => {
  if (!venueData || !venueData.address) {
    return null;
  }
  const { address } = venueData;

  // Splitting the address into different parts
  const [streetNameNumber, apartmentNumber, city, state, zip] = address
    .split(",")
    .map((item) => item.trim());

  // Creating the transformed object
  const transformedData = {
    name: venueData.name || "",
    streetNameNumber: streetNameNumber || "",
    apartmentNumber: apartmentNumber || "",
    city: city || "",
    state: state || "",
    zip: zip || "",
    link: venueData.link || "",
    pdfs: venueData.pdfs || [],
  };

  return transformedData;
};

export const combineAddress = (values) => {
  const address = `${values.streetNameNumber},${
    values.apartmentNumber ? ` ${values.apartmentNumber}` : ""
  }, ${values.city}, ${values.state}, ${values.zip}`;
  return address.trim();
};
