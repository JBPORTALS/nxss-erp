import React from "react";
import { Text, View } from "react-native";
import { Drawer } from "expo-router/drawer";
import { Layers2 } from "lucide-react-native";

export default function Subjects() {
  return (
    <View>
      <Drawer.Screen
        options={{
          drawerIcon(props) {
            return <Layers2 {...props} size={20} />;
          },
          drawerLabel: "Subjects",
          title: "Subjects",
        }}
      />
      <Text>Subjects</Text>
    </View>
  );
}
