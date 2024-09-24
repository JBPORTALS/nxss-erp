import { TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Link, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { H3 } from "~/components/ui/typography";

export default function Index() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <View className="flex-1 items-center justify-end gap-32 bg-background p-6">
        <H3 className="font-bold">Fellow</H3>
        <H3 className="text-center font-medium">
          Your academic journey, all in one place.
        </H3>
        <View className="w-full gap-14">
          <Input placeholder="name@yourcompany.com" textAlign="center" />
          <Button>
            <Text>Continue with Email</Text>
          </Button>
        </View>
        <View className="flex items-center justify-center gap-2">
          <Text className="text-center text-base font-semibold text-muted-foreground">
            NexussERP
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}
