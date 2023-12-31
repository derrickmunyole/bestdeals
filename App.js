import { StyleSheet, Text, View } from "react-native";
import Navigation from "./navigation/navigation";
import { PaperProvider } from "react-native-paper";
import AuthProvider from "./auth/AuthProvider";
import { LogBox } from "react-native";
import { enableScreens } from "react-native-screens";

export default function App() {
  LogBox.ignoreLogs(["Can't open url:"]);
  enableScreens();
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
