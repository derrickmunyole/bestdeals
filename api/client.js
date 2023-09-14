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
  baseURL: "https://bd0b-105-162-40-96.ngrok-free.app",
});

export default apiClient;
