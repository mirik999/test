import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
//rest
import Colors from "../../constants/Colors";
import cs from "../../constants/Layout";

const { window } = cs;

type Props = {
  label: string;
  options: { value: string; label: string }[];
  getValue: (val: string) => void;
};

export default function CustomPicker({ label, options, getValue }: Props) {
  const [value, setValue] = useState("");

  function _onChange(val: string) {
    setValue(val);
    getValue(val);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <View style={styles.inputWrap}>
        <RNPickerSelect
          placeholder={{
            label: "Mağazaların siyahısı",
            value: null,
          }}
          style={selectable}
          onValueChange={_onChange}
          items={options}
          itemKey={0}
          useNativeAndroidPickerStyle={false}
          Icon={() => (
            <Ionicons
              name="caret-down"
              size={14}
              style={styles.chevronIcon}
              color="silver"
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
  },
  text: {
    color: Colors.light.tint,
    fontSize: 12,
  },
  inputWrap: {
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.light.tint,
  },
  chevronIcon: {
    top: 9,
    right: 0,
    color: Colors.light.tint,
  },
});

const selectable = StyleSheet.create({
  inputIOS: {
    width: window.width - 70,
    height: 30,
    paddingLeft: 0,
    color: Colors.light.tint,
  },
  inputAndroid: {
    width: window.width - 70,
    height: 30,
    paddingLeft: 0,
    color: Colors.light.tint,
  },
  pickerBackground: {},
});
