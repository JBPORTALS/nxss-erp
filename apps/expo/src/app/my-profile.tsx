import { Button, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { api } from "~/utils/api";

export default function MyProfile() {
  return (
    <SafeAreaProvider>
      <StatusBar style="inverted" />
      <View className="h-full w-full bg-background">
        {/* Changes page title visible on the header */}
        <Stack.Screen options={{ title: "My Profile" }} />
        <Text className="text-center text-6xl font-extrabold">My Profile</Text>
      </View>
    </SafeAreaProvider>
  );
}
