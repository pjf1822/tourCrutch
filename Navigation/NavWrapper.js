import React from "react";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";
import DrawerNavigator from "../components/Drawer/DrawerNavigator";
import { useUser } from "../Contexts/UserContext";

// AUTH STACK
const AuthStack = createNativeStackNavigator();
const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="Signup" component={SignupScreen} />
    <AuthStack.Screen
      options={{
        lazy: true,
      }}
      name="Login"
      component={LoginScreen}
    />
  </AuthStack.Navigator>
);

// APP STACK

const AppNavigator = () => {
  const route = useRoute();
  const { user } = route.params || {};

  return <DrawerNavigator user={user} />;
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
            initialParams={{
              user: { email: user?.email },
            }}
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
