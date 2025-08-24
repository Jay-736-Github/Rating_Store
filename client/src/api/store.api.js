import apiClient from "./apiClient";

export const getStores = async (params = {}) => {
  try {
    const response = await apiClient.get("/stores", { params });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const submitRating = async (storeId, ratingValue) => {
  try {
    const response = await apiClient.post(`/stores/${storeId}/rate`, {
      value: ratingValue,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getOwnerDashboardData = async () => {
  try {
    const response = await apiClient.get("/stores/dashboard");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};