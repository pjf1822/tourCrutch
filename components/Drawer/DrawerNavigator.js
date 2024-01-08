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
      style={{ backgroundColor: myColors.shadow }}
      {...props}
    >
      <Text style={{ fontFamily: regFont.fontFamily }}>{user?.email}</Text>
      <DrawerItemList {...props} />
      <MyButton title="signout" onPress={() => signOut()} />
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
          backgroundColor: "transparent",
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
          drawerLabelStyle: {
            fontFamily: regFont.fontFamily,
          },
          drawerActiveTintColor: myColors.shadow,
          drawerActiveBackgroundColor: myColors.darkBlue,
          drawerInactiveTintColor: myColors.blue,
          drawerInactiveBackgroundColor: myColors.sand,
        }}
        component={HomeScreen}
      />
      <Drawer.Screen
        name="NewVenue"
        options={{
          drawerLabel: "New Venue",
          drawerLabelStyle: { fontFamily: regFont.fontFamily },
          drawerActiveTintColor: myColors.shadow,
          drawerActiveBackgroundColor: myColors.darkBlue,
          drawerInactiveTintColor: myColors.blue,
          drawerInactiveBackgroundColor: myColors.sand,
        }}
        component={NewVenueScreen}
      />
      <Drawer.Screen
        options={{
          drawerLabelStyle: { fontFamily: regFont.fontFamily },
          drawerActiveTintColor: myColors.shadow,
          drawerActiveBackgroundColor: myColors.darkBlue,
          drawerInactiveTintColor: myColors.blue,
          drawerInactiveBackgroundColor: myColors.sand,
        }}
        name="Settings"
        component={SettingsScreen}
      />
      <Drawer.Screen
        name="VenueDetail"
        component={VenueDetailScreen}
        options={{
          drawerItemStyle: { height: 0 },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
