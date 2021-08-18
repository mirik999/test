import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "../components/Themed";
import Colors from "../constants/Colors";
import CustomPicker from "../components/picker-field/CustomPicker";
import Button from "../components/Button";
import Divider from "../components/Divider";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { MainStackParamList } from "../redux/types/navigation.type";
import { useQuery } from "react-query";
import api from "../redux/api";

type Props = {
  route: RouteProp<MainStackParamList, "ShopList">;
  navigation: StackNavigationProp<MainStackParamList, "ShopList">;
};

export default function ShopListScreen({ navigation, route }: Props) {
  const query = useQuery("stores", () => {
    return api.stores.getStores();
  });
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [selectedStore, setSelectedStore] = useState("");

  useEffect(() => {
    if (query.isSuccess) {
      if (query.data?.list) {
        const opts = query.data.list.map((opt) => ({
          label: opt.name,
          value: opt.id,
        }));
        setOptions(opts);
      }
    }
  }, [query.isSuccess]);

  return (
    <View style={styles.container}>
      <View style={styles.pickerWrap}>
        <CustomPicker
          label="Magaza sechin"
          options={options}
          getValue={(val: string) => setSelectedStore(val)}
        />
        <Divider />
        <Divider />
        <Divider />
        <Button
          text="Skan et"
          onPress={() =>
            navigation.navigate("Scanner", {
              storeId: selectedStore,
              storeName: options.find((opt) => opt.value === selectedStore)!
                .label,
            })
          }
        />
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
