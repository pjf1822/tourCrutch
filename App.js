import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import { UserProvider } from "./UserContext";
import { NavWrapper } from "./Navigation/NavWrapper";
import { QueryClient, QueryClientProvider } from "react-query";
import * as Sentry from "@sentry/react-native";

export default function App() {
  const queryClient = new QueryClient();
  Sentry.init({
    dsn: "https://7991ee4b5dc4b51bce7140bfb8337a08@o4506486302441472.ingest.sentry.io/4506486304604160",
    tracesSampleRate: 1.0,
  });

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
