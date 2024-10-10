import { View } from "react-native";
import { Drawer } from "expo-router/drawer";
import { useUser } from "@clerk/clerk-expo";
import { HomeIcon } from "lucide-react-native";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { H2, P } from "~/components/ui/typography";
import { api } from "~/utils/api";

export default function HomeScreen() {
  const { user } = useUser();
  const { data, refetch, error } = api.auth.getSession.useQuery();
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
      <P>{data?.title}</P>
      <Button onPress={() => refetch()}>
        <Text>Refetch</Text>
      </Button>
    </View>
  );
}
