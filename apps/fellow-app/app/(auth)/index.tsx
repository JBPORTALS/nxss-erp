import React, { useCallback, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Path, Svg } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
import { useOAuth } from "@clerk/clerk-expo";

import { AuthFlow } from "~/components/clerk/sign-in";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import { H2, H3, Muted } from "~/components/ui/typography";
import { useWarmUpBrowser } from "~/hooks/useWarmUpBrowser";
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
