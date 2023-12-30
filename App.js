import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import { UserProvider } from "./UserContext";
import { NavWrapper } from "./Navigation/NavWrapper";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RootSiblingParent>
        <NavigationContainer>
          <UserProvider>
            <NavWrapper />
          </UserProvider>
        </NavigationContainer>
      </RootSiblingParent>
    </SafeAreaView>
  );
}
