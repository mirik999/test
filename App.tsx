import "expo-dev-client";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import NavigationConfig from "./navigation";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor="transparent" />
        <NavigationConfig colorScheme={colorScheme} />
      </SafeAreaProvider>
    );
  }
}
