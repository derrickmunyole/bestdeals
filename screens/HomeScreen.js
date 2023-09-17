import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
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
import AuthContext from "../auth/AuthContext";
import jwtDecode from "jwt-decode";

function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("Television");
  const [isFirstLoad, SetIsFirstLoad] = useState(true);
  const [isFlashItemsLoading, setIsFlashItemsLoading] = useState(true);
  const [isItemsLoading, setIsItemsLoading] = useState(false);

  const { token } = useContext(AuthContext);
  let first_name;
  try {
    const decodedToken = jwtDecode(token);
    first_name = decodedToken?.first_name;
  } catch (error) {
    console.log("Decoded failed", error);
  }

  const categories = [
    "television",
    "Phones & Accessories",
    "Speaker",
    "Microwave",
    "Fridge",
    "Electric cooker",
    "Laptop & Accessories",
    "Fashion",
  ];

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = (itemType) => {
    setIsLoadingMore(true);
    navigation.navigate("All", { itemType: itemType });
    // Call API or data loading logic

    setIsLoadingMore(false);
  };

  const handleCategoryPress = (category) => {
    /**
     * Handles a category being pressed in the category selection modal.
     *
     * @param {string} category - The name of the category that was pressed
     * This will update the app state with the new selected category.
     *
     * Calls the toggleFirstLoad function to toggle the first load state.
     * Calls the handleCloseCategoryModal function to close the modal.
     */
    toggleFirstLoad();
    setNewCategory(category);
    handleCloseCategoryModal();
  };

  const handleTextChoicePress = () => {
    setCategoryModalVisible(!categoryModalVisible);
  };

  const handleCloseCategoryModal = () => {
    setCategoryModalVisible(false);
  };

  const handleSearchFieldFocus = () => {
    setModalVisible(true);
  };

  const toggleFirstLoad = () => {
    SetIsFirstLoad(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    loadCategoryItems();
  }, [newCategory]);

  const loadItems = async () => {
    setIsFlashItemsLoading(true);
    const response = await itemsApi.getAllItems();
    if (response.length > 0) {
      setItems(response);
    } else {
      setItems([]);
    }
    setIsFlashItemsLoading(false);
  };

  const loadCategoryItems = async () => {
    setIsItemsLoading(true);
    const response = await itemsApi.getCategoryItems(newCategory);
    if (response.length > 0) {
      setCategoryItems(response);
    } else {
      setCategoryItems([]);
    }
    setIsItemsLoading(false);
  };

  return (
    <>
      <SafeAreaView />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainscrollview}
      >
        <View style={styles.main}>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Hi, {first_name}</Text>
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
            <ActivityIndicator animating={isFlashItemsLoading} size={"large"} />
            <CarouselComponent navigation={navigation} />
          </View>

          {/*Shop By Category*/}
          <Text style={styles.headerText}>View by category</Text>
          <View style={styles.categoriesBody}>
            <TouchableOpacity onPress={() => handleTextChoicePress()}>
              <View style={styles.choicepicker}>
                <View style={styles.textChoiceContainer}>
                  <Text style={styles.textchoice}>{newCategory}</Text>
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
            <ActivityIndicator animating={isItemsLoading} size={"large"} />
            <FlatList
              horizontal={true}
              data={isFirstLoad ? items : categoryItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <ItemCardComponent
                  title={item.item_title}
                  price={item.item_price}
                  imageUrl={item.item_image}
                  key={index}
                  item={item}
                  navigation={navigation}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide">
        <SearchModal onCloseModal={handleCloseModal} />
      </Modal>
      <Modal
        visible={categoryModalVisible}
        animationType="slide"
        transparent={true}
        on
      >
        <TouchableWithoutFeedback onPress={handleCloseCategoryModal}>
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.0)" }}>
            <View style={styles.centeredView}>
              <Text style={styles.modalTitle}>
                <Text>Categories</Text>
              </Text>
              <View style={styles.modalBody}>
                {categories.map((category, index) => (
                  <Pressable
                    key={index}
                    style={styles.modalOption}
                    onPress={() => handleCategoryPress(category)}
                  >
                    <Text>{category}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
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
  centeredView: {
    position: "absolute",
    bottom: 210,
    left: 16,
    width: 200,
    height: 300,
    backgroundColor: "white",
    elevation: 2,
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
  modalTitle: {
    textAlign: "center",
    marginTop: 12,
  },
  modalBody: {
    marginTop: 16,
    paddingLeft: 16,
    gap: 12,
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
