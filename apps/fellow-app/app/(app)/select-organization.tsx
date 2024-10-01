import React from "react";
import { Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useOrganization, useOrganizationList } from "@clerk/clerk-expo";
import { Building, Check } from "lucide-react-native";

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Muted } from "~/components/ui/typography";

export default function SelectOrganization() {
  const { organization } = useOrganization();
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: true,
  });
  const router = useRouter();

  if (!isLoaded) return null;
  return (
    <View className="px-4 py-6">
      <Stack.Screen
        options={{ title: "Select Institution", headerTitleAlign: "center" }}
      />
      <View className="rounded-md border border-border bg-secondary py-2">
        {userMemberships.data?.map((memberShip) => (
          <Button
            onPress={async () => {
              await setActive({ organization: memberShip.organization });
              router.back();
            }}
            variant={"ghost"}
            className="native:h-14 justify-between bg-transparent py-4"
          >
            <View className="flex-row items-center gap-2">
              <Avatar alt="Org Icon" className="size-8">
                <AvatarFallback className="bg-primary">
                  <Building color={"white"} size={16} />
                </AvatarFallback>
              </Avatar>
              <View>
                <Text className="text-sm font-semibold">
                  {memberShip.organization.name}
                </Text>
                <Muted className="font-semibold">Computer Science</Muted>
              </View>
            </View>
            {organization?.id === memberShip.organization.id && (
              <Check color={"black"} size={16} />
            )}
          </Button>
        ))}
      </View>
    </View>
  );
}
