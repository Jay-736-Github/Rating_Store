import prisma from "../config/prisma.js";

export const getDashboardAnalytics = async () => {

  const [userCount, storeCount, ratingCount] = await Promise.all([
    prisma.user.count(),
    prisma.store.count(),
    prisma.rating.count(),
  ]);

  return {
    totalUsers: userCount,
    totalStores: storeCount,
    totalRatings: ratingCount,
  };
};

export const getUsersList = async (queryParams) => {
  const {
    role,
    name,
    email,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "desc",
  } = queryParams;
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const where = {};
  if (role) where.role = role;
  if (name) where.name = { contains: name };
  if (email) where.email = { contains: email };

  const orderBy = {};
  if (sortBy) {
    orderBy[sortBy] = order;
  }

  const users = await prisma.user.findMany({
    where,
    skip,
    take: limitNum,
    orderBy,
    select: {
      id: true,
      email: true,
      name: true,
      address: true,
      role: true,
      createdAt: true,
    },
  });

  const totalUsers = await prisma.user.count({ where });

  return {
    users,
    totalPages: Math.ceil(totalUsers / limitNum),
    currentPage: pageNum,
    totalUsers,
  };
};
