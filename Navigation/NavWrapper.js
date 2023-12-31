import React from "react";
import { useUser } from "../UserContext";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import VenueDetailScreen from "../screens/VenueDetailScreen";
import NewVenueScreen from "../screens/NewVenueScreen";
import LoginScreen from "../screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, Text, TouchableOpacity } from "react-native";
import AppHeader from "../components/AppHeader";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useRoute } from "@react-navigation/native";

// AUTH STACK
const AuthStack = createNativeStackNavigator();
const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="Signup" component={SignupScreen} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
  </AuthStack.Navigator>
);
function CustomDrawerContent({ user, ...props }) {
  return (
    <DrawerContentScrollView {...props}>
      <Text>{user?.email}</Text>
      <DrawerItemList {...props} />

      <DrawerItem label="Help" onPress={() => console.log("fuck")} />
    </DrawerContentScrollView>
  );
}

// APP STACK
const Drawer = createDrawerNavigator();

const AppNavigator = ({ navigation }) => {
  const route = useRoute();
  const { user } = route.params || {};

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} user={user} />}
      screenOptions={({ navigation }) => ({
        headerTitle: "",
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image
              source={require("../assets/logo.png")}
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
    </Drawer.Navigator>
  );
};

export const NavWrapper = () => {
  const Stack = createNativeStackNavigator();
  const { user } = useUser();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <Stack.Screen
            name="App"
            component={AppNavigator}
            initialParams={{ user: { email: user?.email } }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Auth" component={AuthNavigator} />
        </>
      )}
    </Stack.Navigator>
  );
};
