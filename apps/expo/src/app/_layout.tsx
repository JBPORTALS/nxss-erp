import { Tabs } from "expo-router/tabs";
import { ClerkProvider } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

import { TRPCProvider } from "~/utils/api";

import "../styles.css";

import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  console.log(process.env.CLERK_PUBLISHABLE_KEY);
  return (
    // <ClerkProvider publishableKey={process.env.CLERK_PUBLISHABLE_KEY ?? ""}>
    <TRPCProvider>
      {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
      <SafeAreaProvider className="h-full w-full">
        <Tabs
          screenOptions={{
            headerStyle: {
              backgroundColor: "hsl(262.1 83.3% 57.8%)",
            },
            headerTintColor: "#fff",
            tabBarLabelStyle: {
              display: "none",
            },
          }}
        >
          <Tabs.Screen
            options={{
              tabBarIcon: ({ focused }) => (
                <Feather
                  name="home"
                  size={24}
                  color={focused ? "blue" : "black"}
                />
              ),
            }}
            name="index"
          />
          <Tabs.Screen
            options={{
              tabBarIcon: ({ focused }) => (
                <Feather
                  name="user"
                  size={24}
                  color={focused ? "blue" : "black"}
                />
              ),
            }}
            name="my-profile"
          />
        </Tabs>
      </SafeAreaProvider>
    </TRPCProvider>
    // </ClerkProvider>
  );
}
