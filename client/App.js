import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useSelector } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

import store from "./redux/store";
import Login from "./components/auth/LoginScreen";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Login />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
