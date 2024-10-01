import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AppLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) return <Redirect href={"/(auth)"} />;
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
      }}
    />
  );
}
