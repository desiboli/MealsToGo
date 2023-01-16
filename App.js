import React, { useCallback } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import { RestaurantsScreen } from "./src/features/restaurants/screens/restaurants.screen";
import { theme } from "./src/infrastructure/theme";

SplashScreen.preventAutoHideAsync();

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

export default function App() {
  let [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  let [latoLoaded] = useLato({
    Lato_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (oswaldLoaded || latoLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [oswaldLoaded, latoLoaded]);

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider onLayout={onLayoutRootView}>
          <RestaurantsScreen />
        </SafeAreaProvider>
      </ThemeProvider>
      <ExpoStatusBar style={"auto"} />
    </>
  );
}
