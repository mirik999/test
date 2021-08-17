import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
//rest
import Colors from "../../constants/Colors";
import cs from "../../constants/Layout";

const { window } = cs;

//generate
const year = new Date().getFullYear();
const years = Array.from(new Array(90), (v, idx) => {
  return {
    label: String(year - 6 - idx),
    value: String(year - 6 - idx),
  };
});
//custom
const days = [
  {
    label: "01",
    value: "01",
  },
  {
    label: "02",
    value: "02",
  },
  {
    label: "03",
    value: "03",
  },
  {
    label: "04",
    value: "04",
  },
  {
    label: "05",
    value: "05",
  },
  {
    label: "06",
    value: "06",
  },
  {
    label: "07",
    value: "07",
  },
  {
    label: "08",
    value: "08",
  },
  {
    label: "09",
    value: "09",
  },
  {
    label: "10",
    value: "10",
  },
  {
    label: "11",
    value: "11",
  },
  {
    label: "12",
    value: "12",
  },
  {
    label: "13",
    value: "13",
  },
  {
    label: "14",
    value: "14",
  },
  {
    label: "15",
    value: "15",
  },
  {
    label: "16",
    value: "16",
  },
  {
    label: "17",
    value: "17",
  },
  {
    label: "18",
    value: "18",
  },
  {
    label: "19",
    value: "19",
  },
  {
    label: "20",
    value: "20",
  },
  {
    label: "21",
    value: "21",
  },
  {
    label: "22",
    value: "22",
  },
  {
    label: "23",
    value: "23",
  },
  {
    label: "24",
    value: "24",
  },
  {
    label: "25",
    value: "25",
  },
  {
    label: "26",
    value: "26",
  },
  {
    label: "27",
    value: "27",
  },
  {
    label: "28",
    value: "28",
  },
  {
    label: "29",
    value: "29",
  },
  {
    label: "30",
    value: "30",
  },
  {
    label: "31",
    value: "31",
  },
];
const months = [
  {
    label: "Yanvar",
    value: "01",
  },
  {
    label: "Fevral",
    value: "02",
  },
  {
    label: "Mart",
    value: "03",
  },
  {
    label: "Aprel",
    value: "04",
  },
  {
    label: "May",
    value: "05",
  },
  {
    label: "İyun",
    value: "06",
  },
  {
    label: "İyul",
    value: "07",
  },
  {
    label: "Avqust",
    value: "08",
  },
  {
    label: "Sentyabr",
    value: "09",
  },
  {
    label: "Oktyabr",
    value: "10",
  },
  {
    label: "Noyabr",
    value: "11",
  },
  {
    label: "Dekabr",
    value: "12",
  },
];

type Props = {
  label: string;
  getValue: (val: string) => void;
};

export default function DateSelect({ label, getValue }: Props) {
  const dispatch = useDispatch();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (day && month && year) {
      const mergedDate = `${day}/${month}/${year}`;
      getValue(mergedDate);
    }
  }, [day, month, year]);

  function _onDateSelect(st: string, val: string) {
    if (st === "day") {
      setDay(val);
    }
    if (st === "month") {
      setMonth(val);
    }
    if (st === "year") {
      setYear(val);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <View style={styles.inputWrap}>
        <RNPickerSelect
          placeholder={{
            label: "Gün",
            value: null,
          }}
          style={selectable}
          onValueChange={(val: string) => _onDateSelect("day", val)}
          items={days}
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
        <RNPickerSelect
          placeholder={{
            label: "Ay",
            value: null,
          }}
          style={selectable}
          onValueChange={(val: string) => _onDateSelect("month", val)}
          items={months}
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
        <RNPickerSelect
          placeholder={{
            label: "İl",
            value: null,
          }}
          style={selectable}
          onValueChange={(val: string) => _onDateSelect("year", val)}
          items={years}
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
    color: Colors.light.white,
    fontSize: 12,
  },
  inputWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    padding: 5,
    marginLeft: 5,
    flex: 1,
    height: 30,
    color: Colors.light.white,
  },
  chevronIcon: {
    top: 9,
    right: -3,
    color: Colors.light.white,
  },
});

const selectable = StyleSheet.create({
  inputIOS: {
    width: 90,
    height: 30,
    paddingLeft: 0,
    color: Colors.light.white,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.light.white,
  },
  inputAndroid: {
    width: 90,
    height: 30,
    paddingLeft: 0,
    color: Colors.light.white,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.light.white,
  },
  pickerBackground: {},
});
