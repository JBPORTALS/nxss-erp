import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <SafeAreaProvider>
      <StatusBar style="inverted" />
      <View className="flex-1 items-center justify-end gap-32 bg-background px-3 py-5">
        <Image
          style={{
            height: 130,
            width: 130,
          }}
          source={require("../assets/rocket.png")}
          contentFit="contain"
          transition={500}
        />
        <View className="w-full gap-14">
          <View className="flex items-center gap-2">
            <Text className="text-2xl font-semibold text-foreground">
              Hey, Welcome
            </Text>
            <Text className="px-3 text-center text-base font-semibold text-muted-foreground">
              Elevate your Academic Journey with Ease and Efficiency through{" "}
              <Text className="text-foreground">Fellow</Text>
            </Text>
          </View>
          <Link href={"/sign-in"} asChild>
            <TouchableOpacity>
              <View className="w-full items-center rounded-md bg-primary px-4 py-3">
                <Text className="text-lg font-semibold text-primary-foreground">
                  Get Started
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        </View>
        <View className="flex items-center justify-center gap-2">
          <Text className="font-sans text-sm text-muted-foreground">from</Text>
          <Text className="text-center text-base font-semibold text-foreground">
            NexussERP
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}
