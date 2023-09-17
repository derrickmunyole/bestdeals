import apiClient from "./client";

const registerURL = "/user/register";
const updateUserURL = "/user/update_user";

const registerUser = async (user) => {
  const response = await apiClient.post(registerURL, (data = user));
  console.log("registering user");
};

const updateUser = async (user) => {
  const response = await apiClient.put(updateUserURL, (data = user));
  console.log("updating user");
};

export { registerUser, updateUser };
