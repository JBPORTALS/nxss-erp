import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Link, Redirect, Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useAuth, useOrganization, useUser } from "@clerk/clerk-expo";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Building, ChevronRight } from "lucide-react-native";

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Large, Muted } from "~/components/ui/typography";

export default function AppLayout() {
  const { isSignedIn } = useAuth();
  const { organization } = useOrganization();
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

              <View className="px-4 pb-6">
                <Link href={"/select-organization"} asChild>
                  <Button
                    variant={"outline"}
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
                          {organization?.name}
                        </Text>
                        <Muted className="font-semibold">
                          Computer Science
                        </Muted>
                      </View>
                    </View>
                    <ChevronRight color={"black"} size={16} />
                  </Button>
                </Link>
              </View>
            </View>
          );
        }}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#ffffff",
          },
          drawerLabelStyle: { marginLeft: -20, fontWeight: "600" },
          drawerStatusBarAnimation: "fade",
          headerTitleStyle: { fontFamily: "GeistVF" },

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
