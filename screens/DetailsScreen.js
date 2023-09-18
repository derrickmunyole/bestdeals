import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StoreSvg from "../assets/store.svg";
import jwtDecode from "jwt-decode";
import { useContext } from "react";

import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ButtonComponent from "../components/ButtonComponent";
import favoritesApi from "../api/favorites";
import AuthContext from "../auth/AuthContext";

function DetailsScreen({ route }) {
  const [error, setError] = React.useState(false);

  const navigation = useNavigation();

  const { screenToGoBack } = route.params;

  const navigateBack = () => {
    navigation.navigate(screenToGoBack);
  };

  const { token } = useContext(AuthContext);
  let user_id;
  try {
    const decodedToken = jwtDecode(token);
    user_id = decodedToken?.user_id;
  } catch (error) {
    console.log("Decoded failed", error);
  }

  const addToFavorite = async (favoriteItem) => {
    try {
      const response = await favoritesApi.addFavorite(favoriteItem);

      if (!response.ok) return setError(true);
      setError(false);
      console.log("Item has been added to favorite");

      return;
    } catch (error) {}
  };
  return (
    <SafeAreaView>
      {/*Header section */}
      {/* <View style={styles.detailsHeader}>
        <IconButton icon="arrow-left" size={30} />
        <Text style={styles.detailsScreenTitle}>Details</Text>
      </View> */}
      <ScrollView>
        {/* Body section */}
        <View style={styles.bodyContainer}>
          <TouchableOpacity style={styles.iconstyleLeft} onPress={navigateBack}>
            <AntDesign
              name="left"
              size={26}
              color="black"
              style={styles.arrowBack}
            />
          </TouchableOpacity>
          <View style={styles.iconstyleRight}>
            <Ionicons
              name="share-social-sharp"
              size={26}
              color="black"
              style={styles.share}
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              resizemode="contain"
              source={{
                uri: route.params.item.item_image,
              }}
            />
          </View>
          <View style={styles.detailsSection}>
            <Text style={styles.productDetailsHeaderText}>Product details</Text>
            <Text style={styles.itemTitle}>{route.params.item.item_title}</Text>
            <View style={styles.sectionHighlights}>
              <View style={styles.priceviews}>
                <MaterialCommunityIcons
                  name="cash-multiple"
                  size={36}
                  color="black"
                />
                <Text style={styles.PriceText}>
                  {route.params.item.item_price}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.heartItem}
                onPress={() =>
                  addToFavorite({
                    user_id: user_id,
                    item_id: route.params.item._id,
                    item_title: route.params.item.item_title,
                    item_image: route.params.item.item_image,
                    item_price: route.params.item.item_price,
                    item_shop: route.params.item.shop,
                  })
                }
              >
                <AntDesign name="heart" color="#BF3D3D" size={28} />
              </TouchableOpacity>
            </View>
            <View style={styles.storehighlight}>
              <StoreSvg width={36} height={36} />
              <Text>{route.params.item.shop}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() =>
            navigation.navigate("WebView", { url: route.params.item.item_page })
          }
        >
          <ButtonComponent text="Visit page" style={styles.visitpagebtn} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailsScreen;

const styles = StyleSheet.create({
  detailsHeader: {
    flexDirection: "row",
    width: "100%",
  },
  detailsScreenTitle: {
    alignSelf: "center",
    marginLeft: 110,
    fontSize: 20,
    fontWeight: "bold",
  },
  arrowBack: {
    position: "absolute",
    top: 10,
    left: 8,
    zIndex: 1,
  },
  bodyContainer: {
    width: "100%",
  },
  bodyPadding: {
    marginTop: 20,
  },
  detailsSection: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  headerText: {
    alignSelf: "flex-start",
    marginVertical: 24,
    fontWeight: "bold",
    fontSize: 18,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
  },
  itemTitle: {
    fontWeight: "400",
    marginTop: 8,
  },
  iconstyleLeft: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 48,
    height: 48,
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 24,
  },
  iconstyleRight: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 48,
    height: 48,
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 24,
  },
  heartItem: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    marginTop: 22,
  },
  navButton: {
    marginTop: 16,
    alignSelf: "flex-end",
    marginBottom: 48,
  },
  notFound: {
    alignItems: "center",
  },
  notFoundText: {
    fontWeight: "600",
  },
  priceviews: {
    flexDirection: "row",
    marginTop: 24,
    marginLeft: 12,
    gap: 10,
    alignItems: "center",
  },
  productDetailsHeaderText: {
    fontSize: 22,
  },
  pricePrefix: {
    fontWeight: "600",
    fontSize: 16,
  },
  PriceText: {
    fontWeight: "400",
    fontSize: 16,
  },
  scrollView: {
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  sectionHighlights: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  storehighlight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 10,
  },
  share: {
    position: "absolute",
    top: 10,
    right: 8,
    zIndex: 1,
    paddingRight: 6,
  },
  titleText: {
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
    marginLeft: 12,
    marginBottom: 8,
  },
  visitpagebtn: {
    marginTop: 24,
    marginRight: 16,
  },
});
