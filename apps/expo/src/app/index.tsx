import { Button, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { api } from "~/utils/api";

export default function Index() {
  const posts = api.post.all.useQuery();

  return (
    <SafeAreaProvider>
      <StatusBar style="inverted" />
      <View className="flex h-full w-full items-center justify-center">
        {/* Changes page title visible on the header */}
        <Stack.Screen options={{ title: "Home" }} />
        <Text className="text-center text-6xl font-extrabold">
          Welcome To Nexuss
        </Text>
      </View>
    </SafeAreaProvider>
  );
}