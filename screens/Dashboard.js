import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./profile";
import { FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function Dashboard(props) {
  color = "black";
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => {
            return <FontAwesome5 name="home" size={24} color="black" />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => {
            return <FontAwesome5 name="user-alt" size={24} color="black" />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default Dashboard;
