import React, { useState } from "react";
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

function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearchFieldFocus = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

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
          <Text style={styles.headerText}>Choose your market</Text>
          <View style={styles.selectionView}>
            <CustomButtonComponent text={"Jumia"} isActive={true} />

            <CustomButtonComponent text={"Kilimall"} />
          </View>

          {/*Items on FlashSale*/}
          <View style={styles.flashSaleItemsContainer}>
            <Text style={[styles.headerText, styles.flashSaleHeader]}>
              Items on FlashSale
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <ItemCardComponent itemstyle={styles.flashSalefavoriteText} />
              <ItemCardComponent itemstyle={styles.flashSalefavoriteText} />
              <ItemCardComponent itemstyle={styles.flashSalefavoriteText} />
              <ItemCardComponent itemstyle={styles.flashSalefavoriteText} />
              <ItemCardComponent itemstyle={styles.flashSalefavoriteText} />
            </ScrollView>
          </View>

          {/*Shop By Category*/}
          <Text style={styles.headerText}>View by category</Text>
          <View style={styles.categoriesBody}>
            <TouchableOpacity>
              <View style={styles.choicepicker}>
                <Text style={styles.textchoice}>Television</Text>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="black"
                />
              </View>
            </TouchableOpacity>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              <ItemCardComponent />
              <ItemCardComponent />
              <ItemCardComponent />
              <ItemCardComponent />
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
    backgroundColor: "#F0E8E8",
    padding: 16,
    borderRadius: 12,
  },
  flashSaleItemsContainer: {
    marginTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: "#BF3D3D",
  },
  flashSalefavoriteText: {
    color: "#ffffff",
  },
  flashSaleHeader: {
    color: "white",
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
    marginVertical: 18,
  },
  selectionView: {
    backgroundColor: "#F0E8E8",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 90,
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
    width: "80%", // Adjust this value as per your requirement
    padding: 20,
  },
  jumiaBtnText: {
    textAlign: "center",
  },
  kilimallBtnText: {
    textAlign: "center",
  },
  choicepicker: {
    flexDirection: "row",
    gap: 12,
  },
  textchoice: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 16,
  },
});
