import "~/global.css";

import React from "react";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";

import { NAV_THEME } from "~/lib/constants";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  const [loaded, error] = useFonts({
    GeistVF: require("~/assets/fonts/GeistVF.ttf"),
    GeistMonoVF: require("~/assets/fonts/GeistMonoVF.ttf"),
  });

  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const tokenCache = {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("SecureStore get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
    );
  }

  return (
    <ThemeProvider value={LIGHT_THEME}>
      <ClerkProvider publishableKey={publishableKey}>
        <ClerkLoaded>
          <StatusBar
            style={"dark"}
            backgroundColor={LIGHT_THEME.colors.background}
          />
          <Slot screenOptions={{ headerShown: false }} />
          <PortalHost />
        </ClerkLoaded>
      </ClerkProvider>
    </ThemeProvider>
  );
}
