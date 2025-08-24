import { useEffect, useMemo, useState } from "react";
import { getAdminAnalytics, getAllUsers } from "@/api/admin.api";
import { getStores } from "@/api/store.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import CreateUserModal from "./CreateUserModal";
import CreateStoreModal from "./CreateStoreModal";

// Helper for sorting
function compareValues(a, b, order, isDate = false) {
  const dir = order === "asc" ? 1 : -1;
  let va = a,
    vb = b;
  if (isDate) {
    va = va ? new Date(va).getTime() : -1;
    vb = vb ? new Date(vb).getTime() : -1;
  } else {
    va = va != null ? String(va).toLowerCase() : "";
    vb = vb != null ? String(vb).toLowerCase() : "";
  }
  if (va < vb) return -1 * dir;
  if (va > vb) return 1 * dir;
  return 0;
}

function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [owners, setOwners] = useState([]);
  const [allUsersForLookup, setAllUsersForLookup] = useState([]);

  // Sorting states
  const [userSortBy, setUserSortBy] = useState("createdAt");
  const [userSortOrder, setUserSortOrder] = useState("desc");
  const [adminSortBy, setAdminSortBy] = useState("createdAt");
  const [adminSortOrder, setAdminSortOrder] = useState("desc");
  const [ownerSortBy, setOwnerSortBy] = useState("createdAt");
  const [ownerSortOrder, setOwnerSortOrder] = useState("desc");
  const [storeSortBy, setStoreSortBy] = useState("createdAt");
  const [storeSortOrder, setStoreSortOrder] = useState("desc");

  // Modal states
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        analyticsData,
        usersData,
        adminsData,
        ownersData,
        storesData,
        allUsersData,
      ] = await Promise.all([
        getAdminAnalytics(),
        getAllUsers({ role: "USER", limit: 500 }),
        getAllUsers({ role: "ADMIN", limit: 500 }),
        getAllUsers({ role: "OWNER", limit: 500 }),
        getStores(),
        getAllUsers({ limit: 10000 }),
      ]);

      setAnalytics(analyticsData);
      setUsers(usersData?.users || []);
      setAdmins(adminsData?.users || []);
      setOwners(ownersData?.users || []);
      setStores(storesData?.stores || []);
      setAllUsersForLookup(allUsersData?.users || []);
    } catch (err) {
      setError(err?.message || "Failed to fetch admin data.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []); 

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) =>
      compareValues(
        a[userSortBy],
        b[userSortBy],
        userSortOrder,
        userSortBy === "createdAt"
      )
    );
  }, [users, userSortBy, userSortOrder]);

  const sortedAdmins = useMemo(() => {
    return [...admins].sort((a, b) =>
      compareValues(
        a[adminSortBy],
        b[adminSortBy],
        adminSortOrder,
        adminSortBy === "createdAt"
      )
    );
  }, [admins, adminSortBy, adminSortOrder]);

  const sortedOwners = useMemo(() => {
    return [...owners].sort((a, b) =>
      compareValues(
        a[ownerSortBy],
        b[ownerSortBy],
        ownerSortOrder,
        ownerSortBy === "createdAt"
      )
    );
  }, [owners, ownerSortBy, ownerSortOrder]);

  const sortedStores = useMemo(() => {
    return [...stores].sort((a, b) =>
      compareValues(
        a[storeSortBy],
        b[storeSortBy],
        storeSortOrder,
        storeSortBy === "createdAt"
      )
    );
  }, [stores, storeSortBy, storeSortOrder]);

  // Sort handlers
  const handleUserSort = (column) => {
    const isAsc = userSortBy === column && userSortOrder === "asc";
    setUserSortBy(column);
    setUserSortOrder(isAsc ? "desc" : "asc");
  };
  const handleAdminSort = (column) => {
    const isAsc = adminSortBy === column && adminSortOrder === "asc";
    setAdminSortBy(column);
    setAdminSortOrder(isAsc ? "desc" : "asc");
  };
  const handleOwnerSort = (column) => {
    const isAsc = ownerSortBy === column && ownerSortOrder === "asc";
    setOwnerSortBy(column);
    setOwnerSortOrder(isAsc ? "desc" : "asc");
  };
  const handleStoreSort = (column) => {
    const isAsc = storeSortBy === column && storeSortOrder === "asc";
    setStoreSortBy(column);
    setStoreSortOrder(isAsc ? "desc" : "asc");
  };

  // Helpers
  const getOwnerName = (ownerId) =>
    allUsersForLookup.find((u) => u.id === ownerId)?.name || "Unassigned";
  const getOwnerEmail = (ownerId) =>
    allUsersForLookup.find((u) => u.id === ownerId)?.email || "-";
  const getStoreNameForOwner = (ownerId) =>
    stores.find((s) => s.ownerId === ownerId)?.name || "No Store Assigned";
  const getStoreAssignedAddressForOwner = (ownerId) =>
    stores.find((s) => s.ownerId === ownerId)?.address || "-";
  const getStoreRatingsCountForUser = (userId) =>
    stores.reduce(
      (count, store) =>
        store.ratings?.some((r) => r.userId === userId) ? count + 1 : count,
      0
    );

  if (loading) return <p>Loading Admin Dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="space-y-8">
        {/* Analytics Cards */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card className="bg-gray-100 shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-black">
                Total People
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">
                {analytics?.totalUsers ?? 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-100 shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-black">
                Total Admins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">
                {admins.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-100 shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-black">
                Total Owners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">
                {owners.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-100 shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-black">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">
                {users.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-100 shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-black">
                Total Stores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">
                {analytics?.totalStores ?? 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-100 shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-black">
                Total Ratings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">
                {analytics?.totalRatings ?? 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management */}
        <Card className="bg-gray-100 shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-black">User Management</CardTitle>
            <Button
              variant="outline"
              className="border border-black text-black bg-white hover:bg-black hover:text-white"
              onClick={() => setIsUserModalOpen(true)}
            >
              Create User
            </Button>
          </CardHeader>
          <CardContent>
            <div className="max-h-[440px] overflow-auto border rounded-md">
              <div className="min-w-full">
                <Table>
                  <TableHeader className="sticky top-0 bg-gray-100 z-10">
                    <TableRow>
                      <TableHead
                        onClick={() => handleUserSort("name")}
                        className="font-bold text-black cursor-pointer select-none"
                      >
                        <div className="flex items-center">
                          Name <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="font-bold text-black">
                        Email
                      </TableHead>
                      <TableHead className="font-bold text-black">
                        Address
                      </TableHead>
                      <TableHead className="font-bold text-black">
                        Stores Rated
                      </TableHead>
                      <TableHead
                        onClick={() => handleUserSort("createdAt")}
                        className="font-bold text-black cursor-pointer select-none"
                      >
                        <div className="flex items-center">
                          Created At <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium text-black">
                          {user.name}
                        </TableCell>
                        <TableCell className="text-black">
                          {user.email}
                        </TableCell>
                        <TableCell className="text-black">
                          {user.address || "-"}
                        </TableCell>
                        <TableCell className="text-black">
                          {getStoreRatingsCountForUser(user.id)}
                        </TableCell>
                        <TableCell className="text-black">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Management */}
        <Card className="bg-gray-100 shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-black">Admin Management</CardTitle>
            <Button
              variant="outline"
              className="border border-black text-black bg-white hover:bg-black hover:text-white"
              onClick={() => setIsAdminModalOpen(true)}
            >
              Create Admin
            </Button>
          </CardHeader>
          <CardContent>
            <div className="max-h-[440px] overflow-auto border rounded-md">
              <div className="min-w-full">
                <Table>
                  <TableHeader className="sticky top-0 bg-gray-100 z-10">
                    <TableRow>
                      <TableHead
                        onClick={() => handleAdminSort("name")}
                        className="font-bold text-black cursor-pointer select-none"
                      >
                        <div className="flex items-center">
                          Name <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="font-bold text-black">
                        Email
                      </TableHead>
                      <TableHead className="font-bold text-black">
                        Address
                      </TableHead>
                      <TableHead
                        onClick={() => handleAdminSort("createdAt")}
                        className="font-bold text-black cursor-pointer select-none"
                      >
                        <div className="flex items-center">
                          Created At <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedAdmins.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell className="font-medium text-black">
                          {admin.name}
                        </TableCell>
                        <TableCell className="text-black">
                          {admin.email}
                        </TableCell>
                        <TableCell className="text-black">
                          {admin.address || "-"}
                        </TableCell>
                        <TableCell className="text-black">
                          {new Date(admin.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Owner Management */}
        <Card className="bg-gray-100 shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-black">Owner Management</CardTitle>
            <Button
              variant="outline"
              className="border border-black text-black bg-white hover:bg-black hover:text-white"
              onClick={() => setIsOwnerModalOpen(true)}
            >
              Create Owner
            </Button>
          </CardHeader>
          <CardContent>
            <div className="max-h-[440px] overflow-auto border rounded-md">
              <div className="min-w-full">
                <Table>
                  <TableHeader className="sticky top-0 bg-gray-100 z-10">
                    <TableRow>
                      <TableHead
                        onClick={() => handleOwnerSort("name")}
                        className="font-bold text-black cursor-pointer select-none"
                      >
                        <div className="flex items-center">
                          Name <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="font-bold text-black">
                        Email
                      </TableHead>
                      <TableHead className="font-bold text-black">
                        Address
                      </TableHead>
                      <TableHead className="font-bold text-black">
                        Store Assigned
                      </TableHead>
                      <TableHead className="font-bold text-black">
                        Store Address
                      </TableHead>
                      <TableHead
                        onClick={() => handleOwnerSort("createdAt")}
                        className="font-bold text-black cursor-pointer select-none"
                      >
                        <div className="flex items-center">
                          Created At <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedOwners.map((owner) => (
                      <TableRow key={owner.id}>
                        <TableCell className="font-medium text-black">
                          {owner.name}
                        </TableCell>
                        <TableCell className="text-black">
                          {owner.email}
                        </TableCell>
                        <TableCell className="text-black">
                          {owner.address || "-"}
                        </TableCell>
                        <TableCell className="text-black">
                          {getStoreNameForOwner(owner.id)}
                        </TableCell>
                        <TableCell className="text-black">
                          {getStoreAssignedAddressForOwner(owner.id)}
                        </TableCell>
                        <TableCell className="text-black">
                          {new Date(owner.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Store Management */}
        <Card className="bg-gray-100 shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-black">Store Management</CardTitle>
            <Button
              variant="outline"
              className="border border-black text-black bg-white hover:bg-black hover:text-white"
              onClick={() => setIsStoreModalOpen(true)}
            >
              Create Store
            </Button>
          </CardHeader>
          <CardContent>
            <div className="max-h-[440px] overflow-auto border rounded-md">
              <div className="min-w-full">
                <Table>
                  <TableHeader className="sticky top-0 bg-gray-100 z-10">
                    <TableRow>
                      <TableHead
                        onClick={() => handleStoreSort("name")}
                        className="text-black font-bold cursor-pointer select-none"
                      >
                        <div className="flex items-center">
                          Name <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="text-black font-bold">
                        Address
                      </TableHead>
                      <TableHead className="text-black font-bold">
                        Owner
                      </TableHead>
                      <TableHead className="text-black font-bold">
                        Owner Email
                      </TableHead>
                      <TableHead
                        onClick={() => handleStoreSort("overallRating")}
                        className="text-black font-bold cursor-pointer select-none"
                      >
                        <div className="flex items-center">
                          Overall Rating{" "}
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead
                        onClick={() => handleStoreSort("createdAt")}
                        className="text-black font-bold cursor-pointer select-none"
                      >
                        <div className="flex items-center">
                          Created At <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedStores.map((store) => (
                      <TableRow key={store.id}>
                        <TableCell className="text-black font-medium">
                          {store.name}
                        </TableCell>
                        <TableCell className="text-black">
                          {store.address || "-"}
                        </TableCell>
                        <TableCell className="text-black">
                          {getOwnerName(store.ownerId)}
                        </TableCell>
                        <TableCell className="text-black">
                          {getOwnerEmail(store.ownerId)}
                        </TableCell>
                        <TableCell>
                          {store.overallRating != null ? (
                            <span
                              className={`px-2 py-1 rounded-full text-white font-semibold ${
                                store.overallRating >= 4
                                  ? "bg-green-500"
                                  : store.overallRating >= 2
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                            >
                              {Number(store.overallRating).toFixed(1)} ⭐
                            </span>
                          ) : (
                            <span className="text-gray-500 font-medium">
                              Not Rated
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-black">
                          {new Date(store.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <CreateUserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSuccess={fetchData}
      />
      <CreateUserModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={fetchData}
        defaultRole="ADMIN"
      />
      <CreateUserModal
        isOpen={isOwnerModalOpen}
        onClose={() => setIsOwnerModalOpen(false)}
        onSuccess={fetchData}
        defaultRole="OWNER"
      />
      <CreateStoreModal
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
        onSuccess={fetchData}
      />
    </>
  );
}

export default AdminDashboard;
