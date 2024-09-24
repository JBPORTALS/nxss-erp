import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import { H2, H3, Muted } from "~/components/ui/typography";

export default function Screen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-between bg-background p-6">
        <H3>Fellow</H3>
        <H2 className="text-center font-medium text-[#4C4065]">
          Your academic journey, all in one place.
        </H2>
        <View className="w-full items-center gap-3 pb-12">
          <Label nativeID="name" className="text-center font-semibold">
            Enter your email address to get started
          </Label>
          <Input
            className="native:h-12 w-full"
            style={{ height: 46 }}
            textAlign="center"
            placeholder="name@yourcompany.com"
          />
          <Button className="w-full">
            <Text className="font-semibold">Continue with Email</Text>
          </Button>
          <View className="w-full flex-row items-center">
            <Separator className="flex-1" />
            <Muted className="px-2">OR CONTINUE WITH</Muted>
            <Separator className="flex-1" />
          </View>
          <Button className="w-full" variant={"secondary"}>
            <Text className="font-semibold">Google</Text>
          </Button>
          <Muted className="w-[80%] text-center text-base">
            By continuing, you agree to our{" "}
            <Text className="text-foreground underline">Terms</Text> and{" "}
            <Text className="text-foreground underline">Usage Policy.</Text>
          </Muted>
        </View>
        <Text>NexussERP</Text>
      </View>
    </SafeAreaView>
  );
}
