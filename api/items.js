import apiClient from "./client";

const itemsEndpoint = "/item/get_items";
const categoriesEndpoint = "/item/get_category_items";

const getAllItems = async () => {
  const response = await apiClient.get(itemsEndpoint);
  return response.data.items;
};

const getCategoryItems = async (category) => {
  const response = await apiClient.get(`${categoriesEndpoint}/${category}`);
  console.log(response);
  return response.data.items;
};

export default {
  getAllItems,
  getCategoryItems,
};
