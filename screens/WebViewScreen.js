// In WebViewScreen.js:

import React from "react";
import { WebView } from "react-native-webview";

function WebViewScreen({ route }) {
  const shouldStartLoadWithRequest = (request) => {
    // Prevent WebView to navigate to the URL if it starts with 'kiliapp://'
    if (request.url.startsWith("kiliapp://")) {
      return false;
    }
    // For all other URLs, allow WebView to navigate
    return true;
  };
  return (
    <WebView
      source={{ uri: route.params.url }}
      style={{ marginTop: 20 }}
      onNavigationStateChange={shouldStartLoadWithRequest}
    />
  );
}

export default WebViewScreen;
