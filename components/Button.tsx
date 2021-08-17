import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
//res
import Colors from "../constants/Colors";
import cs from "../constants/Layout";

const { window } = cs;

type Props = {
  bordered?: boolean;
  text: string;
  disabled?: boolean;
  onPress: () => void;
};

export default function Button({ bordered, text, disabled, onPress }: Props) {
  if (disabled) {
    return (
      <View
        style={[
          bordered ? styles.borderedBtn : styles.primaryBtn,
          styles.disabled,
        ]}
      >
        <Text
          style={[
            bordered ? styles.btnBrdText : styles.btnText,
            styles.disabledText,
          ]}
        >
          {text}
        </Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={bordered ? styles.borderedBtn : styles.primaryBtn}
    >
      <Text style={bordered ? styles.btnBrdText : styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryBtn: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: Colors.light.tint,
  },
  borderedBtn: {
    padding: 10,
    borderRadius: 4,
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
  btnBrdText: {
    color: Colors.light.white,
    textAlign: "center",
  },
  disabled: {
    backgroundColor: "silver",
  },
  disabledText: {
    color: "gray",
  },
});
