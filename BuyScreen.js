import React, { useState, useEffect } from "react";
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

const CustomKeyboard = ({ onKeyPress }) => {
  const rows = [
    ["1", "2", "3", "⌫"],
    ["4", "5", "6", "D"],
    ["7", "8", "9", "OK"],
    ["*", "0", "#", "↵"],
  ];

  return (
    <View style={styles.keyboard}>
      {rows.map((row, rowIndex) => (
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
    const interval = setInterval(() => {
      setCaretVisible((prev) => !prev);
    }, 500); // Blinks every 500ms
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Handle key presses
  const handleKeyPress = (key) => {
    if (key === "↵") {
      setTextFields((prev) => [...prev, { id: prev.length + 1, value: "" }]);
      setActiveField(textFields.length + 1);
    } else if (key === "⌫") {
      setTextFields((prev) =>
        prev.map((field) =>
          field.id === activeField
            ? { ...field, value: field.value.slice(0, -1) }
            : field
        )
      );
    } else if (key === "OK") {
      setModalVisible(true); // Show the modal for ticket number
    } else {
      setTextFields((prev) =>
        prev.map((field) =>
          field.id === activeField
            ? { ...field, value: field.value + key }
            : field
        )
      );
    }
  };

  // Handle field focus
  const handleFocus = (id) => {
    setActiveField(id);
  };

  // Handle submit
  const handleSubmit = () => {
    const mapping = { 1: "M", 2: "K", 3: "T", 4: "S", 8: "G", 9: "E" };
  
    const formattedData = textFields
      .map((field) => {
        const input = field.value;
  
        if (input.includes("#")) {
          const parts = input.split("#");
          const base = parts[0];
  
          // Dynamically generate suffixes based on user input
          const mappedSuffixes = parts
            .slice(1) // Ignore the base part
            .map((value, index) => {
              const suffixLabel = ["B", "S", "A", "C"][index] || ""; // Get label dynamically
              return suffixLabel ? `${suffixLabel}${value}` : ""; // Combine label with user input
            })
            .filter((suffix) => suffix !== "") // Remove empty suffixes
            .join("-");
  
          return `${base} ${mappedSuffixes}`;
        } else {
          return input
            .split("")
            .map((char) => (mapping[char] ? `${mapping[char]}` : char))
            .join("");
        }
      })
      .join("\n");
  
    // Calculate totalPrice
    const totalPrice = textFields.reduce((total, field) => {
      const input = field.value;
  
      if (input.includes("#")) {
        const parts = input.split("#").slice(1); // Extract values after the base part
        const sumOfNumbers = parts.reduce((sum, value) => sum + parseInt(value || 0, 10), 0);
  
        // Find another field without # to use its digit count
        const multiplierField = textFields.find((f) => !f.value.includes("#"));
        const multiplier = multiplierField ? multiplierField.value.length : 1;
  
        return total + sumOfNumbers * multiplier;
      } else {
        return total; // No # means no addition to total
      }
    }, 0);
  
    const currentDate = new Date();
    const formattedDate =
      `${currentDate.getDate().toString().padStart(2, "0")}/` +
      `${(currentDate.getMonth() + 1).toString().padStart(2, "0")}/` +
      `99 ${currentDate.getHours().toString().padStart(2, "0")}:` +
      `${currentDate.getMinutes().toString().padStart(2, "0")}:` +
      `${currentDate.getSeconds().toString().padStart(2, "0")}`;
  
    const AppName = "(PP)";
    const userName = "SG0003";
    const specialChar = "*BSAC4A 1*1";
    const buyDate = "30/11";
  
    Alert.alert(
      "Output",
      `${AppName}\n` +
        `B${formattedDate}\n` +
        `${userName}#${ticketNumber}\n` +
        `${specialChar}\n` +
        `${buyDate}\n` +
        `${formattedData}\n` +
        `T = ${totalPrice}\n` +
        `NT = ${totalPrice}\n` +
        `${ticketNumber2} PP\n` +
        `Free 6D GD\n` +
        `${buyDate}\n` +
        `${SixDGD}\n` +
        `Sila semak resit.\n` +
        `Bayaran ikut resit.\n`
    );
  };  
  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.inputContainer}>
        {textFields.map((field) => (
          <TouchableOpacity
            key={field.id}
            onPress={() => handleFocus(field.id)}
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

      {/* Ticket Number Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
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
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="red"
              />
              <Button
                title="Submit"
                onPress={() => {
                  setModalVisible(false);
                  handleSubmit();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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