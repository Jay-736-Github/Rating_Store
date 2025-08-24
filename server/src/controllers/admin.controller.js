import {
  getDashboardAnalytics,
  getUsersList,
} from "../services/admin.service.js";

export const getAnalytics = async (req, res) => {
  try {
    const analytics = await getDashboardAnalytics();
    res.status(200).json(analytics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong on our end." });
  }
};

export const getUsers = async (req, res) => {
  try {
    const result = await getUsersList(req.query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong on our end." });
  }
};
