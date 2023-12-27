import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import VenueDetailScreen from "../screens/VenueDetailScreen";
import NewVenueScreen from "../screens/NewVenueScreen";

export const SignedInNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="VenueDetail" component={VenueDetailScreen} />
      <Stack.Screen name="NewVenue" component={NewVenueScreen} />
    </Stack.Navigator>
  );
};
