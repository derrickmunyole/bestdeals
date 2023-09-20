import { create } from "apisauce";
import cache from "../utils/cache";

//API ENDPOINTS
/*
    /flashitem/get_flash_items
    /items/get_items
    /items/get_one
    /user/register
    /user/login
    /user/update_user
 */

const apiClient = create({
  baseURL: "https://f8da-105-162-20-50.ngrok-free.app",
});

const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

export default apiClient;
