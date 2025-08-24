import { validationResult } from "express-validator";
import { createStore as createStoreService } from "../services/store.service.js";
import { getAllStores as getAllStoresService } from "../services/store.service.js";
import { getStoreDashboardData as getDashboardDataService } from "../services/store.service.js";

export const createStore = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newStore = await createStoreService(req.body);
    res
      .status(201)
      .json({ message: "Store created successfully!", store: newStore });
  } catch (error) {
    if (error.message.includes("Owner not found")) {
      return res.status(404).json({ message: error.message });
    }
    if (
      error.message.includes("not a Store Owner") ||
      error.message.includes("already has a registered store")
    ) {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Something went wrong on our end." });
  }
};

export const getAllStores = async (req, res) => {
  try {
    const userId = req.user?.id; 
    const result = await getAllStoresService(req.query, userId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong on our end." });
  }
};

export const getOwnerDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const dashboardData = await getDashboardDataService(ownerId);
    res.status(200).json(dashboardData);
  } catch (error) {
    if (error.message.includes("No store found")) {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Something went wrong on our end." });
  }
};