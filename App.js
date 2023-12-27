import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { RootSiblingParent } from "react-native-root-siblings";
import VenueDetailScreen from "./screens/VenueDetailScreen";
import { UserProvider, useUser } from "./UserContext";
import NewVenueScreen from "./screens/NewVenueScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RootSiblingParent>
        <NavigationContainer>
          <UserProvider>
            <MainContent />
          </UserProvider>
        </NavigationContainer>
      </RootSiblingParent>
    </SafeAreaView>
  );
}

const MainContent = () => {
  const { user } = useUser();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="VenueDetail" component={VenueDetailScreen} />
      <Stack.Screen name="NewVenue" component={NewVenueScreen} />
    </Stack.Navigator>
  );
};
