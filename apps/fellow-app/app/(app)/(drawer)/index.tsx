import { View } from "react-native";
import { Drawer } from "expo-router/drawer";
import { useUser } from "@clerk/clerk-expo";
import { HomeIcon } from "lucide-react-native";

import { H2 } from "~/components/ui/typography";

export default function HomeScreen() {
  const { user } = useUser();
  return (
    <View className="h-full flex-1 items-center gap-6 bg-background p-4">
      <Drawer.Screen
        options={{
          drawerIcon(props) {
            return <HomeIcon {...props} size={20} />;
          },
          drawerLabel: "Home",
          title: "Fellow",
        }}
      />
      <H2 className="font-medium">
        Good morning, {user?.firstName} {user?.lastName}
      </H2>
    </View>
  );
}
