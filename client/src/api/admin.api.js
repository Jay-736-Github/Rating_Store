import apiClient from "./apiClient";

export const getAdminAnalytics = async () => {
  try {
    const response = await apiClient.get("/admin/dashboard/analytics");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllUsers = async (params) => {
  try {
    const response = await apiClient.get("/admin/users", { params });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const adminCreateUser = async (userData) => {
  try {
    const response = await apiClient.post("/users", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const adminCreateStore = async (storeData) => {
  try {
    const response = await apiClient.post("/stores", storeData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};