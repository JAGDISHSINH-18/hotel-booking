import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { BiHotel, BiRupee, BiStar } from "react-icons/bi";
import "./styles.css";

const MyHotels = () => {
  const queryClient = useQueryClient();
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  const deleteHotelMutation = useMutation(apiClient.deleteMyHotelById);

  const handleDeleteHotel = async (hotelId: string) => {
    try {
      await deleteHotelMutation.mutateAsync(hotelId);
      queryClient.invalidateQueries("fetchMyHotels");
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  if (!hotelData) {
    return <span>No Hotels found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold px-10">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8 px-10">
        {hotelData.map((hotel) => (
          <div
            key={hotel._id} // Unique key prop
            data-testid="hotel-card"
            className="flex flex-col gap-5 p-5 rounded-lg bg-gray-100 shadow-lg animate-fade-in"
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <CiLocationOn className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiRupee className="mr-1" />
                {hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <div className="flex justify-between">
              <span>
                <button
                  onClick={() => handleDeleteHotel(hotel._id)}
                  className="bg-red-600 text-white text-xl font-bold p-2 hover:bg-red-500"
                >
                  Delete
                </button>
              </span>
              <span>
                <Link
                  to={`/edit-hotel/${hotel._id}`}
                  className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
                >
                  View Details
                </Link>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
