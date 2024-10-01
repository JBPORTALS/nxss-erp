import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Redirect, Slot, Stack } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { MenuIcon } from "lucide-react-native";

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Text } from "~/components/ui/text";

export default function AppLayout() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  if (!isSignedIn) return <Redirect href={"/(auth)"} />;
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    />
  );
}
