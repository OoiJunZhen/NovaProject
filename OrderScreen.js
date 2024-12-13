import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = ({ route }) => {
  const {
    userInput,
    details = "No details available.",
    ticketNumber = "",
    ticketNumber2 = "",
    SixDGD = "",
  } = route.params || {};
  
  const navigation = useNavigation();

  const handleShare = async () => {
    try {
      await Share.share({
        message: details,
      });
    } catch (error) {
      console.error("Error sharing order details:", error.message);
    }
  };

  const handleEdit = () => {
    // Navigate to ReBuyScreen with pre-filled data
    navigation.navigate("ReBuyScreen", {
      userInput,
      ticketNumber,
      ticketNumber2,
      SixDGD,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <Text style={styles.details}>{details}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 16,
  },
  userInputContainer: {
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  userInputText: {
    fontSize: 16,
    marginBottom: 4,
  },
  noInputText: {
    fontSize: 16,
    color: "#888",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  shareButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default OrderScreen;
