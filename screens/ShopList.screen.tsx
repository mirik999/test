import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "../components/Themed";
import Colors from "../constants/Colors";
import CustomPicker from "../components/picker-field/CustomPicker";
import Button from "../components/Button";
import Divider from "../components/Divider";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { StackParamList } from "../types";

const options = [
  {
    label: "Magaza 1",
    value: "magaza-one",
  },
  {
    label: "Magaza 2",
    value: "magaza-two",
  },
  {
    label: "Magaza 3",
    value: "magaza-three",
  },
];

type Props = {
  route: RouteProp<StackParamList, "ShopList">;
  navigation: StackNavigationProp<StackParamList, "ShopList">;
};

export default function ShopListScreen({ navigation, route }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.pickerWrap}>
        <CustomPicker
          label="Magaza sechin"
          options={options}
          getValue={(val: string) => false}
        />
        <Divider />
        <Divider />
        <Divider />
        <Button text="Skan et" onPress={() => navigation.navigate("Scanner")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.container,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerWrap: {
    marginHorizontal: 40,
    backgroundColor: "transparent",
  },
});
