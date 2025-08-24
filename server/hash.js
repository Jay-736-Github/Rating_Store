// This file is just too update a password directly in DB using Prisma Studio if forgotten in case there is no other option left for admin.

import bcrypt from "bcryptjs";

const newPassword = "Password@123";

const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(newPassword, salt);

console.log("Your new hashed password is:");
console.log(hashedPassword);


// import { useEffect, useState, useMemo } from "react";
// import { getAdminAnalytics, getAllUsers } from "@/api/admin.api";
// import { getStores } from "@/api/store.api";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { ArrowUpDown } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import CreateUserModal from "./CreateUserModal";
// import CreateStoreModal from "./CreateStoreModal";

// function AdminDashboard() {
//   const [analytics, setAnalytics] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [stores, setStores] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // State for Users table
//   const [userSortBy, setUserSortBy] = useState("createdAt");
//   const [userSortOrder, setUserSortOrder] = useState("desc");
//   const [roleFilter, setRoleFilter] = useState("ALL");

//   // State for Stores table (frontend sorting)
//   const [storeSortBy, setStoreSortBy] = useState("createdAt");
//   const [storeSortOrder, setStoreSortOrder] = useState("desc");

//   // Modal states
//   const [isUserModalOpen, setIsUserModalOpen] = useState(false);
//   const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const userParams = {
//         sortBy: userSortBy,
//         order: userSortOrder,
//         role: roleFilter !== "ALL" ? roleFilter : undefined,
//       };

//       const [analyticsData, usersData, storesData] = await Promise.all([
//         getAdminAnalytics(),
//         getAllUsers(userParams),
//         getStores(), // Fetch stores without backend sorting
//       ]);

//       setAnalytics(analyticsData);
//       setUsers(usersData.users);
//       setStores(storesData.stores);
//     } catch (err) {
//       setError(err.message || "Failed to fetch admin data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [userSortBy, userSortOrder, roleFilter]);

//   const handleUserSort = (column) => {
//     const isAsc = userSortBy === column && userSortOrder === "asc";
//     setUserSortBy(column);
//     setUserSortOrder(isAsc ? "desc" : "asc");
//   };

//   const handleStoreSort = (column) => {
//     const isAsc = storeSortBy === column && storeSortOrder === "asc";
//     setStoreSortBy(column);
//     setStoreSortOrder(isAsc ? "desc" : "asc");
//   };

//   const sortedStores = useMemo(() => {
//     return [...stores].sort((a, b) => {
//       const aValue = a[storeSortBy] ?? -1;
//       const bValue = b[storeSortBy] ?? -1;

//       if (aValue < bValue) return storeSortOrder === "asc" ? -1 : 1;
//       if (aValue > bValue) return storeSortOrder === "asc" ? 1 : -1;
//       return 0;
//     });
//   }, [stores, storeSortBy, storeSortOrder]);

//   const getStoreNameForOwner = (ownerId) => {
//     const store = stores.find((s) => s.ownerId === ownerId);
//     return store ? store.name : "No Store Assigned";
//   };

//   const getStoreRatingsCountForUser = (userId) => {
//     let count = 0;
//     stores.forEach((store) => {
//       if (store.ratings?.some((r) => r.userId === userId)) {
//         count++;
//       }
//     });
//     return count;
//   };

