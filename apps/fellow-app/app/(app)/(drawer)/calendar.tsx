import React from "react";
import { Text, View } from "react-native";
import { Drawer } from "expo-router/drawer";
import { CalendarDaysIcon } from "lucide-react-native";

export default function Calendar() {
  return (
    <View>
      <Drawer.Screen
        options={{
          drawerIcon(props) {
            return <CalendarDaysIcon {...props} size={20} />;
          },
          drawerLabel: "Calendar",
          title: "Calendar",
        }}
      />
      <Text>Calendar</Text>
    </View>
  );
}
