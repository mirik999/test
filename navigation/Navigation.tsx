import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { MainStackParamList } from "../redux/types/navigation.type";
import { Text, View } from "../components/Themed";
import Constants from "expo-constants";
import { Image } from "react-native";
import ShopListScreen from "../screens/ShopList.screen";
import ScannerScreen from "../screens/Scanner/Scanner.screen";
import ProductListScreen from "../screens/ProductList.screen";

const Stack = createStackNavigator<MainStackParamList>();

export default function Navigation() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator initialRouteName="ShopList" screenOptions={screenOptions}>
      <Stack.Screen name="ShopList" component={ShopListScreen} />
      <Stack.Screen name="Scanner" component={ScannerScreen} />
      <Stack.Screen name="Products" component={ProductListScreen} />
    </Stack.Navigator>
  );
}

const screenOptions = ({ route }: any): any => {
  const routesWithoutSwipe = ["ExamProcess", "Exam", "Result"];
  const enableGesture = !routesWithoutSwipe.includes(route.name);
  return {
    headerStyle: {
      backgroundColor: Colors.light.tint,
      height: Constants.platform?.ios ? 110 : 85,
    },
    headerTintColor: "white",
    headerLeft: null,
    headerTitle: () => (
      <Image
        source={require("../assets/images/mstock-logo.png")}
        style={{ width: 160, height: 39 }}
      />
    ),
    gestureEnabled: false,
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
