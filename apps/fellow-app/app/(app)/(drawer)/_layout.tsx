import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Link, Redirect, Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useAuth, useUser } from "@clerk/clerk-expo";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Text } from "~/components/ui/text";
import { Large } from "~/components/ui/typography";

export default function AppLayout() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  if (!isSignedIn) return <Redirect href={"/(auth)"} />;
  return (
    <GestureHandlerRootView>
      <Stack.Screen options={{ headerShown: false }} />
      <Drawer
        drawerContent={(props) => {
          return (
            <View className="flex-1">
              <DrawerContentScrollView {...props}>
                <Large className="px-4 py-4">Fellow</Large>
                <DrawerItemList {...props} />
              </DrawerContentScrollView>
            </View>
          );
        }}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#ffffff",
          },
          drawerLabelStyle: { marginLeft: -20, fontWeight: "600" },
          drawerStatusBarAnimation: "fade",
          headerRight(props) {
            return (
              <Link href={"/profile"} className="mr-2.5">
                <Avatar alt="Avatar">
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
    </GestureHandlerRootView>
  );
}
