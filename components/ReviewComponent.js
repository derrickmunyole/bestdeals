import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";

function ReviewComponent({ text, numberOfLines }) {
  return (
    <View>
      <Text numberOfLines={numberOfLines}>{text}</Text>
      <TouchableOpacity>
        <Button style={styles.viewmore}>View more</Button>
      </TouchableOpacity>
    </View>
  );
}

export default ReviewComponent;

const styles = StyleSheet.create({
  viewmore: {
    alignSelf: "flex-end",
  },
});
