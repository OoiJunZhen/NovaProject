import React, { useState } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Text } from 'react-native';

const BuyScreen = () => {
  const [inputs, setInputs] = useState({ first: '', second: '', third: '' });

  const handleChange = (field, value) => {
    setInputs({ ...inputs, [field]: value });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.header}>BUY</Text>
      <TextInput
        style={styles.input}
        placeholder="D"
        placeholderTextColor="#aaa"
        value={inputs.first}
        onChangeText={(value) => handleChange('first', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="123"
        placeholderTextColor="#aaa"
        value={inputs.second}
        onChangeText={(value) => handleChange('second', value)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.inputHighlighted}
        placeholder="1234#1#1#1#1"
        placeholderTextColor="#aaa"
        value={inputs.third}
        onChangeText={(value) => handleChange('third', value)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  inputHighlighted: {
    height: 40,
    borderColor: '#FFA500',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});

export default BuyScreen;
