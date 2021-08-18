import React, { useState, useEffect } from "react";
import {
  Button,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import Divider from "../components/Divider";
import { RouteProp } from "@react-navigation/native";
import { MainStackParamList } from "../redux/types/navigation.type";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
  route: RouteProp<MainStackParamList, "Scanner">;
  navigation: StackNavigationProp<MainStackParamList, "Scanner">;
};

export default function ScannerScreen({ navigation, route }: Props) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    alert(`${type} - ${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <StatusBar style="light" backgroundColor="transparent" />
      <View style={styles.barcodeWrap}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <View
            style={{
              bottom: 10,
              right: 10,
              position: "absolute",
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
          >
            <Button
              title={"Tap to Scan Again"}
              onPress={() => setScanned(false)}
            />
          </View>
        )}
      </View>
      <View style={styles.infoWrap}>
        <View style={styles.inline}>
          <Text style={{ width: 65, fontWeight: "bold" }}>Anbar:</Text>
          <Text>{route.params.storeName}</Text>
        </View>
        <View style={styles.inline}>
          <Text style={{ width: 65, fontWeight: "bold" }}>Code:</Text>
          <Text>652743629837495</Text>
        </View>
        <View style={styles.inline}>
          <Text style={{ width: 65, fontWeight: "bold" }}>Product:</Text>
          <Text>Some product from Material</Text>
        </View>
        <Divider />
        <View style={styles.inline}>
          <TextInput keyboardType="number-pad" value="1" style={styles.input} />
          <Text>Count</Text>
        </View>
        <Divider />
        <Button title="Add" onPress={() => setScanned(false)} />
        <Divider />
        <Button title="Finish selling" onPress={() => setScanned(false)} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.container,
  },
  barcodeWrap: {
    width: "100%",
    height: 350,
    backgroundColor: Colors.light.container,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  infoWrap: {
    padding: 20,
    backgroundColor: "transparent",
  },
  input: {
    width: 100,
    height: 35,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "silver",
    backgroundColor: "white",
    marginRight: 10,
  },
  inline: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
  },
});
