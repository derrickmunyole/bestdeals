import React from "react";
import { Text, View } from "react-native";

function OfflineNotificationComponent(props) {
  return (
    <View style={styles.notificationView}>
      <Text>You are offline. Please check your internet connection.</Text>
    </View>
  );
}

export default OfflineNotificationComponent;

const styles = StyleSheet.create({
  notificationView: {
    backgroundColor: "#BCCEF8",
    alignItems: "center",
    position: "absolute",
  },
});
