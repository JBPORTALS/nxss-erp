import "~/global.css";

import React from "react";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
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

  return (
    <ThemeProvider value={LIGHT_THEME}>
      <StatusBar
        style={"dark"}
        backgroundColor={LIGHT_THEME.colors.background}
      />
      <Slot screenOptions={{ headerShown: false }} />
      <PortalHost />
    </ThemeProvider>
  );
}
