import prisma from "../config/prisma.js";

export const createStore = async (storeData) => {
  const { name, email, address, ownerId } = storeData;

  const owner = await prisma.user.findUnique({ where: { id: ownerId } });
  if (!owner) {
    throw new Error("Owner not found.");
  }
  if (owner.role !== "OWNER") {
    throw new Error("The specified user is not a Store Owner.");
  }

  const existingStore = await prisma.store.findUnique({ where: { ownerId } });
  if (existingStore) {
    throw new Error("This Store Owner already has a registered store.");
  }

  const newStore = await prisma.store.create({
    data: { name, email, address, ownerId },
  });
  return newStore;
};

export const getAllStores = async (queryParams, userId) => {
  const {
    name,
    address,
    page = 1,
    limit = 1000,
    sortBy = "createdAt",
    order = "desc",
  } = queryParams;
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const where = {};
  if (name) where.name = { contains: name };
  if (address) where.address = { contains: address };

  const orderBy = {};
  if (sortBy) {
    orderBy[sortBy] = order;
  }

  const stores = await prisma.store.findMany({
    where,
    skip,
    take: limitNum,
    orderBy,
    include: {
      ratings: true,
    },
  });

  const totalStores = await prisma.store.count({ where });

  const formattedStores = stores.map((store) => {
    let overallRating = null;
    let userRating = null;

    if (store.ratings && store.ratings.length > 0) {
      const sumOfRatings = store.ratings.reduce(
        (acc, rating) => acc + rating.value,
        0
      );
      const avg = sumOfRatings / store.ratings.length;
      overallRating = parseFloat(avg.toFixed(1));

      const currentUserRating = store.ratings.find(
        (rating) => rating.userId === userId
      );
      if (currentUserRating) {
        userRating = currentUserRating.value;
      }
    }
    return {
      ...store,
      overallRating,
      userRating,
    };
  });
  return {
    stores: formattedStores,
    totalPages: Math.ceil(totalStores / limitNum),
    currentPage: pageNum,
    totalStores,
  };
};

export const getStoreDashboardData = async (ownerId) => {

  const store = await prisma.store.findUnique({
    where: { ownerId },
    include: {
      ratings: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
  if (!store) {
    throw new Error("No store found for the current owner.");
  }
  let overallRating = null;
  if (store.ratings && store.ratings.length > 0) {
    const sumOfRatings = store.ratings.reduce(
      (acc, rating) => acc + rating.value,
      0
    );
    const avg = sumOfRatings / store.ratings.length;
    overallRating = parseFloat(avg.toFixed(1));
  }

  const raters = store.ratings.map((rating) => ({
    userId: rating.user.id,
    name: rating.user.name,
    email: rating.user.email,
    rating: rating.value,
    ratedAt: rating.updatedAt,
  }));
  const { ratings, ...storeDetails } = store;

  return {
    storeDetails,
    overallRating,
    raters,
  };
};