import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { StyleSheet, StatusBar } from "react-native";
import MainScreen from "./MainScreen";
import BuyScreen from "./BuyScreen";
import OrderScreen from "./OrderScreen";
import ReBuyScreen from "./ReBuyScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

// ErrorBoundary Component for fallback UI
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaProvider>
          <MainScreen />
        </SafeAreaProvider>
      );
    }
    return this.props.children;
  }
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator
            initialRouteName="MainScreen"
            screenOptions={{
              headerStyle: styles.headerStyle,
              headerTintColor: "#fff",
              headerTitleStyle: styles.headerTitle,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Smooth transitions
            }}
          >
            <Stack.Screen
              name="MainScreen"
              component={MainScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BuyScreen"
              component={BuyScreen}
              options={{ title: "Buy" }}
            />
            <Stack.Screen
              name="OrderScreen"
              component={OrderScreen}
              options={{ title: "Order Summary" }}
            />
            <Stack.Screen 
            name="ReBuyScreen" 
            component={ReBuyScreen} 
            options = {{ title: "Buy"}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#4CAF50", // Customize header background color
  },
  headerTitle: {
    fontWeight: "bold",
  },
});

export default App;
