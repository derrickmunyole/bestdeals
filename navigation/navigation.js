import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/register";
import Login from "../screens/login";
import Dashboard from "../screens/Dashboard";
import SavedItemsScreen from "../screens/SavedItemsScreen";

const Stack = createNativeStackNavigator();

function Navigation({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Wishlist" component={SavedItemsScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
