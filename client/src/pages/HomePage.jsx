// import { useEffect, useState, useRef } from "react";
// import { getStores } from "@/api/store.api";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import RatingModal from "@/features/stores/RatingModal";
// import { ListFilter } from "lucide-react";
// import StoreCardSkeleton from "@/components/skeletons/StoreCardSkeleton"; 

// function HomePage() {
//   const [stores, setStores] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedStore, setSelectedStore] = useState(null);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [sortOrder, setSortOrder] = useState("desc");

//   const inputRef = useRef(null); 

//   const fetchStores = async (search = searchTerm) => {
//     try {
//       setLoading(true);
//       const params = {
//         name: search,
//         sortBy,
//         order: sortOrder,
//       };
//       const data = await getStores(params);
//       setStores(data.stores);
//     } catch (err) {
//       setError(err.message || "Failed to fetch stores.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchStores(searchTerm);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchTerm, sortBy, sortOrder]);

//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, []);

//     if (loading) {
//       return (
//         <div>
//           <h1 className="text-3xl font-black mb-6">Available Stores</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {Array.from({ length: 6 }).map((_, index) => (
//               <StoreCardSkeleton key={index} />
//             ))}
//           </div>
//         </div>
//       );
//     }
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div>
//       {/* Top bar */}
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-2xl font-bold">Available Stores</h3>
//         <div className="flex gap-2">
//           <Input
//             ref={inputRef}
//             placeholder="Search by store name..."
//             className="w-[250px] h-10 border border-gray-300"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button className="w-[250px] h-10 border border-black text-black bg-white hover:bg-black hover:text-white flex items-center gap-2 px-3 justify-center">
//                 <ListFilter className="h-4 w-4" />
//                 Sort
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem
//                 onClick={() => {
//                   setSortBy("name");
//                   setSortOrder("asc");
//                 }}
//               >
//                 Name (A-Z)
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 onClick={() => {
//                   setSortBy("name");
//                   setSortOrder("desc");
//                 }}
//               >
//                 Name (Z-A)
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 onClick={() => {
//                   setSortBy("createdAt");
//                   setSortOrder("desc");
//                 }}
//               >
//                 Newest
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 onClick={() => {
//                   setSortBy("createdAt");
//                   setSortOrder("asc");
//                 }}
//               >
//                 Oldest
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[80vh] overflow-y-auto p-2">
//         {stores.map((store) => (
//           <Card
//             key={store.id}
//             className="flex flex-col bg-gray-100 shadow-md rounded-2xl"
//           >
//             <CardHeader>
//               <CardTitle className="text-black">{store.name}</CardTitle>
//               <CardDescription className="text-black">
//                 {store.address}
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="flex-grow">
//               <p className="text-black font-medium mb-2 flex items-center gap-2">
//                 Overall Rating:{" "}
//                 {store.overallRating != null ? (
//                   <span
//                     className={`px-2 py-1 rounded-full text-white font-semibold text-sm ${
//                       store.overallRating >= 3.5
//                         ? "bg-green-500"
//                         : store.overallRating >= 2.5
//                         ? "bg-yellow-500"
//                         : "bg-red-500"
//                     }`}
//                   >
//                     {store.overallRating.toFixed(1)} ★
//                   </span>
//                 ) : (
//                   <span className="text-gray-500 font-medium text-sm">
//                     Not Rated
//                   </span>
//                 )}
//               </p>
//               {store.userRating != null && (
//                 <p className="text-black font-medium flex items-center gap-2">
//                   Your Rating:{" "}
//                   <span
//                     className={`px-2 py-1 rounded-full text-white font-semibold text-sm ${
//                       store.userRating >= 3.5
//                         ? "bg-green-500"
//                         : store.userRating >= 2.5
//                         ? "bg-yellow-500"
//                         : "bg-red-500"
//                     }`}
//                   >
//                     {store.userRating.toFixed(1)} ★
//                   </span>
//                 </p>
//               )}
//             </CardContent>
//             <CardFooter>
//               <Button
//                 className="w-full"
//                 onClick={() => setSelectedStore(store)}
//               >
//                 {store.userRating ? "Update Your Rating" : "Rate this Store"}
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       {selectedStore && (
//         <RatingModal
//           store={selectedStore}
//           isOpen={!!selectedStore}
//           onClose={() => setSelectedStore(null)}
//           onRatingSuccess={() => fetchStores()}
//         />
//       )}
//     </div>
//   );
// }

// export default HomePage;


import { useEffect, useState, useRef } from "react";
import { getStores } from "@/api/store.api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RatingModal from "@/features/stores/RatingModal";
import { ListFilter } from "lucide-react";
import StoreCardSkeleton from "@/components/skeletons/StoreCardSkeleton";

function HomePage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const inputRef = useRef(null);

  const fetchStores = async (search = searchTerm) => {
    try {
      setLoading(true);
      const params = {
        name: search,
        sortBy,
        order: sortOrder,
        limit: 1000, // Fetch all stores at once
      };
      const data = await getStores(params);
      setStores(data.stores);
    } catch (err) {
      setError(err.message || "Failed to fetch stores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStores(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, sortBy, sortOrder]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-black mb-6">Available Stores</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <StoreCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Available Stores</h3>
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            placeholder="Search by store name..."
            className="w-[250px] h-10 border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-[250px] h-10 border border-black text-black bg-white hover:bg-black hover:text-white flex items-center gap-2 px-3 justify-center">
                <ListFilter className="h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("name");
                  setSortOrder("asc");
                }}
              >
                Name (A-Z)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("name");
                  setSortOrder("desc");
                }}
              >
                Name (Z-A)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("createdAt");
                  setSortOrder("desc");
                }}
              >
                Newest
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("createdAt");
                  setSortOrder("asc");
                }}
              >
                Oldest
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Store cards container with scroll */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[80vh] overflow-y-auto p-2">
        {stores.map((store) => (
          <Card
            key={store.id}
            className="flex flex-col bg-gray-100 shadow-md rounded-2xl"
          >
            <CardHeader>
              <CardTitle className="text-black">{store.name}</CardTitle>
              <CardDescription className="text-black">
                {store.address}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-black font-medium mb-2 flex items-center gap-2">
                Overall Rating:{" "}
                {store.overallRating != null ? (
                  <span
                    className={`px-2 py-1 rounded-full text-white font-semibold text-sm ${
                      store.overallRating >= 3.5
                        ? "bg-green-500"
                        : store.overallRating >= 2.5
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {store.overallRating.toFixed(1)} ★
                  </span>
                ) : (
                  <span className="text-gray-500 font-medium text-sm">
                    Not Rated
                  </span>
                )}
              </p>
              {store.userRating != null && (
                <p className="text-black font-medium flex items-center gap-2">
                  Your Rating:{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-white font-semibold text-sm ${
                      store.userRating >= 3.5
                        ? "bg-green-500"
                        : store.userRating >= 2.5
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {store.userRating.toFixed(1)} ★
                  </span>
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => setSelectedStore(store)}
              >
                {store.userRating ? "Update Your Rating" : "Rate this Store"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedStore && (
        <RatingModal
          store={selectedStore}
          isOpen={!!selectedStore}
          onClose={() => setSelectedStore(null)}
          onRatingSuccess={() => fetchStores()}
        />
      )}
    </div>
  );
}

export default HomePage;