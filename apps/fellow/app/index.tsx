import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="transparent" translucent style="light" />
      <View className="relative flex-1 items-center justify-end gap-32 bg-background px-20 py-5">
        <Image
          source={require("../assets/rocket.png")}
          height={900}
          width={900}
          className="absolute -left-5 -top-10"
        />
        <View className="gap-14">
          <View className="flex items-center gap-2">
            <Text className="text-2xl font-bold text-foreground">
              Hey, Welcome
            </Text>
            <Text className="text-center text-base font-semibold text-muted-foreground">
              Elevate your Academic Journey with Ease and Efficiency through
              <Text className="pl-3 text-foreground">Fellow</Text>
            </Text>
          </View>
          <TouchableOpacity>
            <View className="items-center rounded-md bg-primary px-4 py-2">
              <Text className="font-semibold text-primary-foreground">
                Sign in
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex items-center justify-center gap-2">
          <Text className="text-sm text-muted-foreground">from</Text>
          <Text className="text-center text-base font-bold text-foreground">
            NexussERP
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}
