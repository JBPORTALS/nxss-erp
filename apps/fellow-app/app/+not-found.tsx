import { View } from "react-native";
import { Link, Stack } from "expo-router";

import { Text } from "~/components/ui/text";

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <Text>This screen doesn't exist.</Text>

        <Link href="/">
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </View>
  );
}
