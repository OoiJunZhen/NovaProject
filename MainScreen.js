import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MainPage = ({ navigation }) => {
  const menuItems = [
    { title: 'BUY', icon: 'shopping-cart', color: '#4CAF50', action: () => navigation.navigate('BuyScreen') },
    { title: 'AllOrder', icon: 'book', color: '#F16133', action: () => navigation.navigate('AllOrderScreen') },
    { title: 'Reprint', icon: 'mail', color: '#E5587C', action: () => navigation.navigate('ReprintScreen') },
    // Add other menu items here as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MAIN MENU [SG0003]</Text>
      <Text style={styles.balance}>Credit Balance: 9984.50</Text>
      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, { backgroundColor: item.color }]}
            onPress={item.action}
          >
            <Icon name={item.icon} size={40} color="#fff" />
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  header: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  balance: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  menuItem: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45,
    marginBottom: 15,
  },
  menuText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default MainPage;
