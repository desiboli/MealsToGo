import React, { useCallback, useState, useEffect } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import { RestaurantsContextProvider } from "./src/services/restaurants/restaurants.context";
import { LocationContextProvider } from "./src/services/location/location.context";
import { FavouritesContextProvider } from "./src/services/favourites/favourites.context";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

import { Navigation } from "./src/infrastructure/navigation";
import { initializeApp } from "firebase/app";

SplashScreen.preventAutoHideAsync();

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyArVSEejHCwILHcJ3urDiCDs_aqDcuXduA",
  authDomain: "mealstogo-1dd22.firebaseapp.com",
  projectId: "mealstogo-1dd22",
  storageBucket: "mealstogo-1dd22.appspot.com",
  messagingSenderId: "743411516685",
  appId: "1:743411516685:web:75e9fd07ee8b7975a5dc44",
};

initializeApp(firebaseConfig);

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
          <AuthenticationContextProvider>
            <FavouritesContextProvider>
              <LocationContextProvider>
                <RestaurantsContextProvider>
                  <Navigation />
                </RestaurantsContextProvider>
              </LocationContextProvider>
            </FavouritesContextProvider>
          </AuthenticationContextProvider>
        </SafeAreaProvider>
      </ThemeProvider>

      <ExpoStatusBar style={"auto"} />
    </>
  );
}
