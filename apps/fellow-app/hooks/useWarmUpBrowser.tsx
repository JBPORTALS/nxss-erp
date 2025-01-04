import { useEffect } from "react";
import * as Web from "expo-web-browser";

export function useWarmUpBrowser() {
  useEffect(() => {
    void Web.warmUpAsync();
    console.log("warm up");
    return () => {
      void Web.coolDownAsync();
    };
  }, []);
}
