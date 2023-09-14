import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { StyleSheet, Text } from "react-native";
import ItemCardComponent from "../components/ItemCardComponent";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import ItemSearchComponent from "../components/ItemSearchComponent";
import SearchModal from "../components/SearchModal";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButtonComponent from "../components/CustomButtonComponent";
import CarouselComponent from "../components/CarouselComponent";
import itemsApi from "../api/items";

function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([]);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = (itemType) => {
    setIsLoadingMore(true);
    navigation.navigate("All", { itemType: itemType });
    // Call API or data loading logic

    setIsLoadingMore(false);
  };

  const handleSearchFieldFocus = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const response = await itemsApi.getAllItems();
    if (response.length > 0) {
      setItems(response);
    } else {
      setItems([]);
    }
  };

  // useEffect(() => {
  //   console.log(items);
  // }, [items]);

  // const renderItemCardComponent = ({ item, index }) => {
  //   return (
  //     <ItemCardComponent
  //       title={item.item_title}
  //       price={item.item_price}
  //       imageUrl={item.item_image}
  //       key={index}
  //       navigation={navigation}
  //     />
  //   );
  // };

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainscrollview}
      >
        <View style={styles.main}>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Hi, Derrick</Text>
            <TouchableOpacity>
              <AntDesign
                name="heart"
                color="#BF3D3D"
                size={24}
                onPress={() => navigation.navigate("Wishlist")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bodyTextView}>
            <Text style={styles.bodyText}>Get the best deals at </Text>
            <Text style={styles.bodyTextBrand}>BestDeals</Text>
          </View>
          <ItemSearchComponent
            onfocus={handleSearchFieldFocus}
            handleOpenModal={handleSearchFieldFocus}
          />
          <Text style={styles.headerText}>Choose your platform</Text>
          <View style={styles.selectionView}>
            <CustomButtonComponent text={"Jumia"} isActive={true} />

            <CustomButtonComponent text={"Kilimall"} />
          </View>

          {/*Items on FlashSale*/}
          <View style={styles.flashSaleItemsContainer}>
            <View style={styles.flashSaleHeaderContainer}>
              <Text style={[styles.headerText, styles.flashSaleHeader]}>
                Items on FlashSale
              </Text>
              <TouchableOpacity
                onPress={() => handleLoadMore("flashItems")}
                navigation={navigation}
              >
                <Text>View more</Text>
              </TouchableOpacity>
            </View>
            <CarouselComponent navigation={navigation} />
          </View>

          {/*Shop By Category*/}
          <Text style={styles.headerText}>View by category</Text>
          <View style={styles.categoriesBody}>
            <TouchableOpacity>
              <View style={styles.choicepicker}>
                <View style={styles.textChoiceContainer}>
                  <Text style={styles.textchoice}>Television</Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="black"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.more}
              onPress={() => handleLoadMore("allItems")}
            >
              <Text>View more</Text>
            </TouchableOpacity>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              {items.map((item, index) => (
                <ItemCardComponent
                  title={item.item_title}
                  price={item.item_price}
                  imageUrl={item.item_image}
                  key={index}
                  item={item}
                  navigation={navigation}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide">
        <SearchModal onCloseModal={handleCloseModal} />
      </Modal>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    padding: 20,
  },
  mainscrollview: {
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bodyText: {
    fontSize: 16,
  },
  bodyTextBrand: {
    marginTop: -4,
    fontSize: 20,
    fontWeight: "bold",
    color: "#F11A7B",
  },
  bodyTextView: {
    flexDirection: "row",
    marginVertical: 8,
  },
  categoriesBody: {
    //backgroundColor: "#EBE3F5",
    //padding: 16,
    borderRadius: 12,
  },
  flashSaleHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flashSaleItemsContainer: {
    marginTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 12,
    // backgroundColor: "#6200ee",
  },
  flashSalefavoriteText: {
    color: "#ffffff",
  },
  flashSaleHeader: {
    color: "#213555",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 12,
    color: "#213555",
  },
  selectionView: {
    //backgroundColor: "#EBE3F5",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 50,
    alignItems: "center",
    borderRadius: 12,
  },
  selectionBtn: {
    backgroundColor: "green",
    width: 100,
    height: 40,
    justifyContent: "center",
    borderRadius: 12,
  },
  searchModal: {
    flex: 1,
    backgroundColor: "white",
    position: "absolute",
    right: 0,
    top: 0,
    height: "100%",
    width: "80%",
    padding: 20,
  },
  jumiaBtnText: {
    textAlign: "center",
  },
  kilimallBtnText: {
    textAlign: "center",
  },
  more: {
    position: "absolute",
    right: 12,
  },
  choicepicker: {
    flexDirection: "row",
    gap: 12,
  },
  textChoiceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textchoice: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 16,
  },
});
