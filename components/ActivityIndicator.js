import React from "react";
import { ActivityIndicator } from "react-native";

function AppActivityIndicator({ visible = false, ...props }) {
  if (!visible) return null;
  return <ActivityIndicator animating={visible} color="#F55050" size="large" />;
}

export default AppActivityIndicator;
