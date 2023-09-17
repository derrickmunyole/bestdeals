import apiClient from "./client";

const favoritesEndpoint = "/favorites/";

const getFavorites = async (userId) => {
  const response = await apiClient.get(
    `${favoritesEndpoint}?user_id=${userId}`
  );
  return response;
};

const addFavorite = async (favoriteItem) => {
  const response = await apiClient.post(favoritesEndpoint, favoriteItem);
  return response;
};

const removeFavorite = async (itemId) => {
  const response = await apiClient.delete(`${favoritesEndpoint}/${itemId}`);
};

const removeFavorites = async () => {
  const response = await apiClient.delete(favoritesEndpoint);
};

export default { getFavorites, addFavorite, removeFavorite, removeFavorites };
