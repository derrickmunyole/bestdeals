import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ItemCardComponent from "../components/ItemCardComponent";
import { SafeAreaView } from "react-native-safe-area-context";

const SavedItemsScreen = () => {
  // Assuming you have an array of items retrieved from the database
  const items = [
    /* array of items */
  ];

  return (
    <>
      <SafeAreaView>
        <Text>Your wish list</Text>
        <View style={styles.container}>
          {items.map((item, index) => (
            <View key={index} style={styles.column}>
              {/* Render each item in the respective column */}
              <ItemCardComponent />
            </View>
          ))}
        </View>
      </SafeAreaView>
    </>
  );
};

export default SavedItemsScreen;

const styles = StyleSheet.create({});
