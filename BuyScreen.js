import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  KeyboardAvoidingView,
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
  const [textFields, setTextFields] = useState([
    { id: 1, value: "", cursorPosition: 0 },
  ]);
  const [activeField, setActiveField] = useState(1);
  const [caretVisible, setCaretVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");
  const [ticketNumber2, setTicketNumber2] = useState("");
  const [SixDGD, setSixDGD] = useState("");

  const navigation = useNavigation();

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
    setTextFields((prev) => [
      ...prev,
      { id: prev.length + 1, value: "", cursorPosition: 0 },
    ]);
    setActiveField(textFields.length + 1);
  };

  const deleteLastCharacter = () => {
    setTextFields((prev) =>
      prev.map((field) =>
        field.id === activeField && field.cursorPosition > 0
          ? {
              ...field,
              value:
                field.value.slice(0, field.cursorPosition - 1) +
                field.value.slice(field.cursorPosition),
              cursorPosition: field.cursorPosition - 1, // Move cursor back
            }
          : field
      )
    );
  };

  const appendCharacter = (key) => {
    setTextFields((prev) =>
      prev.map((field) =>
        field.id === activeField
          ? {
              ...field,
              value:
                field.value.slice(0, field.cursorPosition) +
                key +
                field.value.slice(field.cursorPosition),
              cursorPosition: field.cursorPosition + 1, // Move cursor forward
            }
          : field
      )
    );
  };

  const handleFieldFocus = (id) => setActiveField(id);

  const handleTextChange = (text, id) => {
    setTextFields((prev) =>
      prev.map((field) =>
        field.id === id
          ? {
              ...field,
              value: text,
              cursorPosition: text.length, // Update cursor to the end
            }
          : field
      )
    );
  };

  const updateCursorPosition = (e, id) => {
    const position = e.nativeEvent.selection.start;
    setTextFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, cursorPosition: position } : field
      )
    );
  };

  const handleSubmit = () => {
    const formattedData = formatData();
    const totalPrice = calculateTotalPrice();

    const details = generateOutputMessage(formattedData, totalPrice);

    // Navigate to OutputScreen with data
    navigation.navigate("OrderScreen", {
      userInput: textFields,
      details,
      ticketNumber,
      ticketNumber2,
      SixDGD,
    });

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
          console.log("Base:", base);
          console.log("Parts:", parts);

          const cleanedBase = base.replace("**", "");
          const cleanedBase1 = base.replace("*", "");
          console.log("Cleaned Base:", cleanedBase);
          console.log("Cleaned Base1:", cleanedBase1);

          if (base.startsWith("**")) {
            const formattedParts = mapSuffixes(parts, ["B", "S"]);
            console.log("Formatted Parts for '**':", formattedParts);
            return `ib(${cleanedBase}) ${formattedParts}`;
          }

          if (base.startsWith("*")) {
            const formattedParts = mapSuffixes(parts, ["B", "S"]);
            console.log("Formatted Parts for '*':", formattedParts);
            return `box(${cleanedBase1}) ${formattedParts}`;
          }

          if (cleanedBase.length === 4) {
            // 4-digit validation
            const formattedParts = input.includes("**#")
              ? mapSuffixes(parts, ["4A", "4B", "4C", "4D", "4E"])
              : mapSuffixes(parts, ["B", "S", "A", "C"]);
            console.log("Formatted Parts for 4-digit base:", formattedParts);
            return `${cleanedBase} ${formattedParts}`;
          } else if (cleanedBase.length === 3) {
            // 3-digit validation
            const formattedParts = input.includes("**#")
              ? mapSuffixes(parts, ["A", "QB", "QC", "QD", "QE"])
              : mapSuffixes(parts, ["A", "C"]);
            console.log("Formatted Parts for 3-digit base:", formattedParts);
            return `${cleanedBase} ${formattedParts}`;
          }
        } else if (!input.includes("#") || !input.includes("**#")) {
          const mappedCharacters = mapCharacters(input, mapping);
          console.log("Mapped Characters:", mappedCharacters);
          return mappedCharacters; // Default character mapping
        }
      })
      .join("\n");
  };

  // Utility to map suffixes to parts
  const mapSuffixes = (values, labels) =>
    values
      .map((value, index) => (labels[index] ? `${labels[index]}${value}` : ""))
      .filter(Boolean)
      .join("-");

  // Utility to map characters using mapping
  const mapCharacters = (input, mapping) =>
    input
      .split("")
      .map((char) => mapping[char] || char)
      .join("");

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    let currentGroup = [];
    let multiplier = 1;

    const groups = [];

    // Helper function to calculate factorial
    const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

    // Helper function to calculate permutations
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

    // Helper function to calculate the number of digits in the multiplier
    const getMultiplierLength = (num) => num.toString().length;

    // Group inputs and calculate their respective sums and totals
    textFields.forEach((field) => {
      const input = field.value;

      if (!input.includes("#")) {
        // If it's a line without `#`, it's a multiplier and marks the start of a new group
        if (currentGroup.length > 0) {
          // Process the previous group before starting a new one
          const sum = currentGroup.reduce((sum, item) => {
            const [base, ...parts] = item.split("#"); // Split input into base and parts
            const baseMultiplier =
              base.startsWith("*") && !base.startsWith("**")
                ? calculatePermutations(base.replace("*", ""))
                : 1; // Use permutation multiplier for `*` prefixed base
            const partsSum = parts.reduce(
              (acc, num) => acc + parseInt(num || 0, 10),
              0
            );
            return sum + partsSum * baseMultiplier;
          }, 0);

          const groupMultiplier = getMultiplierLength(multiplier); // Get length of multiplier
          const groupTotal = sum * groupMultiplier;
          totalPrice += groupTotal;

          groups.push({
            group: [multiplier.toString(), ...currentGroup],
            sum,
            total: groupTotal,
          });
        }

        // Start a new group
        currentGroup = [];
        multiplier = parseInt(input, 10) || 1;
      } else {
        // If it contains `#`, add it to the current group
        currentGroup.push(input);
      }
    });

    // Process the last group
    if (currentGroup.length > 0) {
      const sum = currentGroup.reduce((sum, item) => {
        const [base, ...parts] = item.split("#"); // Split input into base and parts
        const baseMultiplier =
          base.startsWith("*") && !base.startsWith("**")
            ? calculatePermutations(base.replace("*", ""))
            : 1; // Use permutation multiplier for `*` prefixed base
        const partsSum = parts.reduce(
          (acc, num) => acc + parseInt(num || 0, 10),
          0
        );
        return sum + partsSum * baseMultiplier;
      }, 0);

      const groupMultiplier = getMultiplierLength(multiplier); // Get length of multiplier
      const groupTotal = sum * groupMultiplier;
      totalPrice += groupTotal;

      groups.push({
        group: [multiplier.toString(), ...currentGroup],
        sum,
        total: groupTotal,
      });
    }

    // Log the grouped results for clarity (can be removed in production)
    groups.forEach(({ group, sum, total }) => {
      console.log(
        `Group: ${JSON.stringify(group)}, Sum: ${sum}, Total: ${total}`
      );
    });

    // Log the total price
    console.log(`Total Price: ${totalPrice}`);

    return totalPrice;
  };

  const generateOutputMessage = (formattedData, totalPrice) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/99 ${currentDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${currentDate
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;

    return (
      `(PP)\nB${formattedDate}\nSG0003#${ticketNumber}\n*BSAC4A 1*1\n30/11\n${formattedData}\n` +
      `T = ${totalPrice}\nNT = ${totalPrice}\n${ticketNumber2} PP\n` +
      `Free 6D GD\n30/11\n${SixDGD}\nSila semak resit.\nBayaran ikut resit.\n`
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView style={styles.inputContainer}>
        {textFields.map((field) => (
          <TextInput
            key={field.id}
            style={[
              styles.input,
              activeField === field.id && styles.activeInput,
            ]}
            value={field.value}
            onChangeText={(text) => handleTextChange(text, field.id)}
            onFocus={() => handleFieldFocus(field.id)}
            showSoftInputOnFocus={false} // Disable default keyboard
            onSelectionChange={(e) => updateCursorPosition(e, field.id)}
            selection={{
              start: field.cursorPosition,
              end: field.cursorPosition,
            }} // Sync cursor position
          />
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
    </KeyboardAvoidingView>
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
