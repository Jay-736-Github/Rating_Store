import { validationResult } from "express-validator";
import { submitOrUpdateRating } from "../services/rating.service.js";

export const submitRating = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const storeId = parseInt(req.params.storeId, 10);
    const userId = req.user.id; 
    const { value } = req.body;

    const result = await submitOrUpdateRating({ userId, storeId, value });

    const isNew = result.createdAt.getTime() === result.updatedAt.getTime();

    res.status(isNew ? 201 : 200).json({
      message: `Rating ${isNew ? "submitted" : "updated"} successfully!`,
      rating: result,
    });
  } catch (error) {
    if (error.code === "P2003") {
      return res.status(404).json({ message: "Store not found." });
    }
    console.error(error);
    res.status(500).json({ message: "Something went wrong on our end." });
  }
};
