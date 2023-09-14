import apiClient from "./client";

const itemsEndpoint = "/item/get_items";

const getAllItems = async () => {
  const response = await apiClient.get(itemsEndpoint);
  return response.data.items;
};

export default {
  getAllItems,
};
