import { useEffect } from "react";
import * as Web from "expo-web-browser";

export function useWarmUpBrowser() {
  useEffect(() => {
    void Web.warmUpAsync();
    return () => {
      void Web.coolDownAsync();
    };
  }, []);
}
