import { StyleSheet, Text, View } from "react-native";
import Navigation from "./navigation/navigation";
import { PaperProvider } from "react-native-paper";
import AuthProvider from "./auth/AuthProvider";

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
