import { Button, Text, View } from "react-native";
import { Link } from "expo-router";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Button
          title="Signout"
          onPress={() => {
            signOut();
          }}
        />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
