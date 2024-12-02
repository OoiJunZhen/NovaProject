import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Button,
} from "react-native";

// Custom Keyboard Component
const CustomKeyboard = ({ onKeyPress }) => {
  const keys = [
    ["1", "2", "3", "⌫"],
    ["4", "5", "6", "D"],
    ["7", "8", "9", "OK"],
    ["*", "0", "#", "↵"],
  ];

  return (
    <View style={styles.keyboard}>
      {keys.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <TouchableOpacity
              key={key}
              style={styles.key}
              onPress={() => onKeyPress(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

// Main BuyScreen Component
const BuyScreen = () => {
  const [textFields, setTextFields] = useState([{ id: 1, value: "" }]);
  const [activeField, setActiveField] = useState(1);
  const [caretVisible, setCaretVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");
  const [ticketNumber2, setTicketNumber2] = useState("");
  const [SixDGD, setSixDGD] = useState("");

  // Toggle caret visibility
  useEffect(() => {
    const interval = setInterval(() => setCaretVisible((prev) => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  // Handlers for KeyPress
  const handleKeyPress = (key) => {
    if (key === "↵") addNewField();
    else if (key === "⌫") deleteLastCharacter();
    else if (key === "OK") setModalVisible(true);
    else appendCharacter(key);
  };

  const addNewField = () => {
    setTextFields((prev) => [...prev, { id: prev.length + 1, value: "" }]);
    setActiveField(textFields.length + 1);
  };

  const deleteLastCharacter = () => {
    setTextFields((prev) =>
      prev.map((field) =>
        field.id === activeField
          ? { ...field, value: field.value.slice(0, -1) }
          : field
      )
    );
  };

  const appendCharacter = (key) => {
    setTextFields((prev) =>
      prev.map((field) =>
        field.id === activeField ? { ...field, value: field.value + key } : field
      )
    );
  };

  const handleFieldFocus = (id) => setActiveField(id);

  const navigation = useNavigation(); // Hook for navigation

  const handleSubmit = () => {
    const formattedData = formatData();
    const totalPrice = calculateTotalPrice();

    const details = generateOutputMessage(formattedData, totalPrice);

    // Navigate to OutputScreen with data
    navigation.navigate("OrderScreen", { formattedData, totalPrice, details });

    resetBuyScreen();
  };

  const resetBuyScreen = () => {
    // Reset all fields to initial state
    setTextFields([{ id: 1, value: "" }]);
    setActiveField(1);
    setTicketNumber("");
    setTicketNumber2("");
    setSixDGD("");
    setModalVisible(false);
  };
  
  const formatData = () => {
    const mapping = { 1: "M", 2: "K", 3: "T", 4: "S", 8: "G", 9: "E" };
  
    return textFields
      .map((field) => {
        const input = field.value;
  
        if (input.includes("#")) {
          const [base, ...parts] = input.split("#");
          const cleanedBase = base.replace("**", ""); // Remove "**"
          const cleanedBase1 = base.replace("*", "");

          if (base.startsWith("**")) {
            const formattedParts = mapSuffixes(parts, ["B", "S"]);
            return `ib(${cleanedBase}) ${formattedParts}`;
          }

          if (base.startsWith("*")) {
            const formattedParts = mapSuffixes(parts, ["B", "S"]);
            return `box(${cleanedBase1}) ${formattedParts}`;
          }
  
          if (base.length === 4) {
            // 4-digit validation
            return input.includes("**#")
              ? `${cleanedBase} ${mapSuffixes(parts, ["4A", "4B", "4C", "4D", "4E"])}`
              : `${cleanedBase} ${mapSuffixes(parts, ["B", "S", "A", "C"])}`;
          } else if (base.length === 3) {
            // 3-digit validation
            return input.includes("**#")
              ? `${cleanedBase} ${mapSuffixes(parts, ["A", "QB", "QC", "QD", "QE"])}`
              : `${cleanedBase} ${mapSuffixes(parts, ["A", "C"])}`;
          }
        }
  
        return mapCharacters(input, mapping); // Default character mapping
      })
      .join("\n");
  };
  
  // Utility to map suffixes to parts
  const mapSuffixes = (values, labels) =>
    values
      .map((value, index) => (labels[index] ? `${labels[index]}${value}` : ""))
      .filter(Boolean)
      .join("-");
  

  const mapCharacters = (input, mapping) =>
    input
      .split("")
      .map((char) => mapping[char] || char)
      .join("");

      const calculateTotalPrice = () => {
        // Utility function to calculate factorial
        const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
      
        // Utility function to calculate permutations
        const calculatePermutations = (numString) => {
          const freq = {};
          for (const char of numString) {
            freq[char] = (freq[char] || 0) + 1; // Count frequency of each digit
          }
      
          const totalDigits = numString.length; // Total digits
          const denominator = Object.values(freq).reduce(
            (acc, count) => acc * factorial(count),
            1
          );
          return factorial(totalDigits) / denominator;
        };
      
        return textFields.reduce((total, field) => {
          const input = field.value;
      
          if (input.includes("#")) {
            const [base, ...parts] = input.split("#"); // Split input into base and parts
            const sum = parts.reduce((sum, value) => sum + parseInt(value || 0, 10), 0);
      
            let multiplier = 1;
            let multiplier1 = 1;
      
            // Check if the base starts with "*"
            if (base.startsWith("*")) {
              const cleanedBase = base.replace("*", ""); // Remove the leading '*'
              multiplier = calculatePermutations(cleanedBase); // Calculate permutation-based multiplier
              multiplier1 = textFields.find((f) => !f.value.includes("#"))?.value.length;
            } else {
              // Default multiplier for entries without '*'
              multiplier1 = textFields.find((f) => !f.value.includes("#"))?.value.length;
            }
      
            return total + sum * multiplier * multiplier1; // Add weighted sum to total
          }
      
          return total; // Add 0 for inputs without '#'
        }, 0);
      };       

  const generateOutputMessage = (formattedData, totalPrice) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, "0")}/${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/99 ${currentDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${currentDate.getSeconds().toString().padStart(2, "0")}`;

    return (
      `(PP)\nB${formattedDate}\nSG0003#${ticketNumber}\n*BSAC4A 1*1\n30/11\n${formattedData}\n` +
      `T = ${totalPrice}\nNT = ${totalPrice}\n${ticketNumber2} PP\n` +
      `Free 6D GD\n30/11\n${SixDGD}\nSila semak resit.\nBayaran ikut resit.\n`
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.inputContainer}>
        {textFields.map((field) => (
          <TouchableOpacity
            key={field.id}
            onPress={() => handleFieldFocus(field.id)}
          >
            <View
              style={[
                styles.input,
                activeField === field.id && styles.activeInput,
              ]}
            >
              <Text style={styles.inputText}>
                {field.value}
                {activeField === field.id && caretVisible && (
                  <Text style={styles.caret}>|</Text>
                )}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <CustomKeyboard onKeyPress={handleKeyPress} />

      <ModalComponent
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        ticketNumber={ticketNumber}
        setTicketNumber={setTicketNumber}
        ticketNumber2={ticketNumber2}
        setTicketNumber2={setTicketNumber2}
        SixDGD={SixDGD}
        setSixDGD={setSixDGD}
      />
    </View>
  );
};

// Modal Component
const ModalComponent = ({
  visible,
  onCancel,
  onSubmit,
  ticketNumber,
  setTicketNumber,
  ticketNumber2,
  setTicketNumber2,
  SixDGD,
  setSixDGD,
}) => (
  <Modal visible={visible} transparent={true} animationType="fade">
    <View style={styles.modalBackground}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Enter Ticket Number</Text>
        <TextInput
          style={styles.modalInput}
          placeholder="Ticket Number"
          value={ticketNumber}
          onChangeText={setTicketNumber}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.modalInput}
          placeholder="Ticket Number 2"
          value={ticketNumber2}
          onChangeText={setTicketNumber2}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.modalInput}
          placeholder="6D GD"
          value={SixDGD}
          onChangeText={setSixDGD}
          keyboardType="numeric"
        />
        <View style={styles.modalActions}>
          <Button title="Cancel" onPress={onCancel} color="red" />
          <Button title="Submit" onPress={onSubmit} />
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d3d3d3",
    padding: 12,
    paddingBottom: 6,
  },
  inputContainer: {
    flex: 1,
    marginBottom: 10,
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  activeInput: {
    borderColor: "#FFA500",
    borderWidth: 2,
  },
  inputText: {
    fontSize: 17,
    color: "#000",
    lineHeight: 25,
  },
  caret: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    lineHeight: 25,
  },
  keyboard: {
    padding: 2,
    backgroundColor: "#f2f2f2",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
    marginVertical: 1.5,
  },
  key: {
    width: "24%",
    aspectRatio: 1.25,
    marginHorizontal: 2,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  keyText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalInput: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default BuyScreen;
