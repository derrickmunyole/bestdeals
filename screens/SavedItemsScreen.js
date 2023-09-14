import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import ItemCardComponent from "../components/ItemCardComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const SavedItemsScreen = () => {
  // Assuming you have an array of items retrieved from the database
  let items = [
    "John",
    "Jane",
    "James",
    "Jill",
    "Jack",
    "Judy",
    "Jerry",
    "Jasmine",
    "Jacob",
    "Julia",
    "Jaden",
    "Jenna",
    "Jesse",
    "Jodie",
    "Jeff",
    "Jenny",
  ];

  return (
    <>
      <SafeAreaView style={styles.sav}>
        {/*Header section */}
        <View style={styles.savedItemsHeader}>
          <AntDesign name="left" size={24} color="black" />
          <Text style={styles.savedItemsScreenTitle}>Saved Items</Text>
        </View>
        {/* List of saved items */}
        <FlatList
          data={items}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <TouchableHighlight style={styles.savedItemContainer}>
                <>
                  <Image
                    source={require("../assets/smartphone.jpeg")}
                    resizeMode="contain"
                    style={styles.savedItemImage}
                  />
                  <View style={styles.savedItemDetails}>
                    <Text numberOfLines={1} style={styles.savedItemTitle}>
                      Samsung Galaxy S23
                    </Text>
                    <Text>Kes 72000</Text>
                    <View>
                      <Text>Jumia</Text>
                    </View>
                    <View style={styles.removeItemButton}>
                      <FontAwesome5
                        name="trash"
                        size={20}
                        color="#F55050"
                        styles={styles.trashIcon}
                      />
                      <Text>Remove item</Text>
                    </View>
                  </View>
                </>
              </TouchableHighlight>
            );
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default SavedItemsScreen;

const styles = StyleSheet.create({
  savedItemContainer: {
    flexDirection: "row",
    height: 150,
    flex: 1,
    backgroundColor: "#E1E5EA",
    borderRadius: 10,
    marginTop: 8,
    marginHorizontal: 8,
    alignItems: "center",
    marginBottom: 8,
    elevation: 2,
  },
  removeItemButton: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  savedItemsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  savedItemsScreenTitle: {
    marginLeft: 110,
    fontWeight: "600",
    fontSize: 16,
  },
  savedItemImage: {
    width: 200,
    height: 120,
    marginLeft: -10,
  },
  savedItemTitle: {},
  savedItemDetails: {
    width: 200,
    justifyContent: "center",
    marginLeft: -4,
  },
  sav: {
    paddingBottom: 56,
  },
});
