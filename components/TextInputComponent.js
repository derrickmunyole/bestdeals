import React from "react";
import { TextInput, StyleSheet } from "react-native";

function TextInputComponent(props) {
  return <TextInput style={styles.input} />;
}

export default TextInputComponent;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderBottomWidth: 1,
  },
});
