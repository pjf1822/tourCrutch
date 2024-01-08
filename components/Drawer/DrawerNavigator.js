import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import HomeScreen from "../../screens/HomeScreen";
import VenueDetailScreen from "../../screens/VenueDetailScreen";
import NewVenueScreen from "../../screens/NewVenueScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import { FIREBASE_AUTH } from "../../firebaseConfig.js";
import { showToast } from "../../helpers";
import { myColors, regFont } from "../../theme";
import MyButton from "../MyButton";

const commonDrawerStyles = {
  drawerLabelStyle: {
    fontFamily: regFont.fontFamily,
  },

  drawerActiveTintColor: myColors.beige,
  drawerActiveBackgroundColor: myColors.red,
  drawerInactiveTintColor: myColors.black,
  drawerInactiveBackgroundColor: myColors.beige,
};

function CustomDrawerContent({ user, ...props }) {
  const signOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      showToast("Signed out!", true, "top");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <DrawerContentScrollView
      style={{ backgroundColor: myColors.black }}
      {...props}
    >
      <Text
        style={{
          fontFamily: regFont.fontFamily,
          color: myColors.beige,
          marginBottom: 10,
          width: "80%",
          alignSelf: "center",
        }}
      >
        {user?.email}
      </Text>
      <DrawerItemList {...props} />
      <MyButton title="signout" onPress={() => signOut()} warning={true} />
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = ({ user }) => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} user={user} />}
      screenOptions={({ navigation }) => ({
        headerTitle: "",
        headerStyle: {
          height: 0,
        },

        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{ marginBottom: 20 }}
          >
            <Image
              source={require("../../assets/logo.png")}
              style={{ width: 40, height: 40, marginLeft: 10 }}
            />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen
        name="Home"
        options={{
          ...commonDrawerStyles,
          drawerItemStyle: {
            width: "80%",
            alignSelf: "center",
          },
        }}
        component={HomeScreen}
      />
      <Drawer.Screen
        name="NewVenue"
        options={{
          ...commonDrawerStyles,
          drawerLabel: "New Venue",
          drawerItemStyle: {
            width: "80%",
            alignSelf: "center",
          },
        }}
        component={NewVenueScreen}
      />
      <Drawer.Screen
        options={{
          ...commonDrawerStyles,
          drawerItemStyle: {
            width: "80%",
            alignSelf: "center",
          },
        }}
        name="Settings"
        component={SettingsScreen}
      />
      <Drawer.Screen
        name="VenueDetail"
        component={VenueDetailScreen}
        options={{
          drawerItemStyle: { height: 0 },
          ...commonDrawerStyles,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
