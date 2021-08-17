import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { StackParamList } from "../types";
import { Text, View } from "../components/Themed";
import Constants from "expo-constants";
import { Image } from "react-native";
import ShopListScreen from "../screens/ShopList.screen";
import ScannerScreen from "../screens/Scanner.screen";

const Stack = createStackNavigator<StackParamList>();

export default function Navigation() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator initialRouteName="ShopList" screenOptions={screenOptions}>
      <Stack.Screen name="ShopList" component={ShopListScreen} />
      <Stack.Screen name="Scanner" component={ScannerScreen} />
    </Stack.Navigator>
  );
}

const screenOptions = ({ route }: any): any => {
  const routesWithoutSwipe = ["ExamProcess", "Exam", "Result"];
  const enableGesture = !routesWithoutSwipe.includes(route.name);
  return {
    headerStyle: {
      backgroundColor: Colors.light.tint,
    },
    headerTintColor: "white",
    headerTitle: () => (
      <Image
        source={require("../assets/images/mstock-logo.png")}
        style={{ width: 160, height: 39 }}
      />
    ),
    gestureEnabled: enableGesture,
    gestureDirection: "horizontal",
    cardStyleInterpolator: ({ current, layouts }: any) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
                extrapolate: "clamp",
              }),
            },
          ],
        },
      };
    },
  };
};
