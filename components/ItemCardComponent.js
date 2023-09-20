import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

function ItemCardComponent({
  itemstyle,
  title,
  price,
  imageUrl,
  navigation,
  item,
  ...otherProps
}) {
  return (
    <>
      <TouchableOpacity
        style={styles.componentContainer}
        onPress={() => navigation.navigate("Details", { item: item })}
      >
        <View style={styles.cardContainer}>
          <Image
            contentFit="contain"
            style={styles.image}
            source={{
              uri: imageUrl,
            }}
            cachePolicy={"memory-disk"}
          />
          <View style={styles.infoText}>
            <Text style={styles.itemTitle} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.itemPrice}>{price}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <View style={styles.addfavorite}>
            <Text style={itemstyle}>Save item</Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
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
    alignItems: "flex-start",
    width: 180,
    height: 270,
    backgroundColor: "#BCCEF8",
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    paddingBottom: 8,
    marginRight: 8,
  },
  heartIcon: {
    width: 30,
    height: 26,
  },
  image: {
    width: 180,
    height: 200,
    marginTop: -12,
  },
  itemPrice: {
    color: "#666666",
    paddingLeft: 6,
  },
  itemTitle: {
    fontWeight: "500",
    paddingLeft: 6,
  },
  infoText: {
    marginTop: 8,
  },
});
