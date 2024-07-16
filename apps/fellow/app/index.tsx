import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="transparent" translucent style="light" />
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
            <Text className="text-2xl font-bold text-foreground">
              Hey, Welcome
            </Text>
            <Text className="px-3 text-center text-base text-muted-foreground">
              Elevate your Academic Journey with Ease and Efficiency through
              <Text className="pl-3 text-foreground">Fellow</Text>
            </Text>
          </View>
          <Link href={"/sign-in"} asChild>
            <TouchableOpacity>
              <View className="w-full items-center rounded-md bg-primary px-4 py-3">
                <Text className="font-sans text-lg text-primary-foreground">
                  Sign in
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
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
