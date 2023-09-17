import apiClient from "./client";
import AuthContext from "../auth/AuthContext";

const loginEndpoint = "/user/login";

const loginUser = async (user) => {
  const response = await apiClient.post(loginEndpoint, (data = user));
  return response;
};

export { loginUser };
