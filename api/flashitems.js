import apiClient from "./client";

const flashItemsEndpoints = "/flashitem/get_flash_items";

const getFlashItems = async () => {
  const response = await apiClient.get(flashItemsEndpoints);
  return response.data.items;
};

export default {
  getFlashItems,
};
