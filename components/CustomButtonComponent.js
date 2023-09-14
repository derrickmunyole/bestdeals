import React, { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import { StyleSheet } from "react-native";

function CustomButtonComponent({ isActive, text, onPress }) {
  const style = isActive ? styles.active : styles.outline;
  const color = isActive ? "white" : "#6200ee";
  return (
    <ButtonComponent
      style={style}
      onPress={onPress}
      color={color}
      text={text}
    />
  );
}

export default CustomButtonComponent;

const styles = StyleSheet.create({
  active: {
    backgroundColor: "#6200ee",
    width: 100,
    height: 40,
  },
  outline: {
    backgroundColor: "F0E8E8",
    borderWidth: 1,
    borderColor: "#6200ee",
    width: 100,
    height: 40,
  },
});
