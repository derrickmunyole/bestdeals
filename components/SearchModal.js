import React, { useState, useEffect } from "react";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import searchApi from "../api/search";

const SearchModal = ({ onCloseModal }) => {
  const fetchedSearches = ["Search 1", "Search 2", "Search 3"];
  const [searchResults, setSearchResults] = useState([]);
  const [text, setText] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = useNavigation();

  const handleSearch = async (query) => {
    const response = await searchApi.getSearchResults(query);
    if (response.length > 0) {
      setSearchResults(response);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchButtonPress = (query) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  useEffect(() => {
    handleSearch(searchQuery);
  }, []);

  return (
    <View style={styles.modalContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Search"
        onChangeText={(text) => setText(text)}
        onSubmitEditing={() => handleSearchButtonPress(text)}
      />
      <Text style={styles.title}>List of Searches</Text>
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.push("Details", {
                item: item,
                screenToGoBack: "SearchModal",
              })
            }
          >
            <Text style={styles.searchItem} numberOfLines={2}>
              {item.item_title}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        title="Close Modal"
        onPress={() => navigation.navigate("Dashboard")}
      />
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
    fontSize: 18,
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
