import React from "react";
import { TextInput, StyleSheet } from "react-native";

function TextInputComponent({
  placeholder,
  keyboardType,
  autocapitalize,
  securetextentry,
  styles,
  ...props
}) {
  return (
    <TextInput
      placeholder={placeholder}
      keyboardType={keyboardType}
      style={styles}
      autoCapitalize={autocapitalize}
      secureTextEntry={securetextentry}
      {...props}
    />
  );
}

export default TextInputComponent;
