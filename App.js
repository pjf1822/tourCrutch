import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";

import { NavWrapper } from "./Navigation/NavWrapper";
import { QueryClient, QueryClientProvider } from "react-query";
import { LogBox, Image } from "react-native";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { StorageProvider } from "./Contexts/StorageContext";
import { UserProvider } from "./Contexts/UserContext";
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://7991ee4b5dc4b51bce7140bfb8337a08@o4506486302441472.ingest.sentry.io/4506486304604160",
});

LogBox.ignoreLogs([
  "No native splash screen",
  'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead',
]);

export default function App() {
  const queryClient = new QueryClient();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Dot: require("./assets/DoHyeon-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return <Image source={require("./assets/olav.png")} />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <RootSiblingParent>
          <NavigationContainer>
            <UserProvider>
              <StorageProvider>
                <NavWrapper />
              </StorageProvider>
            </UserProvider>
          </NavigationContainer>
        </RootSiblingParent>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
