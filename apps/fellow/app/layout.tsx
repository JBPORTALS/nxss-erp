import { Slot } from "expo-router";

// Import your global CSS file
import "../global.css";

import { StatusBar } from "expo-status-bar";

export default function layout() {
  return (
    <>
      <Slot />
    </>
  );
}
