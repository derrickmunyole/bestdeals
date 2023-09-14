import React, { useState, useEffect, useRef, useMemo } from "react";
import { View, ToastAndroid } from "react-native";
import Carousel from "react-native-new-snap-carousel";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import flashitemsApi from "../api/flashitems";

const CarouselComponent = ({ navigation }) => {
  // const data = [
  //   { title: "Item 1" },
  //   { title: "Item 2" },
  //   { title: "Item 3" },
  //   { title: "Item 4" },
  //   { title: "Item 5" },
  // ];

  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [flashitems, setflashitems] = useState([]);

  useEffect(() => {
    loadFlashItems();
  }, []);

  // useEffect(() => {
  //   console.log(flashitems);
  // }, [flashitems]);

  const loadFlashItems = async () => {
    try {
      const response = await flashitemsApi.getFlashItems();
      //console.log("Response from getFlashItems:", response);
      if (response.length > 0) {
        setflashitems(response);
      } else {
        setflashitems([]);
      }
    } catch (error) {
      console.error("Failed to load flash items:", error);
      setflashitems([]);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.slide}
        onPress={() => navigation.navigate("Details", { item })}
      >
        {/* <Text style={styles.title}>{item.title}</Text> */}
        <Image
          source={{ uri: item.item_image }}
          style={styles.image}
          contentFit="contain"
        />
      </TouchableOpacity>
    );
  };

  const renderIndicators = () => {
    const maxIndicators = 5;
    const flashItems = flashitems;
    const activeindex = activeIndex;

    const indicators = useMemo(() => {
      return Array.from({
        length: Math.min(maxIndicators, flashItems.length),
      }).map((_, index) => index);
    }, [flashitems.length]);

    return (
      <View style={styles.indicatorContainer}>
        {indicators.map((index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === activeindex ? styles.activeIndicator : null,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={flashitems}
        renderItem={renderItem}
        sliderWidth={300}
        itemWidth={200}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      {renderIndicators()}
    </View>
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: 200,
    height: 200,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "gray",
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: "white",
  },
});
