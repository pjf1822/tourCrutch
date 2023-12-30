import React from "react";
import { useUser } from "../UserContext";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import VenueDetailScreen from "../screens/VenueDetailScreen";
import NewVenueScreen from "../screens/NewVenueScreen";
import LoginScreen from "../screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="VenueDetail" component={VenueDetailScreen} />
          <Stack.Screen name="NewVenue" component={NewVenueScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
