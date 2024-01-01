import React from "react";
import { Text, TouchableOpacity, Image, Button } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import HomeScreen from "../../screens/HomeScreen";
import VenueDetailScreen from "../../screens/VenueDetailScreen";
import NewVenueScreen from "../../screens/NewVenueScreen";
import { signOut } from "firebase/auth";
import SettingsScreen from "../../screens/SettingsScreen";

function CustomDrawerContent({ user, ...props }) {
  return (
    <DrawerContentScrollView {...props}>
      <Text>{user?.email}</Text>
      <DrawerItemList {...props} />

      <DrawerItem label="Help" onPress={() => console.log("fuck")} />
      <Button title="signout" onPress={() => signOut()} />
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
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image
              source={require("../../assets/logo.png")}
              style={{ width: 40, height: 40, marginLeft: 10 }}
            />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen
        name="VenueDetail"
        component={VenueDetailScreen}
        options={{
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen name="NewVenue" component={NewVenueScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
