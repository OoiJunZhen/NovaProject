// GlobalStyles.js
import { StyleSheet } from 'react-native';

const GlobalStyles = StyleSheet.create({
  colors: {
    primary: '#4CAF50',
    secondary: '#F16133',
    background: '#000',
    textPrimary: '#fff',
    textSecondary: '#ccc',
    cardBackground: '#1E1E1E',
  },
  text: {
    header: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
    },
    subHeader: {
      fontSize: 16,
      color: '#ccc',
    },
    menuText: {
      color: '#fff',
      fontSize: 12,
      textAlign: 'center',
    },
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000',
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default GlobalStyles;
