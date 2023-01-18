import React, { useCallback } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { RestaurantsScreen } from "./src/features/restaurants/screens/restaurants.screen";
import { theme } from "./src/infrastructure/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeArea } from "./src/components/utils/safe-area.component";
import { Ionicons } from "@expo/vector-icons";
import { RestaurantsContextProvider } from "./src/services/restaurants/restaurants.context";
import { LocationContextProvider } from "./src/services/location/location.context";

SplashScreen.preventAutoHideAsync();

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

const TAB_ICON = {
  Restaurants: "restaurant",
  Map: "map",
  Settings: "settings",
};

const TAB_ICON_OUTLINE = {
  Restaurants: "restaurant-outline",
  Map: "map-outline",
  Settings: "settings-outline",
};

function MapScreen() {
  return (
    <SafeArea>
      <Text>Map!</Text>
    </SafeArea>
  );
}

function SettingsScreen() {
  return (
    <SafeArea>
      <Text>Settings!</Text>
    </SafeArea>
  );
}

const Tab = createBottomTabNavigator();

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  const iconOutlineName = TAB_ICON_OUTLINE[route.name];
  return {
    tabBarIcon: ({ focused, size, color }) => (
      <Ionicons
        name={focused ? iconName : iconOutlineName}
        size={size}
        color={color}
      />
    ),
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
  };
};

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
          <LocationContextProvider>
            <RestaurantsContextProvider>
              <NavigationContainer>
                <Tab.Navigator screenOptions={createScreenOptions}>
                  <Tab.Screen
                    name="Restaurants"
                    component={RestaurantsScreen}
                  />
                  <Tab.Screen name="Map" component={MapScreen} />
                  <Tab.Screen name="Settings" component={SettingsScreen} />
                </Tab.Navigator>
              </NavigationContainer>
            </RestaurantsContextProvider>
          </LocationContextProvider>
        </SafeAreaProvider>
      </ThemeProvider>

      <ExpoStatusBar style={"auto"} />
    </>
  );
}
