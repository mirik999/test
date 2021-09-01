import React, { useState, useEffect } from "react";
import { Alert, ScrollView, StyleSheet, TextInput } from "react-native";
import { View, Text } from "../components/Themed";
import Colors from "../constants/Colors";
import CustomPicker from "../components/picker-field/CustomPicker";
import Button from "../components/Button";
import Divider from "../components/Divider";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { MainStackParamList } from "../redux/types/navigation.type";
import { useMutation, useQuery } from "react-query";
import api from "../redux/api";
import { InvoiceProductType, InvoiceType } from "../redux/types/product.type";
import { invoiceInitialState } from "./Scanner/repository";

type Props = {
  route: RouteProp<MainStackParamList, "Products">;
  navigation: StackNavigationProp<MainStackParamList, "Products">;
};

export default function ProductListScreen({ navigation, route }: Props) {
  const [success, setSuccess] = useState(false);
  const [invoice, setInvoice] = useState<InvoiceType>(invoiceInitialState);
  const [invoiceProducts, setInvoiceProducts] = useState<InvoiceProductType[]>(
    []
  );
  //api request
  const mutation = useMutation(api.invoices.addInvoice);

  useEffect(() => {
    try {
      setInvoiceProducts(route.params.invoiceProducts);
      setInvoice(route.params.invoice);
    } catch (err) {
      console.log("err", err);
    }
  }, []);

  function _onChangeQuantity(prId: string, val: string) {
    setInvoiceProducts((prev) => {
      return prev.map((p, i) => {
        if (p.productId === prId) {
          return {
            ...p,
            quantity: +val,
          };
        }
        return p;
      });
    });
  }

  function _onRemoveFromList(product: InvoiceProductType) {
    Alert.alert(product.productName, "Silinsin ?", [
      {
        text: "Sil",
        onPress: () => {
          const newList = invoiceProducts.filter(
            (v) => v.productId !== product.productId
          );
          setInvoiceProducts(newList);
        },
      },
      {
        text: "Bağla",
        onPress: () => false,
      },
    ]);
  }

  async function _onSend() {
    try {
      invoice.listProduct = invoiceProducts;
      invoice.totalAmount = invoiceProducts.reduce(
        (acc, arr) => acc + arr.discountAmount,
        0
      );
      invoice.benefit = invoiceProducts.reduce(
        (acc, arr) => acc + arr.benefit,
        0
      );
      await mutation.mutateAsync(invoice);
      setSuccess(true);
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <View style={styles.listWrap}>
        <Text style={styles.header}>{route.params.storeName}</Text>
        {invoiceProducts.map((product, i) => {
          return (
            <View style={styles.listItemWrap} key={i}>
              <Text>{product.productName}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ marginHorizontal: 8 }}>
                  {product.cost * product.quantity} AZN
                </Text>
                <TextInput
                  keyboardType="number-pad"
                  value={`${product.quantity}`}
                  style={styles.input}
                  onChangeText={(val: string) =>
                    _onChangeQuantity(product.productId, val)
                  }
                />
                <Text style={{ marginHorizontal: 8 }}>Ədəd</Text>
                <Button text="Sil" onPress={() => _onRemoveFromList(product)} />
              </View>
            </View>
          );
        })}
      </View>
      <View style={styles.footerWrap}>
        <Button
          text="Satışa davam et"
          onPress={() =>
            navigation.navigate("Scanner", {
              storeId: route.params.storeId,
              storeName: route.params.storeName,
              invoiceProducts,
            })
          }
          disabled={success}
        />
        <Divider />
        <Button text="Qaiməyə əlavə et" onPress={_onSend} disabled={success} />
        <Divider />
        <Divider />
        {success ? (
          <View>
            <Text style={{ marginBottom: 5 }}>Satış uğurla tamamlandı</Text>
            <Button
              text="Yeni satış et"
              onPress={() => navigation.navigate("ShopList")}
            />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.container,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  listWrap: {
    width: "100%",
    padding: 20,
  },
  listItemWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    width: 50,
    height: 35,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "silver",
    backgroundColor: "white",
  },
  footerWrap: {
    padding: 20,
  },
});
