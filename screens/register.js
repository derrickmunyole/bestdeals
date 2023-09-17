import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../api/user";
import TextInputComponent from "../components/TextInputComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import ErrorMessage from "../components/ErrorMessage";

let validationSchema = Yup.object().shape({
  first_name: Yup.string().required().label("First name"),
  last_name: Yup.string().label("Last name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .min(6)
    .label("password"),
});

function Register({ navigation }) {
  return (
    <>
      <SafeAreaView />
      <View style={styles.screenContainer}>
        <View style={styles.registrationForm}>
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              confirm_password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              try {
                await registerUser(values);
                console.log("User registered successfully");
                resetForm({
                  first_name: "",
                  last_name: "",
                  email: "",
                  password: "",
                  confirm_password: "",
                });
              } catch (error) {
                console.error("Failed to register user:", error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              setFieldTouched,
              touched,
            }) => {
              console.log("Form errors", errors);
              return (
                <>
                  <TextInputComponent
                    placeholder="First Name"
                    keyboardType={"default"}
                    styles={styles.inputFields}
                    onBlur={() => setFieldTouched("first_name")}
                    onChangeText={handleChange("first_name")}
                  />
                  <ErrorMessage
                    error={errors.first_name}
                    visible={touched.first_name}
                  />

                  <TextInputComponent
                    placeholder={"Last Name"}
                    keyboardType={"default"}
                    styles={styles.inputFields}
                    onBlur={() => setFieldTouched("last_name")}
                    onChangeText={handleChange("last_name")}
                  />
                  <ErrorMessage
                    error={errors.last_name}
                    visible={touched.last_name}
                  />

                  <TextInputComponent
                    placeholder={"Email"}
                    keyboardType={"email-address"}
                    autocapitalize="none"
                    styles={styles.inputFields}
                    onBlur={() => setFieldTouched("email")}
                    onChangeText={handleChange("email")}
                  />
                  <ErrorMessage error={errors.email} visible={touched.email} />

                  <TextInputComponent
                    placeholder={"Password"}
                    keyboardType={"default"}
                    securetextentry
                    styles={styles.inputFields}
                    onBlur={() => setFieldTouched("password")}
                    onChangeText={handleChange("password")}
                  />
                  <ErrorMessage
                    error={errors.password}
                    visible={touched.password}
                  />

                  <TextInputComponent
                    placeholder={"Confirm Password"}
                    keyboardType={"default"}
                    securetextentry
                    styles={styles.inputFields}
                    onBlur={() => setFieldTouched("confirm_password")}
                    onChangeText={handleChange("confirm_password")}
                  />
                  <ErrorMessage
                    error={errors.confirm_password}
                    visible={touched.confirm_password}
                  />

                  <TouchableOpacity onPress={handleSubmit}>
                    <ButtonComponent
                      style={styles.registerBtn}
                      text={"Register"}
                    />
                  </TouchableOpacity>

                  <View style={styles.toLogIn}>
                    <Text>Have an account? </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Login")}
                    >
                      <Text style={styles.toLoginText}>Log in</Text>
                    </TouchableOpacity>
                  </View>
                </>
              );
            }}
          </Formik>
        </View>
      </View>
    </>
  );
}

export default Register;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "#F9F3F3",
    flex: 1,
    paddingHorizontal: 16,
  },
  registrationForm: {
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
  registerBtn: {
    marginTop: 24,
    paddingVertical: 6,
    // width: 240,
    // alignSelf: "center",
  },
  toLogIn: {
    flexDirection: "row",
    marginTop: 16,
    alignSelf: "center",
  },
  toLoginText: {
    textDecorationLine: "underline",
    color: "#793FDF",
    fontWeight: "bold",
  },
});
