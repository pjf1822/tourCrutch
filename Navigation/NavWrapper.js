import React from "react";
import { useUser } from "../UserContext";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import VenueDetailScreen from "../screens/VenueDetailScreen";
import NewVenueScreen from "../screens/NewVenueScreen";
import LoginScreen from "../screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppHeader from "../components/AppHeader";

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

// APP STACK
const AppStack = createNativeStackNavigator();
const AppNavigator = ({ navigation }) => (
  <AppStack.Navigator
    screenOptions={{
      headerShown: true,
      header: () => <AppHeader navigation={navigation} />,
    }}
  >
    <AppStack.Screen name="Home" component={HomeScreen} />
    <AppStack.Screen name="VenueDetail" component={VenueDetailScreen} />
    <AppStack.Screen name="NewVenue" component={NewVenueScreen} />
  </AppStack.Navigator>
);

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
          <Stack.Screen name="App" component={AppNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="Auth" component={AuthNavigator} />
        </>
      )}
    </Stack.Navigator>
  );
};
