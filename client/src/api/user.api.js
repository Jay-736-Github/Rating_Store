import apiClient from "./apiClient";

export const updateUserPassword = async (passwordData) => {
  try {
    const response = await apiClient.patch("/users/me/password", passwordData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
