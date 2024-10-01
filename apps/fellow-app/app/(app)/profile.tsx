import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function Profile() {
  const { signOut } = useAuth();
  return (
    <View>
      <Stack
        screenOptions={{
          title: "Profile",
          headerRight: undefined,
          headerLeft: undefined,
        }}
      />
      <Button
        onPress={() => signOut()}
        className="w-full"
        variant={"secondary"}
      >
        <Text>Sign out</Text>
      </Button>
    </View>
  );
}
