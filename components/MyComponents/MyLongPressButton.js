import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { myColors, regFont } from "../../theme";

const MyLongPressButton = ({ title, onPress, onLongPress }) => {
  const [animation] = useState(new Animated.Value(0));

  const handlePressIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [myColors.beige, myColors.red],
  });
  const textColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [myColors.pink, myColors.beige],
  });

  return (
    <Animated.View style={[styles.buttonWrapper, { backgroundColor }]}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.touchable}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        delayLongPress={1000}
        onLongPress={onLongPress}
        activeOpacity={1}
      >
        <Animated.Text style={[styles.textStyle, { color: textColor }]}>
          {title}
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default MyLongPressButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: myColors.black,
    padding: 10,
    width: "80%",
    alignSelf: "center",
  },
  touchable: {
    backgroundColor: "transparent",
    // Set the background color to transparent for the TouchableOpacity
  },
  textStyle: {
    fontFamily: regFont.fontFamily,
    fontSize: Platform.OS === "ios" && Platform.isPad ? 23 : 17,
  },
});
