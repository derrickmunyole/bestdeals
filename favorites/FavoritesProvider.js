import React, { Children, useState } from "react";
import FavoritesContext from "./FavoritesContext";

function FavoritesProvider({ children }) {
  const [isFavorite, setIsFavorite] = useState([]);

  const value = {
    isFavorite,
    setIsFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;
