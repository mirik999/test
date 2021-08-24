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
import api from "../redux/api";

type Props = {
  route: RouteProp<MainStackParamList, "Scanner">;
  navigation: StackNavigationProp<MainStackParamList, "Scanner">;
};

export default function ScannerScreen({ navigation, route }: Props) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: any) => {
    setScanned(true);
    const scanType = type.toLowerCase().includes("qr") ? "qrcode" : "barcode";
    try {
      const productResponse = await api.products.getProductByScanData(
        scanType,
        data
      );
      console.log({ productResponse });
    } catch (err) {
      console.log({ err });
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  function _onProcess() {
    setScanned(false);
  }

  function _onFinish() {
    setScanned(false);
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
            <Button title="Yenidən skan et" onPress={() => setScanned(false)} />
          </View>
        )}
      </View>
      <View style={styles.infoWrap}>
        <View style={styles.inline}>
          <Text style={{ width: 65, fontWeight: "bold" }}>Anbar:</Text>
          <Text>{route.params.storeName}</Text>
        </View>
        <View style={styles.inline}>
          <Text style={{ width: 65, fontWeight: "bold" }}>Kod:</Text>
          <Text>652743629837495</Text>
        </View>
        <View style={styles.inline}>
          <Text style={{ width: 65, fontWeight: "bold" }}>Məhsul:</Text>
          <Text>Some product from Material</Text>
        </View>
        <Divider />
        <View style={styles.inline}>
          <TextInput keyboardType="number-pad" value="1" style={styles.input} />
          <Text>Ədəd</Text>
        </View>
        <Divider />
        <Button title="Əlavə et" onPress={_onProcess} />
        <Divider />
        <Button title="Satışı bitir" onPress={_onFinish} />
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
    borderBottomColor: "silver",
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
