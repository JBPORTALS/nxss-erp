import React from "react";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function _layout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="inverted" />

      <Stack screenOptions={{ headerShadowVisible: false, animation: "ios" }} />
    </SafeAreaProvider>
  );
}
