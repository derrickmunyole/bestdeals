import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/register";
import Login from "../screens/login";
import Dashboard from "../screens/Dashboard";
import SavedItemsScreen from "../screens/SavedItemsScreen";
import DetailsScreen from "../screens/DetailsScreen";
import AllItems from "../screens/AllItems";
import AuthContext from "../auth/AuthContext";
import FavoritesProvider from "../favorites/FavoritesProvider";
import WebViewScreen from "../screens/WebViewScreen";
import SearchModal from "../components/SearchModal";
import OfflineNotificationComponent from "../components/OfflineNotificationComponent";

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Dashboard"
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ gestureEnabled: true }}
      />
      <Stack.Screen name="Wishlist" component={SavedItemsScreen} />
      <Stack.Screen name="All" component={AllItems} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="WebView" component={WebViewScreen} />
      <Stack.Screen name="SearchModal" component={SearchModal} />
    </Stack.Navigator>
  );
}

function UnauthenticatedStack() {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Register"
    >
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
}

function Navigation({ isAuthenticated }) {
  const { token } = useContext(AuthContext);
  return (
    <>
      <OfflineNotificationComponent />
      <NavigationContainer>
        {token ? (
          <FavoritesProvider>
            <AuthenticatedStack />
          </FavoritesProvider>
        ) : (
          <UnauthenticatedStack />
        )}
      </NavigationContainer>
    </>
  );
}

export default Navigation;
