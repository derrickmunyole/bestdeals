import apiClient from "./client";

searchEndpoint = "/search";

const getSearchResults = async (query) => {
  const response = await apiClient.get(`${searchEndpoint}/?q=${query}`);
  //   console.log(response.data.results);
  return response.data.results;
};

export default {
  getSearchResults,
};
