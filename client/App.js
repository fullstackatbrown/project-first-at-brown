import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Login from "./components/auth/LoginScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* userId ? <> : <>*/}
        <Login />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
