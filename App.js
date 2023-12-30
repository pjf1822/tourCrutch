import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import { UserProvider } from "./UserContext";
import { NavWrapper } from "./Navigation/NavWrapper";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <RootSiblingParent>
          <NavigationContainer>
            <UserProvider>
              <NavWrapper />
            </UserProvider>
          </NavigationContainer>
        </RootSiblingParent>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
