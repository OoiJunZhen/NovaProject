import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const OrderScreen = ({ route }) => {
  const { formattedData, totalPrice, details } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <Text style={styles.details}>{details}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  details: {
    fontSize: 16,
    marginBottom: 8,
  },
  data: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
});

export default OrderScreen;
