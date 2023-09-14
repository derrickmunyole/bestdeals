import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
} from "react-native";
import ButtonComponent from "../components/ButtonComponent";

function Login(props) {
  return (
    <ImageBackground
      style={styles.screenContainer}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.overlay}>
        <View style={[styles.registrationForm]}>
          {/* <ShoppersSvg width={100} height={100} /> */}
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
          <ButtonComponent text={"Login"} style={styles.registerBtn} />
          <View style={styles.ctatextview}>
            <Text style={styles.ctatext}>Create an account</Text>
            <Text style={styles.text}> to get started</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Login;

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
    backgroundColor: "#FAF8F1",
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
    fontSize: 16,
  },
  ctatext: {
    marginTop: 17,
    color: "red",
  },
  ctatextview: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
