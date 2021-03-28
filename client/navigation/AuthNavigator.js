import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../components/auth/LoginScreen";
import SignupScreen from "../components/auth/SignupScreen";

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
