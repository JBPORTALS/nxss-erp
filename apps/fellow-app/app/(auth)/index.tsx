import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { AuthFlow } from "~/components/clerk/sign-in";
import { NAV_THEME } from "~/lib/constants";

export default function Signin() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={NAV_THEME.light.background}
        style="inverted"
      />

      <AuthFlow />
    </SafeAreaView>
  );
}
