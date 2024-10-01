import { Redirect, Slot } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AppLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) return <Redirect href={"/(auth)"} />;
  return <Slot />;
}
