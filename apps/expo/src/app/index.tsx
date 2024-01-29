import { useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { Stack } from "expo-router";

import { api } from "~/utils/api";

export default function Index() {
  const posts = api.auth.getSession.useQuery();
  console.log(posts.trpc.path);
  return (
    <View className="h-full w-full bg-background">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home" }} />
      <View className="h-full w-full p-4">
        <Text className="pb-2 text-center text-5xl font-bold text-foreground">
          Nexuss <Text>ERP</Text>
        </Text>
        <Text className="px-8 text-center text-lg">
          App for students manage their Organization Data
        </Text>
        {!posts.data && <Text>No Data</Text>}
        {posts.data?.title}
        <Button
          disabled={posts.isFetching}
          onPress={() => posts.refetch()}
          title="Refresh"
        />
      </View>
    </View>
  );
}
