import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
} from "react-native";
import ButtonComponent from "../components/ButtonComponent";

function Register(props) {
  return (
    <ImageBackground
      style={styles.screenContainer}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.overlay}>
        <View style={[styles.registrationForm]}>
          {/* <ShoppersSvg width={100} height={100} /> */}
          <TextInput
            label={"First Name"}
            style={styles.inputFields}
            placeholder="First Name"
          />
          <TextInput
            label={"Last Name"}
            style={styles.inputFields}
            placeholder="Last Name"
          />
          <TextInput
            label={"Email"}
            style={styles.inputFields}
            placeholder="Email"
          />
          <TextInput
            label={"Password"}
            style={styles.inputFields}
            placeholder="Password"
          />
          <TextInput
            label={"Confirm Password"}
            style={styles.inputFields}
            placeholder="Confirm Password"
          />
          <ButtonComponent
            text={"Register"}
            style={styles.registerBtn}
            placeholder="First Name"
          />
          <Text style={styles.text}>Have an account? Log in</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Register;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "#F9F3F3",
    flex: 1,
  },
  registrationForm: {
    flex: 1,
    marginTop: 60,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  keyboardavoidingview: {
    flex: 1,
  },
  registrationHeader: {
    fontSize: 22,
    marginBottom: 16,
  },
  inputFields: {
    marginBottom: 12,
    backgroundColor: "#F9F3F3",
    height: 60,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#949CDF",
    paddingHorizontal: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  registerBtn: {
    marginTop: 24,
    paddingVertical: 6,
    // width: 240,
    // alignSelf: "center",
  },
  text: {
    color: "#fff",
    marginTop: 16,
    alignSelf: "center",
    fontSize: 16,
  },
});
