import React from "react";
import { View } from "react-native";
import { Link, Stack } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { MenuIcon } from "lucide-react-native";

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { H3 } from "~/components/ui/typography";

export default function HomeScreen() {
  const { signOut, userId } = useAuth();
  const { user } = useUser();
  return (
    <View className="h-full flex-1 items-center gap-6 bg-background p-4">
      <Stack
        screenOptions={{
          title: "Fellow",
          headerLeft(props) {
            return <MenuIcon color={"black"} />;
          },
          headerShadowVisible: false,
          headerRight(props) {
            return (
              <Link href={"/(app)/profile"}>
                <Avatar alt={user?.firstName ?? ""}>
                  <AvatarFallback className="bg-[#06C4B9]">
                    <Text className="text-white">
                      {user?.firstName?.charAt(0)}
                    </Text>
                  </AvatarFallback>
                </Avatar>
              </Link>
            );
          },
        }}
      />
      <H3 className="font-medium">
        Good morning, {user?.firstName} {user?.lastName}
      </H3>
    </View>
  );
}
