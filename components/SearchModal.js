import React, { useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const SearchModal = ({ onCloseModal }) => {
  const fetchedSearches = ["Search 1", "Search 2", "Search 3"];

  return (
    <View style={styles.modalContainer}>
      <TextInput style={styles.textInput} />
      <Text style={styles.title}>List of Searches</Text>
      <FlatList
        data={fetchedSearches}
        renderItem={({ item }) => <Text style={styles.searchItem}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Close Modal" onPress={onCloseModal} />
    </View>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  searchItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    borderBottomWidth: 1,
    width: "100%",
    borderBottomColor: "#BCCEF8",
  },
});
