import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

export default function SignIn() {
  return (
    <SafeAreaProvider>
      <View className="h-full flex-1 items-center gap-20 pt-24">
        <View className="items-center gap-3">
          <Image
            style={{
              height: 50,
              width: 50,
            }}
            source={require("../assets/rocket.png")}
            contentFit="contain"
            transition={200}
          />
          <Text className="text-3xl font-bold">Fellow</Text>
          <Text className="font-normal text-muted-foreground">
            Your Academic Hub is Just a Login Away
          </Text>
        </View>
        <View className="w-full gap-10 px-5">
          <View className="w-full gap-3">
            <Text className="text-sm font-normal text-muted-foreground">
              Email
            </Text>
            <TextInput
              keyboardType="email-address"
              cursorColor={"black"}
              className="h-12 w-full rounded-md border border-border px-3 focus:border-primary"
            />
          </View>
          <View className="w-full gap-3">
            <Text className="text-sm font-normal text-muted-foreground">
              Password
            </Text>
            <TextInput
              secureTextEntry
              cursorColor={"black"}
              className="h-12 w-full rounded-md border border-border px-3 focus:border-primary"
            />
          </View>
          <TouchableOpacity>
            <View className="w-full items-center rounded-md bg-primary px-4 py-3">
              <Text className="text-lg font-semibold text-primary-foreground">
                Sign in
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
}
