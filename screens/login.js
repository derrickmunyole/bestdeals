import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonComponent from "../components/ButtonComponent";
import TextInputComponent from "../components/TextInputComponent";
import * as Yup from "yup";
import ErrorMessage from "../components/ErrorMessage";
import { loginUser } from "../api/auth";
import AuthContext from "../auth/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

let validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

function Login({ navigation }) {
  const { setToken } = useContext(AuthContext);
  return (
    <>
      <SafeAreaView />
      <View style={styles.screenContainer}>
        <View style={styles.loginform}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const response = await loginUser(values);
              const token = response?.data?.token;
              setToken(token);
              await AsyncStorage.setItem("userToken", token);
            }}
          >
            {({ handleChange, handleSubmit, errors, touched }) => (
              <>
                <TextInputComponent
                  placeholder={"Email"}
                  keyboardType={"email-address"}
                  autocapitalize="none"
                  styles={styles.inputFields}
                  onChangeText={handleChange("email")}
                />
                <ErrorMessage error={errors.email} visible={touched} />
                <TextInputComponent
                  placeholder={"Password"}
                  keyboardType={"default"}
                  securetextentry
                  styles={styles.inputFields}
                  onChangeText={handleChange("password")}
                />
                <ErrorMessage error={errors.password} visible={touched} />
                <TouchableOpacity onPress={handleSubmit}>
                  <ButtonComponent style={styles.loginBtn} text={"Login"} />
                </TouchableOpacity>
                <View style={styles.toRegister}>
                  <Text>Don't have an account? </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text style={styles.toRegisterText}>Create account</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </>
  );
}

export default Login;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "#F9F3F3",
    flex: 1,
    paddingHorizontal: 16,
  },
  loginform: {
    flex: 1,
    marginTop: 100,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  inputFields: {
    marginBottom: 8,
    backgroundColor: "#F9F3F3",
    height: 50,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#949CDF",
    paddingHorizontal: 20,
  },
  loginBtn: {
    marginTop: 24,
    paddingVertical: 6,
  },
  toRegister: {
    flexDirection: "row",
    marginTop: 16,
    alignSelf: "center",
  },
  toRegisterText: {
    textDecorationLine: "underline",
    color: "#793FDF",
    fontWeight: "bold",
  },
});
