import * as React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const ButtonComponent = ({ text, icon, style, onPress, color }) => {
  return (
    <Button
      icon={icon}
      mode="contained"
      style={style}
      onPress={onPress}
      textColor={color}
    >
      {text}
    </Button>
  );
};

export default ButtonComponent;
