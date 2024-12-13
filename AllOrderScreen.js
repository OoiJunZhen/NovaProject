import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Share,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const AllOrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); // State for tracking selected order

  // Fetch orders from the database
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://192.168.30.117/NovaProject/fetch_orders.php");
      const result = await response.json();

      if (result.success) {
        setOrders(result.data);
      } else {
        Alert.alert("Error", "Failed to fetch orders: " + result.message);
      }
    } catch (error) {
      Alert.alert("Error", "Unable to fetch orders: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOrderPress = (orderId) => {
    if (selectedOrder === orderId) {
      setSelectedOrder(null); // Deselect the order if pressed again
    } else {
      setSelectedOrder(orderId); // Select the order
    }
  };

  const handleShare = async (order) => {
      try {
        await Share.share({
          message: order.details,
        });
      } catch (error) {
        console.error("Error sharing order details:", error.message);
      }
    };

  const handleDelete = (order) => {
    Alert.alert("Delete", `Deleting order: ${order.ticket_number}`);
  };

  const handleRebuy = (order) => {
    Alert.alert("Rebuy", `Rebuying order: ${order.ticket_number}`);
  };

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <TouchableOpacity onPress={() => handleOrderPress(item.id)}>
        <Text style={styles.title}>Ticket Number: {item.ticket_number}</Text>
        <Text style={styles.title}>Ticket Number 2: {item.ticket_number2}</Text>
        <Text style={styles.text}>Six DGD: {item.six_dgd}</Text>
        <Text style={styles.text}>Formatted Data:{"\n"}{item.formatted_data}</Text>
        <Text style={styles.text}>{"\n"}Result:{"\n"}{item.details}</Text>
        <Text style={styles.text}>Total Price: ${item.total_price}</Text>
        <Text style={styles.text}>Timestamp: {item.timestamp}</Text>
      </TouchableOpacity>
      {selectedOrder === item.id && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#4CAF50" }]}
            onPress={() => handleShare(item)}
          >
            <Icon name="share" size={20} color="#fff" />
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#F44336" }]}
            onPress={() => handleDelete(item)}
          >
            <Icon name="delete" size={20} color="#fff" />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#2196F3" }]}
            onPress={() => handleRebuy(item)}
          >
            <Icon name="shopping-cart" size={20} color="#fff" />
            <Text style={styles.buttonText}>Rebuy</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading orders...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrder}
        ListEmptyComponent={<Text style={styles.text}>No orders found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 3,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 14,
  },
});

export default AllOrderScreen;