//   if (loading) return <p>Loading Admin Dashboard...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <>
//       <div className="space-y-8">
//         <div className="grid gap-4 md:grid-cols-3">
//           <Card className="bg-gray-100 shadow-md rounded-2xl">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-black">
//                 Total Users
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-black">
//                 {analytics?.totalUsers ?? 0}
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="bg-gray-100 shadow-md rounded-2xl">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-black">
//                 Total Stores
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-black">
//                 {analytics?.totalStores ?? 0}
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="bg-gray-100 shadow-md rounded-2xl">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-black">
//                 Total Ratings
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-black">
//                 {analytics?.totalRatings ?? 0}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* User Management */}
//         <Card className="bg-gray-100 shadow-md rounded-2xl">
//           <CardHeader className="flex flex-row items-center justify-between">
//             <div>
//               <CardTitle className="text-black">User Management</CardTitle>
//             </div>
//             <div className="flex gap-2">
//               <Select value={roleFilter} onValueChange={setRoleFilter}>
//                 <SelectTrigger className="w-[180px] font-bold text-black">
//                   <SelectValue placeholder="Filter by role" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ALL" className="text-black">
//                     All Roles
//                   </SelectItem>
//                   <SelectItem value="ADMIN" className="text-black">
//                     Admins Only
//                   </SelectItem>
//                   <SelectItem value="OWNER" className="text-black">
//                     Owners Only
//                   </SelectItem>
//                   <SelectItem value="USER" className="text-black">
//                     Users Only
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//               <Button
//                 variant="outline"
//                 className="border border-black text-black bg-white hover:bg-black hover:text-white"
//                 onClick={() => setIsUserModalOpen(true)}
//               >
//                 Create User
//               </Button>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead
//                     onClick={() => handleUserSort("name")}
//                     className="font-bold text-black cursor-pointer select-none"
//                   >
//                     <div className="flex items-center">
//                       Name <ArrowUpDown className="ml-1 h-4 w-4" />
//                     </div>
//                   </TableHead>
//                   <TableHead className="font-bold text-black">Email</TableHead>
//                   <TableHead className="font-bold text-black">Role</TableHead>
//                   {roleFilter === "OWNER" && (
//                     <TableHead className="font-bold text-black">
//                       Store
//                     </TableHead>
//                   )}
//                   {roleFilter === "USER" && (
//                     <TableHead className="font-bold text-black">
//                       Stores Rated
//                     </TableHead>
//                   )}
//                   <TableHead
//                     onClick={() => handleUserSort("createdAt")}
//                     className="font-bold text-black cursor-pointer select-none"
//                   >
//                     <div className="flex items-center">
//                       Created At <ArrowUpDown className="ml-1 h-4 w-4" />
//                     </div>
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {users.map((user) => (
//                   <TableRow key={user.id}>
//                     <TableCell className="font-medium text-black">
//                       {user.name}
//                     </TableCell>
//                     <TableCell className="text-black">{user.email}</TableCell>
//                     <TableCell className="text-black">{user.role}</TableCell>
//                     {roleFilter === "OWNER" && (
//                       <TableCell className="text-black">
//                         {getStoreNameForOwner(user.id)}
//                       </TableCell>
//                     )}
//                     {roleFilter === "USER" && (
//                       <TableCell className="text-black">
//                         {getStoreRatingsCountForUser(user.id)}
//                       </TableCell>
//                     )}
//                     <TableCell className="text-black">
//                       {user.createdAt
//                         ? new Date(user.createdAt).toLocaleDateString()
//                         : "-"}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>

//         {/* Store Management */}
//         <Card className="bg-gray-100 shadow-md rounded-2xl">
//           <CardHeader className="flex flex-row items-center justify-between">
//             <div>
//               <CardTitle className="text-black">Store Management</CardTitle>
//             </div>
//             <Button
//               variant="outline"
//               className="border border-black text-black bg-white hover:bg-black hover:text-white"
//               onClick={() => setIsStoreModalOpen(true)}
//             >
//               Create Store
//             </Button>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead
//                     onClick={() => handleStoreSort("name")}
//                     className="text-black font-bold cursor-pointer select-none"
//                   >
//                     <div className="flex items-center">
//                       Name <ArrowUpDown className="ml-1 h-4 w-4" />
//                     </div>
//                   </TableHead>
//                   <TableHead className="text-black font-bold">Owner</TableHead>
//                   <TableHead
//                     onClick={() => handleStoreSort("overallRating")}
//                     className="text-black font-bold cursor-pointer select-none"
//                   >
//                     <div className="flex items-center">
//                       Overall Rating <ArrowUpDown className="ml-1 h-4 w-4" />
//                     </div>
//                   </TableHead>
//                   <TableHead
//                     onClick={() => handleStoreSort("createdAt")}
//                     className="text-black font-bold cursor-pointer select-none"
//                   >
//                     <div className="flex items-center">
//                       Created At <ArrowUpDown className="ml-1 h-4 w-4" />
//                     </div>
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {sortedStores.map((store) => (
//                   <TableRow key={store.id}>
//                     <TableCell className="text-black font-medium">
//                       {store.name}
//                     </TableCell>
//                     <TableCell className="text-black">
//                       {users.find((u) => u.id === store.ownerId)?.name ||
//                         "Unassigned"}
//                     </TableCell>
//                     <TableCell>
//                       {store.overallRating != null ? (
//                         <span
//                           className={`px-2 py-1 rounded-full text-white font-semibold ${
//                             store.overallRating >= 4
//                               ? "bg-green-500"
//                               : store.overallRating >= 2
//                               ? "bg-yellow-500"
//                               : "bg-red-500"
//                           }`}
//                         >
//                           {store.overallRating.toFixed(1)} ⭐
//                         </span>
//                       ) : (
//                         <span className="text-gray-500 font-medium">
//                           Not Rated
//                         </span>
//                       )}
//                     </TableCell>
//                     <TableCell className="text-black">
//                       {store.createdAt
//                         ? new Date(store.createdAt).toLocaleDateString()
//                         : "-"}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>

//       <CreateUserModal
//         isOpen={isUserModalOpen}
//         onClose={() => setIsUserModalOpen(false)}
//         onSuccess={() => fetchData()}
//       />
//       <CreateStoreModal
//         isOpen={isStoreModalOpen}
//         onClose={() => setIsStoreModalOpen(false)}
//         onSuccess={() => fetchData()}
//       />
//     </>
//   );
// }

// export default AdminDashboard;


// import { useEffect, useMemo, useState } from "react";
// import { getAdminAnalytics, getAllUsers } from "@/api/admin.api";
// import { getStores } from "@/api/store.api";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { ArrowUpDown } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import CreateUserModal from "./CreateUserModal";
// import CreateStoreModal from "./CreateStoreModal";

// function AdminDashboard() {
//   const [analytics, setAnalytics] = useState(null);

//   // Keep full, unfiltered users for store owner lookups
//   const [fullUsers, setFullUsers] = useState([]);
//   // Users displayed in Users table (filtered/sorted)
//   const [users, setUsers] = useState([]);
//   const [stores, setStores] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Users table state
//   const [userSortBy, setUserSortBy] = useState("createdAt"); // "name" | "createdAt"
//   const [userSortOrder, setUserSortOrder] = useState("desc"); // "asc" | "desc"
//   const [roleFilter, setRoleFilter] = useState("ALL"); // "ALL" | "ADMIN" | "OWNER" | "USER"

//   // Stores table state (frontend sort)
//   const [storeSortBy, setStoreSortBy] = useState("createdAt"); // "name" | "overallRating" | "createdAt"
//   const [storeSortOrder, setStoreSortOrder] = useState("desc"); // "asc" | "desc"

//   // Modals
//   const [isUserModalOpen, setIsUserModalOpen] = useState(false);
//   const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const userParams = {
//         sortBy: userSortBy,
//         order: userSortOrder,
//         // Do NOT pass role to backend; keep full list locally
//       };

//       const [analyticsData, usersData, storesData] = await Promise.all([
//         getAdminAnalytics(),
//         getAllUsers(userParams),
//         getStores(),
//       ]);

//       setAnalytics(analyticsData);
//       setFullUsers(usersData?.users || []);
//       setStores(storesData?.stores || []);
//     } catch (err) {
//       setError(err?.message || "Failed to fetch admin data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Refetch only when server-side user sort changes
//   useEffect(() => {
//     fetchData();
//     // roleFilter intentionally excluded so Store table is independent
//   }, [userSortBy, userSortOrder]);

//   // Users table: filter by role on client from fullUsers and sort
//   const filteredUsers = useMemo(() => {
//     const list =
//       roleFilter === "ALL"
//         ? fullUsers
//         : fullUsers.filter((u) => u.role === roleFilter);

//     return [...list].sort((a, b) => {
//       let aVal = a[userSortBy];
//       let bVal = b[userSortBy];

//       if (userSortBy === "createdAt") {
//         aVal = aVal ? new Date(aVal).getTime() : -1;
//         bVal = bVal ? new Date(bVal).getTime() : -1;
//       } else {
//         aVal = aVal ? String(aVal).toLowerCase() : "";
//         bVal = bVal ? String(bVal).toLowerCase() : "";
//       }

//       if (aVal < bVal) return userSortOrder === "asc" ? -1 : 1;
//       if (aVal > bVal) return userSortOrder === "asc" ? 1 : -1;
//       return 0;
//     });
//   }, [fullUsers, roleFilter, userSortBy, userSortOrder]);

//   useEffect(() => {
//     setUsers(filteredUsers);
//   }, [filteredUsers]);

//   const handleUserSort = (column) => {
//     const isAsc = userSortBy === column && userSortOrder === "asc";
//     setUserSortBy(column);
//     setUserSortOrder(isAsc ? "desc" : "asc");
//   };

//   const handleStoreSort = (column) => {
//     const isAsc = storeSortBy === column && storeSortOrder === "asc";
//     setStoreSortBy(column);
//     setStoreSortOrder(isAsc ? "desc" : "asc");
//   };

//   const sortedStores = useMemo(() => {
//     return [...stores].sort((a, b) => {
//       let aValue = a[storeSortBy];
//       let bValue = b[storeSortBy];

//       if (storeSortBy === "createdAt") {
//         aValue = aValue ? new Date(aValue).getTime() : -1;
//         bValue = bValue ? new Date(bValue).getTime() : -1;
//       }

//       if (aValue < bValue) return storeSortOrder === "asc" ? -1 : 1;
//       if (aValue > bValue) return storeSortOrder === "asc" ? 1 : -1;
//       return 0;
//     });
//   }, [stores, storeSortBy, storeSortOrder]);

//   // Always resolve owners from fullUsers, not filtered users
//   const getOwnerName = (ownerId) => {
//     return fullUsers.find((u) => u.id === ownerId)?.name || "Unassigned";
//   };

//   const getOwnerAddress = (ownerId) => {
//     return fullUsers.find((u) => u.id === ownerId)?.address || "-";
//   };

//   const getStoreRatingsCountForUser = (userId) => {
//     let count = 0;
//     stores.forEach((store) => {
//       if (store.ratings?.some((r) => r.userId === userId)) count++;
//     });
//     return count;
//   };

//   if (loading) return <p>Loading Admin Dashboard...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <>
//       <div className="space-y-8">
//         <div className="grid gap-4 md:grid-cols-3">
//           <Card className="bg-gray-100 shadow-md rounded-2xl">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-black">
//                 Total Users
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-black">
//                 {analytics?.totalUsers ?? 0}
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="bg-gray-100 shadow-md rounded-2xl">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-black">
//                 Total Stores
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-black">
//                 {analytics?.totalStores ?? 0}
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="bg-gray-100 shadow-md rounded-2xl">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-black">
//                 Total Ratings
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-black">
//                 {analytics?.totalRatings ?? 0}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* User Management */}
//         <Card className="bg-gray-100 shadow-md rounded-2xl">
//           <CardHeader className="flex flex-row items-center justify-between">
//             <div>
//               <CardTitle className="text-black">User Management</CardTitle>
//             </div>
//             <div className="flex gap-2">
//               <Select
//                 value={roleFilter}
//                 onValueChange={(v) => setRoleFilter(v)}
//               >
//                 <SelectTrigger className="w-[200px] font-bold text-black">
//                   <SelectValue placeholder="Filter by role" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ALL" className="text-black">
//                     All Roles
//                   </SelectItem>
//                   <SelectItem value="ADMIN" className="text-black">
//                     Admins Only
//                   </SelectItem>
//                   <SelectItem value="OWNER" className="text-black">
//                     Owners Only
//                   </SelectItem>
//                   <SelectItem value="USER" className="text-black">
//                     Users Only
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//               <Button
//                 variant="outline"
//                 className="border border-black text-black bg-white hover:bg-black hover:text-white"
//                 onClick={() => setIsUserModalOpen(true)}
//               >
//                 Create User
//               </Button>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead
//                     onClick={() => handleUserSort("name")}
//                     className="font-bold text-black cursor-pointer select-none"
//                   >
//                     <div className="flex items-center">
//                       Name <ArrowUpDown className="ml-1 h-4 w-4" />
//                     </div>
//                   </TableHead>
//                   <TableHead className="font-bold text-black">Email</TableHead>
//                   <TableHead className="font-bold text-black">Role</TableHead>
//                   <TableHead className="font-bold text-black">
//                     Address
//                   </TableHead>
//                   {roleFilter === "OWNER" && (
//                     <TableHead className="font-bold text-black">
//                       Store
//                     </TableHead>
//                   )}
//                   {roleFilter === "USER" && (
//                     <TableHead className="font-bold text-black">
//                       Stores Rated
//                     </TableHead>
//                   )}
//                   <TableHead
//                     onClick={() => handleUserSort("createdAt")}
//                     className="font-bold text-black cursor-pointer select-none"
//                   >
//                     <div className="flex items-center">
//                       Created At <ArrowUpDown className="ml-1 h-4 w-4" />
//                     </div>
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {users.map((user) => (
//                   <TableRow key={user.id}>
//                     <TableCell className="font-medium text-black">
//                       {user.name}
//                     </TableCell>
//                     <TableCell className="text-black">{user.email}</TableCell>
//                     <TableCell className="text-black">{user.role}</TableCell>
//                     <TableCell className="text-black">
//                       {user.address || "-"}
//                     </TableCell>
//                     {roleFilter === "OWNER" && (
//                       <TableCell className="text-black">
//                         {stores.find((s) => s.ownerId === user.id)?.name ??
//                           "No Store Assigned"}
//                       </TableCell>
//                     )}
//                     {roleFilter === "USER" && (
//                       <TableCell className="text-black">
//                         {getStoreRatingsCountForUser(user.id)}
//                       </TableCell>
//                     )}
//                     <TableCell className="text-black">
//                       {user.createdAt
//                         ? new Date(user.createdAt).toLocaleDateString()
//                         : "-"}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>

//         {/* Store Management */}
//         <Card className="bg-gray-100 shadow-md rounded-2xl">
//           <CardHeader className="flex flex-row items-center justify-between">
//             <div>
//               <CardTitle className="text-black">Store Management</CardTitle>
//             </div>
//             <Button
//               variant="outline"
//               className="border border-black text-black bg-white hover:bg-black hover:text-white"
//               onClick={() => setIsStoreModalOpen(true)}
//             >
//               Create Store
//             </Button>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead
//                     onClick={() => handleStoreSort("name")}
//                     className="text-black font-bold cursor-pointer select-none"
//                   >
//                     <div className="flex items-center">
//                       Name <ArrowUpDown className="ml-1 h-4 w-4" />
//                     </div>
//                   </TableHead>
//                   <TableHead className="text-black font-bold">
//                     Address
//                   </TableHead>
//                   <TableHead className="text-black font-bold">Owner</TableHead>
//                   <TableHead className="text-black font-bold">
//                     Owner Address
//                   </TableHead>
//                   <TableHead
//                     onClick={() => handleStoreSort("overallRating")}
//                     className="text-black font-bold cursor-pointer select-none"
//                   >
//                     <div className="flex items-center">
//                       Overall Rating <ArrowUpDown className="ml-1 h-4 w-4" />
//                     </div>
//                   </TableHead>
//                   <TableHead
//                     onClick={() => handleStoreSort("createdAt")}
//                     className="text-black font-bold cursor-pointer select-none"
//                   >
//                     <div className="flex items-center">
//                       Created At <ArrowUpDown className="ml-1 h-4 w-4" />
//                     </div>
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {sortedStores.map((store) => (
//                   <TableRow key={store.id}>
//                     <TableCell className="text-black font-medium">
//                       {store.name}
//                     </TableCell>
//                     <TableCell className="text-black">
//                       {store.address || "-"}
//                     </TableCell>
//                     <TableCell className="text-black">
//                       {getOwnerName(store.ownerId)}
//                     </TableCell>
//                     <TableCell className="text-black">
//                       {getOwnerAddress(store.ownerId)}
//                     </TableCell>
//                     <TableCell>
//                       {store.overallRating != null ? (
//                         <span
//                           className={`px-2 py-1 rounded-full text-white font-semibold ${
//                             store.overallRating >= 4
//                               ? "bg-green-500"
//                               : store.overallRating >= 2
//                               ? "bg-yellow-500"
//                               : "bg-red-500"
//                           }`}
//                         >
//                           {Number(store.overallRating).toFixed(1)} ⭐
//                         </span>
//                       ) : (
//                         <span className="text-gray-500 font-medium">
//                           Not Rated
//                         </span>
//                       )}
//                     </TableCell>
//                     <TableCell className="text-black">
//                       {store.createdAt
//                         ? new Date(store.createdAt).toLocaleDateString()
//                         : "-"}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>

//       <CreateUserModal
//         isOpen={isUserModalOpen}
//         onClose={() => setIsUserModalOpen(false)}
//         onSuccess={() => fetchData()}
//       />
//       <CreateStoreModal
//         isOpen={isStoreModalOpen}
//         onClose={() => setIsStoreModalOpen(false)}
//         onSuccess={() => fetchData()}
//       />
//     </>
//   );
// }

// export default AdminDashboard;
