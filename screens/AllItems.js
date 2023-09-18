import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton } from "react-native-paper";
import flashitemsApi from "../api/flashitems";
import itemsApi from "../api/items";
import AppActivityIndicator from "../components/ActivityIndicator";

const AllItems = ({ route, navigation }) => {
  // Assuming you have an array of items retrieved from the database
  const [loading, setLoading] = useState(true);

  const [flashitems, setFlashItems] = useState([]);
  const [allitems, setAllItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      let response;
      setLoading(true);
      if (route.params.itemType === "flashItems") {
        response = await flashitemsApi.getFlashItems();
        setLoading(false);
      } else if (route.params.itemType === "allItems") {
        response = await itemsApi.getAllItems();
        setLoading(false);
      }
      console.log("Response from getItems:", response);
      if (response.length > 0) {
        setFlashItems(response);
      } else {
        setAllItems([]);
      }
    } catch (error) {
      console.error("Failed to load items:", error);
      setItems([]);
    }
  };

  return (
    <>
      <SafeAreaView>
        {/*Header section */}
        <View style={styles.savedItemsHeader}>
          <IconButton icon="arrow-left" size={30} />
          <Text style={styles.savedItemsScreenTitle}>All Items</Text>
        </View>
        <AppActivityIndicator visible={loading} />
        <ScrollView>
          <View style={styles.container}>
            {flashitems.map((item, index) => (
              <View key={index} style={styles.column}>
                {/* Render each item in the respective column */}
                <TouchableOpacity
                  onPress={() => navigation.navigate("Details", { item })}
                >
                  <Image
                    source={{ uri: item.item_image }}
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default AllItems;

const styles = StyleSheet.create({
  savedItemsHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  savedItemsScreenTitle: {
    marginLeft: 100,
    fontWeight: "700",
    fontSize: 16,
  },
  headerText: {
    paddingLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    marginTop: 24,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
    marginTop: 24,
    paddingBottom: 100,
  },
  column: {
    height: 180,
    width: "45%",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#F9F3F3",
    elevation: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F9F3F3",
  },
});
