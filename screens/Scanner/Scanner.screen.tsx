import React, { useState, useEffect, useMemo } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Vibration,
} from "react-native";
import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
//rest
import { MainStackParamList } from "../../redux/types/navigation.type";
import Colors from "../../constants/Colors";
import api from "../../redux/api";
import {
  InvoiceProductType,
  InvoiceType,
  ProductType,
} from "../../redux/types/product.type";
import Divider from "../../components/Divider";
import { Text, View } from "../../components/Themed";
import Button from "../../components/Button";
import {
  checkTypeofScannedData,
  convertProductToInvoiceProduct,
} from "../../redux/functions/invoice.function";
import {
  initialState,
  invoiceInitialState,
  invoiceProductInitialState,
} from "./repository";

type Props = {
  route: RouteProp<MainStackParamList, "Scanner">;
  navigation: StackNavigationProp<MainStackParamList, "Scanner">;
};

export default function ScannerScreen({ navigation, route }: Props) {
  const [cameraVisibility, setCameraVisibility] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<ProductType>(initialState);
  const [invoice, setInvoice] = useState<InvoiceType>(invoiceInitialState);
  const [invoiceProduct, setInvoiceProduct] = useState<InvoiceProductType>(
    invoiceProductInitialState
  );
  const [invoiceProducts, setInvoiceProducts] = useState<InvoiceProductType[]>(
    []
  );

  // remove barcode reader component from UI else
  // camera will be working in any  other screen
  useFocusEffect(() => {
    setCameraVisibility(true);
    return () => {
      setCameraVisibility(false);
    };
  });

  // when decided to continue shopping update list from product-list screen
  // if there some product removed
  useEffect(() => {
    setInvoiceProducts(route.params.invoiceProducts);
  }, [route.params.invoiceProducts]);

  // check camera permission
  // keep invoice data initial and add storeId from route params ( shop-list screen )
  useEffect(() => {
    (async function() {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
      const invoiceData = {
        ...invoiceInitialState,
        storeIdFirst: route.params.storeId,
      };
      setInvoice(invoiceData);
    })()
  }, []);

  // prepare invoice product from product and calculate some data
  useMemo(() => {
    const { storeName, storeId } = route.params;
    const invProductObject = convertProductToInvoiceProduct(
      product,
      quantity,
      storeId,
      storeName
    );
    setInvoiceProduct(invProductObject);
  }, [product, quantity]);

  // get product by scanned data (id from qrcode or barcode)
  // check if product exists in list already show warning
  // store in state original product data
  // vibrate the phone ( extra )
  const handleBarCodeScanned = async ({ type, data }: any) => {
    setScanned(true);
    const scanType = checkTypeofScannedData(type);
    try {
      const productResponse = await api.products.getProductByScanData(
        scanType,
        data
      );
      const isExists = invoiceProducts.some(
        (ipd) => ipd.productId === productResponse.id
      );
      if (isExists) {
        Alert.alert("Bu məhsul artıq siyahıdadır");
      } else {
        setProduct(productResponse);
        Platform.OS === "android"
          ? Vibration.vibrate(100)
          : Vibration.vibrate([100]);
      }
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

  // push invoiceProduct to array list
  // set invoiceProduct ot initialState
  // set input quantity value to initial (1)
  // clean scanned product state
  function _onAddToInvoiceList() {
    setInvoiceProducts((prev) => [invoiceProduct, ...prev]);
    setInvoiceProduct(invoiceProductInitialState);
    setQuantity(1);
    setProduct(initialState);
  }

  function _onFinish() {
    navigation.navigate("Products", {
      storeId: route.params.storeId,
      storeName: route.params.storeName,
      invoiceProducts,
      invoice,
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" backgroundColor="transparent" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: Colors.light.container }}>
          {cameraVisibility ? (
            <View style={styles.barcodeWrap}>
              <Camera
                style={[StyleSheet.absoluteFill]}
                type={"back"}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              />
              {scanned && (
                <View style={styles.scanBtn}>
                  <Button
                    text="Yenidən skan et"
                    onPress={() => setScanned(false)}
                  />
                </View>
              )}
            </View>
          ) : (
            <View style={styles.barcodeWrap} />
          )}
          <View style={styles.infoWrap}>
            <View style={styles.inline}>
              <Text style={{ width: 65, fontWeight: "bold" }}>Anbar:</Text>
              <Text>{route.params.storeName}</Text>
            </View>
            <View style={styles.inline}>
              <Text style={{ width: 65, fontWeight: "bold" }}>Kod:</Text>
              <Text>{invoiceProduct.code}</Text>
            </View>
            <View style={styles.inline}>
              <Text style={{ width: 65, fontWeight: "bold" }}>Məhsul:</Text>
              <Text>{invoiceProduct.productName}</Text>
            </View>
            <Divider />
            <View style={styles.inline}>
              <TextInput
                keyboardType="number-pad"
                value={`${quantity}`}
                style={styles.input}
                onChangeText={(val: string) => setQuantity(+val)}
              />
              <Text>Ədəd</Text>
            </View>
            <Divider />
            <Button
              text="Əlavə et"
              onPress={_onAddToInvoiceList}
              disabled={!Boolean(product.productName)}
            />
            <Divider />
            <Button
              text="Satışı bitir"
              onPress={_onFinish}
              disabled={!Boolean(invoiceProducts.length)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barcodeWrap: {
    width: "100%",
    height: 300,
    backgroundColor: Colors.light.container,
    borderBottomWidth: 1,
    borderBottomColor: "silver",
  },
  infoWrap: {
    padding: 20,
    backgroundColor: Colors.light.container,
  },
  input: {
    width: 50,
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
    marginBottom: 10,
  },
  scanBtn: {
    bottom: 10,
    right: 0,
    position: "absolute",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
  },
});
