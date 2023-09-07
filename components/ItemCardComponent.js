import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";

function ItemCardComponent({ itemstyle }) {
  return (
    <>
      <View style={styles.componentContainer}>
        <View style={styles.cardContainer}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: "https://picsum.photos/700" }}
          />
          <View style={styles.infoText}>
            <Text style={styles.itemTitle}>Title: Painting</Text>
            <Text style={styles.itemTitle}>Price: Kes 800</Text>
            <Text style={styles.itemTitle}>Save Kes 24</Text>
          </View>
        </View>
        <TouchableOpacity>
          <View style={styles.addfavorite}>
            <Text style={itemstyle}>Add favorite</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default ItemCardComponent;

const styles = StyleSheet.create({
  addfavorite: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 8,
  },
  cardContainer: {
    alignItems: "center",
    width: 120,
    height: 200,
    backgroundColor: "#FFC1C1",
    paddingBottom: 8,
    borderRadius: 12,
    marginRight: 8,
  },
  heartIcon: {
    width: 30,
    height: 26,
  },
  image: {
    width: 120,
    height: 120,
  },
  itemTitle: {
    fontWeight: "500",
  },
  infoText: {
    marginTop: 8,
  },
});
