import { create } from "apisauce";

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
  baseURL: "https://5779-105-162-4-124.ngrok-free.app",
});

export default apiClient;
