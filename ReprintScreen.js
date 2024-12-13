import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const ReprintScreen = () => {
  const [date, setDate] = useState("");
  const [ticketNo, setTicketNo] = useState("");
  const [ticketFrom, setTicketFrom] = useState("");
  const [ticketTo, setTicketTo] = useState("");
  const [number, setNumber] = useState("");
  const [phone, setPhone] = useState("");

  const clearInputs = () => {
    setDate("");
    setTicketNo("");
    setTicketFrom("");
    setTicketTo("");
    setNumber("");
    setPhone("");
  };

  const handleOk = () => {
    // Add logic to handle the "OK" button action
    console.log({ date, ticketNo, ticketFrom, ticketTo, number, phone });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>DATE</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Enter Date"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
      />

      <Text style={styles.label}>TICKET NO.</Text>
      <TextInput
        style={styles.input}
        value={ticketNo}
        onChangeText={setTicketNo}
        placeholder="Enter Ticket No."
        placeholderTextColor="#aaa"
        keyboardType="numeric"
      />

      <Text style={styles.label}>TICKET FROM</Text>
      <TextInput
        style={styles.input}
        value={ticketFrom}
        onChangeText={setTicketFrom}
        placeholder="Enter Ticket From"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
      />

      <Text style={styles.label}>TICKET TO</Text>
      <TextInput
        style={styles.input}
        value={ticketTo}
        onChangeText={setTicketTo}
        placeholder="Enter Ticket To"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
      />

      <Text style={styles.label}>NUMBER</Text>
      <TextInput
        style={styles.input}
        value={number}
        onChangeText={setNumber}
        placeholder="Enter Number"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
      />

      <Text style={styles.label}>PHONE</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter Phone"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleOk}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={clearInputs}>
          <Text style={styles.buttonText}>CLEAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aaa",
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#ff0",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ReprintScreen;