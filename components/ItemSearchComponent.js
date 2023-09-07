import React, { useState } from "react";
import { Searchbar } from "react-native-paper";

const ItemSearchComponent = ({ onfocus, handleOpenModal }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchText, setSearchText] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      onFocus={onfocus}
      onSubmitEditing={() => handleOpenModal}
    />
  );
};

export default ItemSearchComponent;
