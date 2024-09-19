import React from "react";
import { Text, TouchableOpacity, Image, Platform } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import HomeScreen from "../../screens/HomeScreen";
import VenueDetailScreen from "../../screens/VenueDetailScreen";
import NewVenueScreen from "../../screens/NewVenueScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import { showToast } from "../../helpers";
import { myColors, regFont } from "../../theme";
import MyButton from "../MyComponents/MyButton";
import { handleSignOut } from "../../functionUtils/authFunctionUtils";

const commonDrawerStyles = {
  drawerLabelStyle: {
    fontFamily: regFont.fontFamily,
    fontSize: Platform.OS === "ios" && Platform.isPad ? 22 : 17,
  },

  drawerActiveTintColor: myColors.beige,
  drawerActiveBackgroundColor: myColors.red,
  drawerInactiveTintColor: myColors.black,
  drawerInactiveBackgroundColor: myColors.beige,
};

function CustomDrawerContent({ user, ...props }) {
  const signOut = async () => {
    try {
      handleSignOut();
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
          fontSize: Platform.OS === "ios" && Platform.isPad ? 25 : 17,
        }}
      >
        {user?.email}
      </Text>
      <DrawerItemList {...props} />
      <MyButton
        title="Signout"
        onPress={() => signOut()}
        warning={false}
        width={"80%"}
      />
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
              source={require("../../assets/logito.png")}
              style={{
                width: Platform.OS === "ios" && Platform.isPad ? 70 : 48,
                height: Platform.OS === "ios" && Platform.isPad ? 70 : 48,

                marginLeft: 10,
              }}
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
            marginBottom: Platform.OS === "ios" && Platform.isPad ? 6 : 2,
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
            marginBottom: Platform.OS === "ios" && Platform.isPad ? 6 : 2,
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
            marginBottom: Platform.OS === "ios" && Platform.isPad ? 6 : 2,
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
