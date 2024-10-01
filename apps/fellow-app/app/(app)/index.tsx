import React from "react";
import { View } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function HomeScreen() {
  const { signOut, userId } = useAuth();
  const { user } = useUser();
  return (
    <View className="flex-1 items-center justify-center">
      <Text>
        {user?.primaryEmailAddress?.emailAddress} {userId}
      </Text>
      <Button onPress={() => signOut()}>
        <Text>Signout</Text>
      </Button>
    </View>
  );
}
