import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { StatusBar } from "expo-status-bar";

export default function ScannerScreen() {
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
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="transparent" />
      <View style={styles.barcodeWrap}>
        {/*<BarCodeScanner*/}
        {/*  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}*/}
        {/*  style={StyleSheet.absoluteFillObject}*/}
        {/*/>*/}
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
    </View>
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
});
