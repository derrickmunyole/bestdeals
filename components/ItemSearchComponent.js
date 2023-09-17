import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

const ItemSearchComponent = ({ handleOpenModal }) => {
  return (
    <TouchableOpacity onPress={handleOpenModal} activeOpacity={1}>
      <View
        style={{
          // styles to match SearchBar
          elevation: 3,
          borderRadius: 25,
          height: 50,
          backgroundColor: "#F5F5F5",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ color: "#A8A8A8", marginRight: 10 }}>🔍</Text>
        {/* Search Icon */}
        <TextInput
          placeholder="Search"
          editable={false} // disable keyboard popup
          pointerEvents="none"
        />
      </View>
    </TouchableOpacity>
  );
};

export default ItemSearchComponent;
