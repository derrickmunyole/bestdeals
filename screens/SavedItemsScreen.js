import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import favoritesApi from "../api/favorites";
import AppActivityIndicator from "../components/ActivityIndicator";
import AuthContext from "../auth/AuthContext";
import jwtDecode from "jwt-decode";

const SavedItemsScreen = () => {
  const [favorites, setFavorites] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  // Assuming you have an array of items retrieved from the database

  //Get user_id from token, which is needed to retrieve favorites for that user
  const { token } = useContext(AuthContext);
  let user_id;
  try {
    const decodedToken = jwtDecode(token);
    user_id = decodedToken?.user_id;
    // console.log(typeof user_id);
  } catch (error) {
    console.log("Decoded failed", error);
  }

  useEffect(() => {
    getFavoritesData();
  }, []);

  const getFavoritesData = async () => {
    setLoading(true);
    const response = await favoritesApi.getFavorites(user_id);
    console.log(response.data);
    if (!response.ok) throw new Error(response.problem);
    if (response.data.items.length > 0) {
      setFavorites(response.data.items);
      setLoading(false);
    } else {
      setFavorites([]);
      setLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.sav}>
        {/*Header section */}
        <View style={styles.savedItemsHeader}>
          <AntDesign name="left" size={24} color="black" />
          <Text style={styles.savedItemsScreenTitle}>Saved Items</Text>
        </View>
        {/* List of saved items */}
        <AppActivityIndicator visible={loading} />
        <FlatList
          data={favorites}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            // console.log("From renderItem:", item);
            return (
              <TouchableHighlight style={styles.savedItemContainer}>
                <>
                  <Image
                    source={{ uri: item.item_image }}
                    resizeMode="contain"
                    style={styles.savedItemImage}
                  />
                  <View style={styles.savedItemDetails}>
                    <Text numberOfLines={1} style={styles.savedItemTitle}>
                      {item.item_title}
                    </Text>
                    <Text>{item.item_price}</Text>
                    <View>
                      <Text>{item.item_shop}</Text>
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
    marginLeft: -20,
  },
  sav: {
    paddingBottom: 56,
  },
});
