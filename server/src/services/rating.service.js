import prisma from "../config/prisma.js";

export const submitOrUpdateRating = async (ratingInfo) => {
  const { userId, storeId, value } = ratingInfo;

  const rating = await prisma.rating.upsert({
    where: {
      userId_storeId: {
        userId: userId,
        storeId: storeId,
      },
    },
  
    update: {
      value: value,
    },
  
    create: {
      userId: userId,
      storeId: storeId,
      value: value,
    },
  });

  return rating;
};
