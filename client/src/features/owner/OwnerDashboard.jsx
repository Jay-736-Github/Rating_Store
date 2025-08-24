import { useEffect, useState } from "react";
import { getOwnerDashboardData } from "@/api/store.api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function OwnerDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOwnerDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!dashboardData) return <p>No store data found for your account.</p>;

  const { storeDetails, overallRating, raters } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Store Info Card */}
      <Card className="bg-grey shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-black text-3xl font-bold">
            {storeDetails.name}
          </CardTitle>
          <CardDescription className="text-black">
            {storeDetails.address}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-black font-bold">
            Average Rating:{" "}
            {overallRating != null ? (
              <span
                className={`px-2 py-1 rounded-full text-white font-semibold ${
                  overallRating >= 3.5
                    ? "bg-green-500"
                    : overallRating >= 2.5
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {overallRating.toFixed(1)} ★
              </span>
            ) : (
              "N/A"
            )}
          </p>
        </CardContent>
      </Card>

      {/* Ratings Table */}
      <Card className="bg-gray-100 shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-black">Recent Ratings</CardTitle>
          <CardDescription className="text-black">
            Users who have rated your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-black">
                  User Name
                </TableHead>
                <TableHead className="font-bold text-black">Email</TableHead>
                <TableHead className="font-bold text-black text-right">
                  Rating
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {raters.map((rater) => (
                <TableRow key={rater.userId}>
                  <TableCell className="font-medium text-black">
                    {rater.name}
                  </TableCell>
                  <TableCell className="text-black">{rater.email}</TableCell>
                  <TableCell className="text-right">
                    {rater.rating != null ? (
                      <span
                        className={`px-2 py-1 rounded-full text-white font-semibold ${
                          rater.rating >= 3.5
                            ? "bg-green-500"
                            : rater.rating >= 2.5
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {rater.rating.toFixed(1)} ★
                      </span>
                    ) : (
                      <span className="text-gray-500 font-medium">N/A</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default OwnerDashboard;
