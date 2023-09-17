import React from "react";
import { Text, StyleSheet } from "react-native";

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;
  return <Text style={styles.errorText}>{error}</Text>;
}

export default ErrorMessage;

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    marginTop: -2,
  },
});
