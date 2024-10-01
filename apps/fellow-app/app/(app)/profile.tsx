import React, { useCallback, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function Profile() {
  const { signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onSignOut = useCallback(async () => {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
  }, []);
  return (
    <View className="p-4">
      <Stack.Screen
        options={{
          title: "Profile",
          headerTitleAlign: "center",
        }}
      />
      <Button
        onPress={() => onSignOut()}
        className="w-full"
        disabled={isLoading}
        variant={"destructive"}
      >
        {isLoading && <ActivityIndicator color={"white"} />}
        <Text>Sign out</Text>
      </Button>
    </View>
  );
}
